import { Box, Heading, Text, Button, Badge, Icon } from "@chakra-ui/react";
import { Filter, HardDriveDownload } from "lucide-react";
import { useState, useMemo } from "react";
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
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Heading size="lg" mb={1}>
            {filteredTransactions.length} Transactions
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Your transactions for the last 7 days
          </Text>
        </Box>

        <Box display="flex" gap={3}>
          <Button
            variant="outline"
            borderRadius="full"
            onClick={() => setIsFilterOpen(true)}
            position="relative"
          >
            <Icon mr={2}>
              <Filter size={16} />
            </Icon>
            Filter
            {activeFilterCount > 0 && (
              <Badge
                position="absolute"
                top="-8px"
                right="-8px"
                bg="black"
                color="white"
                borderRadius="full"
                fontSize="xs"
                px={2}
                py={0.5}
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          <Button variant="outline" borderRadius="full">
            <Icon mr={2}>
              <HardDriveDownload size={16} />
            </Icon>
            Export list
          </Button>
        </Box>
      </Box>

      {/* Transaction Items */}
      {filteredTransactions.length > 0 ? (
        <Box>
          {filteredTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
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