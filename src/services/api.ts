import type { User, Wallet, Transaction } from "../types/schema";

const BASE_URL = "https://fe-task-api.mainstack.io";

export const api = {
  getUser: async (): Promise<User> => {
    const response = await fetch(`${BASE_URL}/user`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  },

  getWallet: async (): Promise<Wallet> => {
    const response = await fetch(`${BASE_URL}/wallet`);
    if (!response.ok) {
      throw new Error("Failed to fetch wallet data");
    }
    return response.json();
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const response = await fetch(`${BASE_URL}/transactions`);
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    return response.json();
  },
};