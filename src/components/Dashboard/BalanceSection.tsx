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
    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={6}>
      {/* Available Balance */}
      <Box flex={1}>
        <Text fontSize="sm" color="gray.500" mb={2} fontWeight="normal">
          Available Balance
        </Text>
        <Heading size="3xl" mb={5} fontWeight="bold" letterSpacing="-0.02em">
          124,766.00
          {/* {formatCurrency(wallet?.availableBalance || 0)} */}
        </Heading>
        <Button
          bg="black"
          color="white"
          _hover={{ bg: "gray.800" }}
          borderRadius="full"
          px={10}
          py={6}
          fontSize="sm"
          fontWeight="semibold"
        >
          Withdraw
        </Button>
      </Box>

      {/* Metrics */}
      <Box display="flex" flexDirection="column" gap={6} minW="300px">
        {metrics.map((metric) => (
          <Box key={metric.label}>
            <Box display="flex" alignItems="center" gap={2} mb={1.5}>
              <Text fontSize="sm" color="gray.500" fontWeight="normal">
                {metric.label}
              </Text>
              <ChakraTooltip.Root positioning={{ placement: "top" }}>
                <ChakraTooltip.Trigger asChild>
                  <Box cursor="pointer" display="flex" alignItems="center">
                    <Icon color="gray.400">
                      <Info size={13} />
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
            <Text fontSize="2xl" fontWeight="bold" letterSpacing="-0.01em">
              {formatCurrency(metric.value)}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};