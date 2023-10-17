import axiosClient from "@/lib/axiosClient";
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
      const data = res.data.data;
      queryClient.setQueryData(["labels", data._id], data);
    },
  });
};
