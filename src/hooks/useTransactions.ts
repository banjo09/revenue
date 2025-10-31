import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { mockTransactions } from "../data/dashboardMockData";

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: api.getTransactions,
    // placeholderData: mockTransactions,
    placeholderData: [],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
