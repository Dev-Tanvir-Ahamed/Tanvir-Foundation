import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string | null) => {
  try {
    if (!token) throw new Error("Token is null or undefined");

    // Remove "Bearer " if present
    const extractedToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    // Validate format
    if (extractedToken.split(".").length !== 3) {
      throw new Error("Invalid JWT format");
    }

    return jwtDecode(extractedToken);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
