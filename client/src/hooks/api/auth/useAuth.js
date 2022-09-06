import { useMutation } from "@tanstack/react-query";
import { login, signup } from "./authServices";
import useStore from "../../../store/useStore";

export const useSignUp = () => {
  return useMutation(signup);
};

export const useLogin = () => {
  const setUser = useStore((state) => state.setUser);

  return useMutation(login, {
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      setUser(data.data.user);
    },
  });
};
