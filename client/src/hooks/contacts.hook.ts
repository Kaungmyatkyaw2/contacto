import axiosClient from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";

export const useGetContacts = () => {
  return useQuery({
    queryKey: ["getContacts"],
    queryFn: () =>
      axiosClient()
        .get("/contacts")
        .then((res) => res.data),
  });
};
