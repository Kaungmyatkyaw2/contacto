import { AuthContext } from "@/context/provider/AuthContextProvider";
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useSignup = () => {
  return useMutation({
    mutationFn: (values) => {
      return axiosClient()
        .post("/users/signup", values)
        .then((res) => res.data);
    },
  });
};

export const useVerifyEmail = () => {
  const { dispatch } = useContext(AuthContext);
  return useMutation({
    mutationFn: (token: string | null) => {
      return axiosClient()
        .post(`/users/verifyEmail/${token}`)
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      dispatch({ type: "setToken", token: data.token });
    },
  });
};

export const useGetVerifyEmailLink = () => {
  return useMutation({
    mutationFn: (values: { email: string }) => {
      return axiosClient()
        .post("/users/getVerifyEmailUrl", values)
        .then((res) => res.data);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (values: { email: string }) => {
      return axiosClient()
        .post("/users/forgotPassword", values)
        .then((res) => res.data);
    },
  });
};

export const useResetPassword = () => {
  const { dispatch } = useContext(AuthContext);
  return useMutation({
    mutationFn: ({ token, values }: { token: string | null; values: any }) => {
      return axiosClient()
        .post(`/users/resetPassword/${token}`, values)
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      dispatch({ type: "setToken", token: data.token });
    },
  });
};

export const useUpdatePassword = () => {
  const { dispatch } = useContext(AuthContext);

  return useMutation({
    mutationFn: (values) => {
      return axiosClient()
        .patch("/users/updateMyPassword", values)
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      dispatch({ type: "setToken", token: data.token });
    },
  });
};

export const useUpdateMe = () => {
  const { dispatch } = useContext(AuthContext);

  return useMutation({
    mutationFn: (values) => {
      return axiosClient()
        .patch("/users/updateMe", values)
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      dispatch({ type: "setUser", user: data.data.data });
    },
  });
};
