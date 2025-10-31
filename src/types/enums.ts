// Transaction status types
export const TransactionStatus = {
  SUCCESSFUL: "successful",
  PENDING: "pending",
  FAILED: "failed",
} as const;

export type TransactionStatus =
  (typeof TransactionStatus)[keyof typeof TransactionStatus];

// Transaction types
export const TransactionType = {
  STORE_TRANSACTIONS: "store_transactions",
  GET_TIPPED: "get_tipped",
  WITHDRAWALS: "withdrawals",
  WITHDRAWAL: "withdrawal",
  DEPOSIT: "deposit",
  CHARGEBACKS: "chargebacks",
  CASHBACKS: "cashbacks",
  REFER_AND_EARN: "refer_and_earn",
} as const;

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

// Date filter presets
export const DateFilterPreset = {
  TODAY: "today",
  LAST_7_DAYS: "last_7_days",
  THIS_MONTH: "this_month",
  LAST_3_MONTHS: "last_3_months",
} as const;

export type DateFilterPreset =
  (typeof DateFilterPreset)[keyof typeof DateFilterPreset];

// Navigation tabs
export const NavTab = {
  HOME: "home",
  ANALYTICS: "analytics",
  REVENUE: "revenue",
  CRM: "crm",
  APPS: "apps",
} as const;

export type NavTab = (typeof NavTab)[keyof typeof NavTab];
