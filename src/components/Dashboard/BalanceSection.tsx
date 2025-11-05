import { Box, Heading, Button, Text, Icon, Tooltip as ChakraTooltip } from "@chakra-ui/react";
import { Info } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import type { Wallet } from "../../types/schema";
import { RevenueChart } from "./RevenueChart";

interface BalanceSectionProps {
  wallet: Wallet | null;
}

export const BalanceSection = ({ wallet }: BalanceSectionProps) => {
  const metrics = [
    {
      label: "Ledger Balance",
      value: wallet?.ledger_balance || 0,
      tooltip: "Total balance in your ledger account",
    },
    {
      label: "Total Payout",
      value: wallet?.total_payout || 0,
      tooltip: "Total amount paid out to date",
    },
    {
      label: "Total Revenue",
      value: wallet?.total_revenue || 0,
      tooltip: "Total revenue generated",
    },
    {
      label: "Pending Payout",
      value: wallet?.pending_payout || 0,
      tooltip: "Amount pending for payout",
    },
  ];

  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={12} gap={12}>
      {/* Available Balance */}
      <Box flex={1}>
        <Box
          flex={1}
          display="flex"
          alignItems='center'
          mb={{ base: 2, md: 4, lg: 6 }}
        >
          <Box mr={{ base: 4, md: 12, lg: 20 }}>
            <Text fontSize="sm" color="gray.500" mb={2} fontWeight="normal">
              Available Balance
            </Text>
            <Heading size="3xl" fontWeight="bold" letterSpacing="-0.02em">
              {/* 124,766.00 */}
              {formatCurrency(wallet?.balance || 0)}
            </Heading>
          </Box>
          <Button
            bg="black"
            color="white"
            _hover={{ bg: "gray.800" }}
            borderRadius="full"
            px={12}
            py={6}
            fontSize="sm"
            fontWeight="semibold"
          >
            Withdraw
          </Button>
        </Box>
        <RevenueChart />
      </Box>

      {/* Metrics */}
      <Box display="flex" flexDirection="column" gap={10} minW="300px">
        {metrics.map((metric) => (
          <Box key={metric.label}>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              mb={1.5}
              justifyContent='space-between'
            >
              <Text
                fontSize="sm"
                color="gray.500"
                fontWeight="normal"
              >
                {metric.label}
              </Text>
              <ChakraTooltip.Root positioning={{ placement: "top" }}>
                <ChakraTooltip.Trigger asChild>
                  <Box
                    cursor="pointer"
                    display="flex"
                    alignItems="center"
                  >
                    <Icon color="gray.400">
                      <Info size={15} />
                    </Icon>
                  </Box>
                </ChakraTooltip.Trigger>
                <ChakraTooltip.Positioner>
                  <ChakraTooltip.Content>
                    <Text fontSize="xs" p={1.5}>{metric.tooltip}</Text>
                  </ChakraTooltip.Content>
                </ChakraTooltip.Positioner>
              </ChakraTooltip.Root>
            </Box>
            <Text fontSize="2xl" fontWeight="bold" letterSpacing="-0.01em">
              {formatCurrency(metric.value)}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};