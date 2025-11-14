import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { mockWallet } from "../data/dashboardMockData";

export const useWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: api.getWallet,
    placeholderData: mockWallet,
    staleTime: 5 * 60 * 1000,
  });
};
