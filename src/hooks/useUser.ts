import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { mockUser } from "../data/dashboardMockData";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: api.getUser,
    placeholderData: mockUser,
    staleTime: 5 * 60 * 1000,
  });
};
