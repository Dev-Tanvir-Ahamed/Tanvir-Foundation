import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const SSLCOMMERZ_STORE_ID = process.env.SSLCOMMERZ_STORE_ID as string;
export const SSLCOMMERZ_STORE_PASSWORD = process.env
  .SSLCOMMERZ_STORE_PASSWORD as string;
export const SSLCOMMERZ_LIVE = process.env.SSLCOMMERZ_LIVE === "true";
export const BACKEND_URL = process.env.BACKEND_URL as string;
export const FRONTEND_URL = process.env.FRONTEND_URL as string;
