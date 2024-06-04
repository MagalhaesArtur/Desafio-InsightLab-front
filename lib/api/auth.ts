import { AxiosResponse } from "axios";
import api from "./api";

export const Auth = async (token: string) => {
  if (token != null) {
    const response = await api.post("/auth/validateToken", {
      token: token,
    });
    return response.data;
  } else {
    localStorage.clear();
  }
};

export const login = async (
  username: string,
  password: string
): Promise<any> => {
  let response = {};
  try {
    response = await api.post("/auth/login", { username, password });

    return response;
  } catch (e) {
    let x = e as Error;
    return x.message;
  }
};
