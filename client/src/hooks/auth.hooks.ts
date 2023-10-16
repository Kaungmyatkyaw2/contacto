import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useQuery({
    queryFn: () => axiosClient().post("/users/me"),
  });
};
