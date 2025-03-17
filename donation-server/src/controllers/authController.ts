import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import User from "../models/User";
import {
  comparePassword,
  generateRefreshToken,
  generateToken,
  hashPassword,
} from "../services/UserService";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error); // Pass error to next middleware
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await comparePassword(password, user.password))) {
      res.status(400).json({ error: "Invalid credentials" });
    }

    if (user) {
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });

      res.status(200).json({ token, refreshToken });
    }
  } catch (error) {
    next(error); // Pass error to next middleware
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) res.status(401).json({ error: "Unauthorized" });

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
      (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err)
          return res.status(403).json({ error: "Invalid refresh token" });

        const token = generateToken(decoded as any);
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    next(error); // Pass error to next middleware
  }
};

export const logout = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error); // Pass error to next middleware
  }
};
