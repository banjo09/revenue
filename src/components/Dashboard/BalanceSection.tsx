import { Box, Heading, Button, Text, Icon, Tooltip as ChakraTooltip } from "@chakra-ui/react";
import { Info } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import type { Wallet } from "../../types/schema";

interface BalanceSectionProps {
  wallet: Wallet | null;
}

export const BalanceSection = ({ wallet }: BalanceSectionProps) => {
  const metrics = [
    {
      label: "Ledger Balance",
      value: wallet?.ledgerBalance || 0,
      tooltip: "Total balance in your ledger account",
    },
    {
      label: "Total Payout",
      value: wallet?.totalPayout || 0,
      tooltip: "Total amount paid out to date",
    },
    {
      label: "Total Revenue",
      value: wallet?.totalRevenue || 0,
      tooltip: "Total revenue generated",
    },
    {
      label: "Pending Payout",
      value: wallet?.pendingPayout || 0,
      tooltip: "Amount pending for payout",
    },
  ];

  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={8}>
      {/* Available Balance */}
      <Box>
        <Text fontSize="sm" color="gray.600" mb={2}>
          Available Balance
        </Text>
        <Heading size="2xl" mb={4} fontWeight="bold">
          {formatCurrency(wallet?.availableBalance || 0)}
        </Heading>
        <Button
          bg="black"
          color="white"
          _hover={{ bg: "gray.800" }}
          borderRadius="full"
          px={8}
          size="lg"
        >
          Withdraw
        </Button>
      </Box>

      {/* Metrics */}
      <Box display="flex" gap={8}>
        {metrics.map((metric) => (
          <Box key={metric.label}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Text fontSize="sm" color="gray.600">
                {metric.label}
              </Text>
              <ChakraTooltip.Root positioning={{ placement: "top" }}>
                <ChakraTooltip.Trigger asChild>
                  <Box cursor="pointer">
                    <Icon color="gray.400">
                      <Info size={14} />
                    </Icon>
                  </Box>
                </ChakraTooltip.Trigger>
                <ChakraTooltip.Positioner>
                  <ChakraTooltip.Content>
                    <Text fontSize="xs">{metric.tooltip}</Text>
                  </ChakraTooltip.Content>
                </ChakraTooltip.Positioner>
              </ChakraTooltip.Root>
            </Box>
            <Text fontSize="xl" fontWeight="bold">
              {formatCurrency(metric.value)}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};