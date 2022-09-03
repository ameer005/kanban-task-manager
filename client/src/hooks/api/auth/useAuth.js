import { useMutation } from "@tanstack/react-query";
import { login, signup } from "./authServices";

export const useSignUp = () => {
  return useMutation(signup);
};

export const useLogin = () => {
  return useMutation(login, {
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    },
  });
};
