import { useQuery } from "@tanstack/react-query";
import { fetchMenus, MenuItem } from "../api/menu-api";

export const useMenus = () => {
  return useQuery<MenuItem[], Error>({
    queryKey: ["menus"],
    queryFn: fetchMenus,
    staleTime: 5 * 60 * 1000,
  });
};
