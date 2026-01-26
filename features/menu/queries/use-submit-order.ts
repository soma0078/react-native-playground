import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitOrder, OrderRequest, OrderResponse } from "../api/menu-api";

export const useSubmitOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, Error, OrderRequest>({
    mutationFn: (request) => submitOrder(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });
};
