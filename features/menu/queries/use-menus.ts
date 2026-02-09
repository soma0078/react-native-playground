import { useQuery } from "@tanstack/react-query";
import { Category, fetchMenus } from "../api/menu-api";

export const useMenus = () => {
  return useQuery<Category[], Error>({
    queryKey: ["menus"],
    queryFn: fetchMenus,
    staleTime: 5 * 60 * 1000,
  });
};
