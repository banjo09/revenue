import type { TransactionStatus, TransactionType } from "./enums";

// User types
export interface User {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

// Wallet types
export interface Wallet {
  balance: number;
  ledger_balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
}

// Chart types
export interface RevenueDataPoint {
  date: string;
  revenue: number;
}

// Transaction types
export interface Transaction {
  id: string;
  title: string;
  // customer: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  payment_reference: string;
  type: TransactionType;
  metadata: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name: string;
  };
}

// App types
export interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Filter types
export interface TransactionFilters {
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  transactionTypes: TransactionType[];
  transactionStatuses: TransactionStatus[];
  preset?: string;
}
