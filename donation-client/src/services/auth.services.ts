import { authKey } from "@/constants/authKey";
import { instance } from "@/helpers/axios/axiosInstance";
import { decodeToken } from "@/utils/jwtDecode";

import {
  getFormLocalStorage,
  removeFormLocalStorage,
  setLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFormLocalStorage(authKey);
  if (authToken) {
    const decodedToken = decodeToken(authToken);
    return decodedToken;
  } else {
    return "";
  }
};

export const isUserLoggedIn = () => {
  const authToken = getFormLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFormLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
  return await instance({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/refresh-token`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
