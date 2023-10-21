import axiosClient from "@/lib/axiosClient";
import { LabelType } from "@/types/label.types";
import {
  InfiniteQueryResponse,
  ResponseDataArray,
} from "@/types/queryData.types";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  filteredQueryResponseArrayData,
  updatedQueryResponseArrayData,
} from "./helper";

export const useGetLabels = () => {
  return useInfiniteQuery({
    queryKey: ["labels"],
    queryFn: ({ pageParam = 1 }) =>
      axiosClient()
        .get(`/labels?page=${pageParam}`)
        .then((res) => res.data),
    getNextPageParam: (lastpage: ResponseDataArray<LabelType>, allpages) => {
      if (lastpage.result < 10) {
        return undefined;
      } else {
        return allpages.length + 1;
      }
    },
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
        prevCachedLabels?.pages[
          prevCachedLabels?.pages.length - 1
        ].data?.data?.push(createdLabel);
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
      let prevCachedLabels: InfiniteQueryResponse<LabelType> | undefined =
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
      let prevCachedLabels: InfiniteQueryResponse<LabelType> | undefined =
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
