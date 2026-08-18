import "dotenv/config";
import { db } from "../db/index.js";
import { users } from "../db/schema/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../lib/customErrors.js";

export class AuthService {
  static async loginWithCredentials(email: string, password: string) {
    const match = await db.query.users.findFirst({
      columns: { id: true, roleId: true, passwordHash: true },
      where: { email: email },
      with: {
        role: {
          columns: {
            name: true,
          },
          with: {
            permissions: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!match || !match.passwordHash) {
      await this.dummyHashCompare(password); //To prevent timing attacks
      throw new AuthenticationError("Invalid email or password");
    }

    const isPasswordMatch = await this.comparePasswords(
      password,
      match.passwordHash,
    );

    if (!isPasswordMatch)
      throw new AuthenticationError("Invalid email or password");

    const { passwordHash, ...userWithoutPassword } = match;

    const token = this.generateToken({
      ...userWithoutPassword,
      role: match.role?.name || null,
    });

    return {
      token,
      user: {
        ...userWithoutPassword,
        role: match?.role?.name,
        permissions: match?.role?.permissions.map((p) => p.name),
      },
    };
  }

  static async logout() {
    
  }

  static async signUpWithCredentials(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const existingUser = await db.query.users.findFirst({
      where: { email: email },
    });

    if (existingUser) throw new AuthenticationError("Email already in use");

    const userRole = await db.query.roles.findFirst({
      where: { name: "user" },
      with: { permissions: true },
    });

    if (!userRole || !userRole.id)
      throw new Error(
        "Default user role configuration is missing in the database",
      );

    const hashedPassword = await this.hashPassword(password);

    try {
      const [newUser] = await db
        .insert(users)
        .values({
          firstName,
          lastName,
          email,
          passwordHash: hashedPassword,
          roleId: userRole.id,
        })
        .returning({ id: users.id, roleId: users.roleId });

      if (!newUser) throw new Error("Failed to create user");

      const token = this.generateToken({
        ...newUser,
        role: userRole.name,
      });

      return {
        token,
        user: {
          ...newUser,
          role: userRole.name,
          permissions: userRole.permissions.map((p) => p.name),
        },
      };
    } catch (error: any) {
      if (error.code === "23505" || error.message?.includes("UNIQUE"))
        throw new AuthenticationError("Email already in use");
      throw error;
    }
  }

  private static generateToken(user: {
    id: string;
    roleId: string;
    role: string | null;
  }): string {
    return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: 60 * 15 });
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error(
        "Hashing failed:",
        error instanceof Error ? error.message : "Unknown error",
      );
      throw new Error("Could not process password securely.");
    }
  }

  private static async comparePasswords(
    password: string,
    hashedPassword: string,
  ) {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      console.error(
        "Password comparison failed:",
        error instanceof Error ? error.message : "Unknown error",
      );
      throw new Error("Could not compare passwords.");
    }
  }

  private static async dummyHashCompare(password: string) {
    const FAKE_HASH =
      "$2b$10$NxX61kO923/S5p6W0u.6uO8P8aXN9E8O8C8r8e8d8i8t8s8h8a8s";
    await bcrypt.compare(password, FAKE_HASH);
  }
}
