"use server";
import { cookies } from "next/headers";

export const deleteCookies = async (keys: string[]) => {
  // Specify the type of keys
  const cookiesStore = await cookies();
  keys.forEach((key: string) => {
    // Specify the type of key
    cookiesStore.delete(key);
  });
};
