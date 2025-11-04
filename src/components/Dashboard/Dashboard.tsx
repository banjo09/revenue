import { Box, Container } from "@chakra-ui/react";
import { Header } from "../Layout/Header";
import { Sidebar } from "../Layout/Sidebar";
import { BalanceSection } from "./BalanceSection";
import { RevenueChart } from "./RevenueChart";
import { TransactionList } from "../Transactions/TransactionList";
import { useUser } from "../../hooks/useUser";
import { useWallet } from "../../hooks/useWallet";
import { useTransactions } from "../../hooks/useTransactions";
import { AppsDropdown } from "../Layout/AppsDropdown";

export const Dashboard = () => {
  const { data: user } = useUser();
  const { data: wallet } = useWallet();
  const { data: transactions } = useTransactions();

  return (
    <Box minH="100vh" bg="#fafafa">
      <Header user={user || null} />
      <Sidebar />

      <Container
        maxW="1170px"
        py={16}
        justifyContent='center'
        justifySelf={'center'}
      >
        <BalanceSection wallet={wallet || null} />
        {/* <RevenueChart /> */}
        <TransactionList transactions={transactions || []} />
      </Container>
    </Box>
  );
};