import { Router } from "express";
import { AuthService } from "../services/auth.service.js";
import { validateRequestBody } from "../middleware/validationMiddleware.js";
import { loginSchema, signUpSchema } from "../validation/auth.validation.js";

const authRouter = Router();

export default function authRoutes(isProduction: boolean) {
  authRouter.post(
    "/login",
    validateRequestBody(loginSchema),
    async (req, res, next) => {
      try {
        const { email, password } = req.body;

        const { token, user } = await AuthService.loginWithCredentials(
          email,
          password,
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
          maxAge: 60 * 15 * 1000,
        });
        res.json({ token, user });
      } catch (error) {
        next(error);
      }
    },
  );

  authRouter.post(
    "/signup",
    validateRequestBody(signUpSchema),
    async (req, res, next) => {
      try {
        const { firstName, lastName, email, password } = req.body;

        const { token, user } = await AuthService.signUpWithCredentials(
          firstName,
          lastName,
          email,
          password,
        );
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 60 * 15 * 1000,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
        });
        res.status(201).json({ token, user });
      } catch (error) {
        next(error);
      }
    },
  );

  authRouter.get("/logout", (req, res, next) => {
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 1,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
    res.json({ message: "User logout successful" });
  });
  return authRouter;
}
