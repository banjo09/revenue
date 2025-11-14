import { Box, Container } from "@chakra-ui/react";
import { Header } from "../Layout/Header";
import { Sidebar } from "../Layout/Sidebar";
import { BalanceSection } from "./BalanceSection";
import { TransactionList } from "../Transactions/TransactionList";
import { useUser } from "../../hooks/useUser";
import { useWallet } from "../../hooks/useWallet";
import { useTransactions } from "../../hooks/useTransactions";

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
        mx="auto"
      >
        <BalanceSection wallet={wallet || null} />
        <TransactionList transactions={transactions || []} />
      </Container>
    </Box>
  );
};