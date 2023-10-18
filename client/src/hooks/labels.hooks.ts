import axiosClient from "@/lib/axiosClient";
import { LabelType } from "@/types/label.types";
import { ResponseDataArray } from "@/types/queryData.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  filteredQueryResponseArrayData,
  updatedQueryResponseArrayData,
} from "./helper";

export const useGetLabels = () => {
  return useQuery({
    queryKey: ["labels"],
    queryFn: () =>
      axiosClient()
        .get("/labels")
        .then((res) => res.data),
  });
};

export const useCreateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => axiosClient().post("/labels", values),
    onSuccess: (res) => {
      const prevCachedLabels: any = queryClient.getQueryData(["labels"]);

      const createdLabel = res.data.data.data;

      if (prevCachedLabels) {
        prevCachedLabels?.data?.data?.push(createdLabel);
        prevCachedLabels.result += 1;
      }

      queryClient.setQueryData(["labels"], prevCachedLabels);
      queryClient.setQueryData(["labels", createdLabel._id], createdLabel);
    },
  });
};

export const useUpdateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: any }) =>
      axiosClient().patch(`/labels/${id}`, values),
    onSuccess: (res) => {
      const data: LabelType = res.data.data.data;
      let prevCachedLabels: ResponseDataArray<LabelType> | undefined =
        queryClient.getQueryData(["labels"]);

      if (prevCachedLabels) {
        prevCachedLabels = updatedQueryResponseArrayData<LabelType>(
          prevCachedLabels,
          data
        );
      }

      queryClient.setQueryData(["labels"], prevCachedLabels);
      queryClient.setQueryData(["labels", data._id], data);
    },
  });
};

export const useDeleteLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => axiosClient().delete(`/labels/${id}`),
    onSuccess: (_, varaiables: any) => {
      let prevCachedLabels: ResponseDataArray<LabelType> | undefined =
        queryClient.getQueryData(["labels"]);

      if (prevCachedLabels) {
        prevCachedLabels = filteredQueryResponseArrayData(
          prevCachedLabels,
          varaiables || ""
        );
      }

      queryClient.setQueryData(["labels"], prevCachedLabels);
    },
  });
};
