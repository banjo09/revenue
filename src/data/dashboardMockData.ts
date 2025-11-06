import { TransactionStatus, TransactionType } from "../types/enums";

// Mock user data
export const mockUser = {
  first_name: "Olivier",
  last_name: "Jones",
  email: "olivierjones@gmail.com",
  avatar: "OJ",
};

export const mockWallet = {
  balance: 0.0,
  ledger_balance: 0.0,
  total_payout: 0.0,
  total_revenue: 0.0,
  pending_payout: 0.0,
};

// Mock revenue chart data
export const mockRevenueData = [
  { date: "2022-04-01", revenue: 5000 },
  { date: "2022-04-05", revenue: 12000 },
  { date: "2022-04-10", revenue: 8000 },
  { date: "2022-04-15", revenue: 15000 },
  { date: "2022-04-20", revenue: 10000 },
  { date: "2022-04-25", revenue: 18000 },
  { date: "2022-04-30", revenue: 7000 },
];

// Mock transactions data
export const mockTransactions = [
  {
    id: "1",
    title: "Psychology of Money",
    customer: "Roy Cash",
    amount: 600,
    date: "2022-04-03",
    status: TransactionStatus.SUCCESSFUL,
    type: TransactionType.STORE_TRANSACTIONS,
  },
  {
    id: "2",
    title: "Buy me a coffee",
    customer: "Jonathan Smart",
    amount: 100,
    date: "2022-04-02",
    status: TransactionStatus.SUCCESSFUL,
    type: TransactionType.GET_TIPPED,
  },
  {
    id: "3",
    title: "How to build an online brand",
    customer: "Delvan Ludacris",
    amount: 100,
    date: "2022-04-02",
    status: TransactionStatus.SUCCESSFUL,
    type: TransactionType.STORE_TRANSACTIONS,
  },
  {
    id: "4",
    title: "Cash withdrawal",
    customer: "Successful",
    amount: 3000.33,
    date: "2022-04-01",
    status: TransactionStatus.SUCCESSFUL,
    type: TransactionType.WITHDRAWALS,
  },
  {
    id: "5",
    title: "Support my outreach",
    customer: "Shawn Kane",
    amount: 400,
    date: "2022-04-02",
    status: TransactionStatus.SUCCESSFUL,
    type: TransactionType.GET_TIPPED,
  },
  {
    id: "6",
    title: "Cash withdrawal",
    customer: "Pending",
    amount: 1004.44,
    date: "2022-04-01",
    status: TransactionStatus.PENDING,
    type: TransactionType.WITHDRAWALS,
  },
  {
    id: "7",
    title: "Learn how to pitch your idea",
    customer: "Dujon Jericho",
    amount: 500,
    date: "2022-04-02",
    status: TransactionStatus.SUCCESSFUL,
    type: TransactionType.STORE_TRANSACTIONS,
  },
];

// Mock apps data
export const mockApps = [
  {
    id: "link-in-bio",
    name: "Link in Bio",
    description: "Manage your Link in Bio",
    icon: "link",
    image: "/apps/bio.png",
  },
  {
    id: "store",
    name: "Store",
    description: "Manage your Store activities",
    icon: "store",
    image: "/apps/store.png",
  },
  {
    id: "media-kit",
    name: "Media Kit",
    description: "Manage your Media Kit",
    icon: "media",
    image: "/apps/media.png",
  },
  {
    id: "invoicing",
    name: "Invoicing",
    description: "Manage your Invoices",
    icon: "invoice",
    image: "/apps/invoicing.png",
  },
  {
    id: "bookings",
    name: "Bookings",
    description: "Manage your Bookings",
    icon: "calendar",
    image: "/apps/invoicing.png",
  },
];

export const mockRootProps = {
  user: mockUser,
  wallet: mockWallet,
  revenueData: mockRevenueData,
  transactions: mockTransactions,
  apps: mockApps,
};
