import axiosClient from "@/lib/axiosClient";
import { ContactType } from "@/types/contact.types";
import { ResponseDataArray } from "@/types/queryData.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  filteredQueryResponseArrayData,
  updatedQueryResponseArrayData,
} from "./helper";

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
        .then((res) => res.data.data.data),
  });
};

export const useGetContactsByLabel = (id: string) => {
  return useQuery({
    queryKey: ["contacts", "labels", id],
    queryFn: () =>
      axiosClient()
        .get(`/labels/${id}/contacts`)
        .then((res) => res.data),
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => axiosClient().post("/contacts", values),
    onSuccess: (res) => {
      const data = res.data.data.data;

      const prevCachedContacts: any = queryClient.getQueryData(["contacts"], {
        exact: true,
      });

      if (prevCachedContacts) {
        prevCachedContacts?.data?.data?.push(data);
      }

      queryClient.setQueryData(["contacts", data._id], data);
      queryClient.setQueryData(["contacts"], prevCachedContacts);
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: any }) =>
      axiosClient().patch(`/contacts/${id}`, values),
    onSuccess: (res) => {
      const data: ContactType = res.data.data.data;
      let prevCachedContacts: ResponseDataArray<ContactType> | undefined =
        queryClient.getQueryData(["contacts"]);

      if (prevCachedContacts) {
        prevCachedContacts = updatedQueryResponseArrayData<ContactType>(
          prevCachedContacts,
          data
        );
      }

      queryClient.setQueryData(["contacts"], prevCachedContacts);
      queryClient.setQueryData(["contacts", data._id], data);
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => axiosClient().delete(`/contacts/${id}`),
    onSuccess: (_, varaiables: any) => {
      let prevCachedContacts: ResponseDataArray<ContactType> | undefined =
        queryClient.getQueryData(["contacts"]);

      if (prevCachedContacts) {
        prevCachedContacts = filteredQueryResponseArrayData(
          prevCachedContacts,
          varaiables || ""
        );
      }

      queryClient.setQueryData(["contacts"], prevCachedContacts);
    },
  });
};
