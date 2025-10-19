import type { TransactionStatus } from "../types/enums";

export const formatCurrency = (amount: number): string => {
  return `USD ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export const formatStatusLabel = (status: TransactionStatus): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};