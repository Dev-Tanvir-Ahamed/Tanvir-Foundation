import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../interface/user.interface";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error(
    "JWT_SECRET or JWT_REFRESH_SECRET is missing in environment variables"
  );
}

export const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_REFRESH_SECRET, // Ensure you are using the correct secret
    { expiresIn: "7d" }
  );
};
