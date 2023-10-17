import axiosClient from "@/lib/axiosClient";
import { LabelType } from "@/types/label.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      const updatedLabel: any = queryClient.getQueryData(["labels"]);

      const createdLabel = res.data.data.data;

      if (updatedLabel) {
        updatedLabel?.data?.data?.push(createdLabel);
        updatedLabel.result += 1;
      }

      queryClient.setQueryData(["labels"], updatedLabel);
      queryClient.setQueryData(["labels", createdLabel._id], createdLabel);
    },
  });
};

export const useDeleteLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => axiosClient().delete(`/labels/${id}`),
    onSuccess: (_, varaiables: any) => {
      let updatedLabel: any = queryClient.getQueryData(["labels"]);

      if (updatedLabel) {
        let filteredLabel = updatedLabel?.data?.data?.filter(
          (i: LabelType) => i._id !== varaiables
        );

        updatedLabel = {
          ...updatedLabel,
          data: {
            ...updatedLabel.data,
            data: filteredLabel,
          },
          result: updatedLabel.result - 1,
        };
      }

      queryClient.setQueryData(["labels"], updatedLabel);
    },
  });
};
