import axiosClient from "@/lib/axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () =>
      axiosClient()
        .get("/contacts")
        .then((res) => res.data),
  });
};

export const useGetContact = (id: string) => {
  return useQuery({
    queryKey: ["contacts", id],
    queryFn: () =>
      axiosClient()
        .get(`/contacts/${id}`)
        .then((res) => res.data),
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => axiosClient().post("/contacts", values),
    onSuccess: (res) => {
      const data = res.data.data;
      queryClient.setQueryData(["contacts", data._id], data);
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: any }) =>
      axiosClient().patch(`/contacts/${id}`, values),
    onSuccess: (res) => {
      const data = res.data.data;
      queryClient.setQueryData(["contacts", data._id], data);
    },
  });
};

export const useDeleteContact = () => {
  return useMutation({
    mutationFn: (id) => axiosClient().delete(`/contacts/${id}`),
  });
};
