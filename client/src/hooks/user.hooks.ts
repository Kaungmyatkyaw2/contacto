import { AuthContext } from "@/context/provider/AuthContextProvider";
import axiosClient from "@/lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

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
