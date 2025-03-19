import { authKey } from "@/constants/authKey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { removeUser } from "../auth.services";
import { deleteCookies } from "./deleteCookies";

export const logoutUser = (router: AppRouterInstance) => {
  removeUser(); // Clear the user data (e.g., localStorage)
  deleteCookies([authKey, "refreshToken"]);
  router.push("/login");
};
