import { useState, useMemo } from "react";
import { Box, Heading, Text, Button, Badge, Icon } from "@chakra-ui/react";
import { ChevronDown, Download } from "lucide-react";
import { TransactionItem } from "./TransactionItem";
import { FilterDrawer } from "./FilterDrawer";
import { EmptyState } from "./EmptyState";
import type { Transaction, TransactionFilters } from "../../types/schema";

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>({
    transactionTypes: [],
    transactionStatuses: [],
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Filter by transaction type
      if (
        filters.transactionTypes.length > 0 &&
        !filters.transactionTypes.includes(transaction.type)
      ) {
        return false;
      }

      // Filter by transaction status
      if (
        filters.transactionStatuses.length > 0 &&
        !filters.transactionStatuses.includes(transaction.status)
      ) {
        return false;
      }

      // Filter by date range
      if (filters.dateRange?.start && filters.dateRange?.end) {
        const transactionDate = new Date(transaction.date);
        if (
          transactionDate < filters.dateRange.start ||
          transactionDate > filters.dateRange.end
        ) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, filters]);

  const activeFilterCount =
    filters.transactionTypes.length +
    filters.transactionStatuses.length +
    (filters.dateRange?.start && filters.dateRange?.end ? 1 : 0);

  const handleApplyFilters = (newFilters: TransactionFilters) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      transactionTypes: [],
      transactionStatuses: [],
    });
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
        pb={3}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Box>
          <Heading size="xl" mb={1} fontWeight="bold" letterSpacing="-0.01em">
            {filteredTransactions.length} Transactions
          </Heading>
          <Text fontSize="sm" color="gray.500" fontWeight="normal">
            Your transactions for the last 7 days
          </Text>
        </Box>

        <Box display="flex" gap={3}>
          <Button
            variant="ghost"
            borderRadius="full"
            onClick={() => setIsFilterOpen(true)}
            position="relative"
            color="gray.700"
            bg='#EFF1F6'
            px={5}
            py={2.5}
            fontSize="xs"
            fontWeight="semibold"
          >
            Filter
            <Icon>
              <ChevronDown size={20} strokeWidth={1.5} />
            </Icon>
            {activeFilterCount > 0 && (
              <Badge
                position="absolute"
                top="-6px"
                right="-6px"
                bg="black"
                color="white"
                borderRadius="full"
                fontSize="2xs"
                px={1.5}
                py={0.5}
                minW="18px"
                height="18px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <Button
            variant="solid"
            borderRadius="full"
            color="gray.700"
            bg='#EFF1F6'
            px={5}
            py={2.5}
            fontSize="xs"
            fontWeight="semibold"
          >
            Export list
            <Icon
              as={Download}
              boxSize={{ base: '14px', md: '14px', lg: '14px' }}
            />
          </Button>
        </Box>
      </Box>

      {/* Transaction Items */}
      {filteredTransactions.length > 0 ? (
        <Box pb={'7rem'}>
          {filteredTransactions.map((transaction, index) => (
            <TransactionItem
              key={transaction.payment_reference + transaction.date + index}
              transaction={transaction}
            />
          ))}
        </Box>
      ) : (
        <EmptyState onClearFilter={handleClearFilters} />
      )}

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />
    </Box>
  );
};