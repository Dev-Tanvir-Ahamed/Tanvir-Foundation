import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

// Generate a JWT token
export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1h" });
};

// Verify a JWT token
export const verifyToken = (
  token: string
): { userId: string; role: string } => {
  return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
};
