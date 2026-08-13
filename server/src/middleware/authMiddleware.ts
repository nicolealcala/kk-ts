import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function verifyToken() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token;

      if (!token) throw new Error("Missing token");
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      if (decoded) next();
    } catch (error) {
      console.error(error);
      let errorMessage;
      if (error instanceof Error) errorMessage = error.message;
      res.status(401).json({
        error: errorMessage || "Forbidden Access",
      });
    }
  };
}

export default verifyToken;
