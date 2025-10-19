import { Box, Text, Badge, Circle, Icon } from "@chakra-ui/react";
import { CheckCheck, MoveDiagonal } from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { TransactionStatus } from "../../types/enums";
import type { Transaction } from "../../types/schema";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isSuccessful = transaction.status === TransactionStatus.SUCCESSFUL;
  const isPending = transaction.status === TransactionStatus.PENDING;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py={4}
      borderBottom="1px solid"
      borderColor="gray.100"
      _hover={{ bg: "gray.50" }}
      transition="background 0.2s"
      px={4}
      borderRadius="md"
    >
      {/* Left Side: Icon + Details */}
      <Box display="flex" alignItems="center" gap={4}>
        <Circle
          size="40px"
          bg={isSuccessful ? "green.50" : "orange.50"}
          color={isSuccessful ? "green.600" : "orange.600"}
        >
          <Icon>
            {isSuccessful ? (
              <CheckCheck size={20} />
            ) : (
              <MoveDiagonal size={20} />
            )}
          </Icon>
        </Circle>

        <Box>
          <Text fontWeight="semibold" fontSize="sm" mb={1}>
            {transaction.title}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {transaction.customer}
          </Text>
          {!isSuccessful && (
            <Badge
              bg={isPending ? "orange.100" : "red.100"}
              color={isPending ? "orange.700" : "red.700"}
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="full"
              mt={1}
            >
              {transaction.status === TransactionStatus.PENDING
                ? "Pending"
                : "Failed"}
            </Badge>
          )}
          {isSuccessful && transaction.customer === "Successful" && (
            <Badge
              bg="green.100"
              color="green.700"
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="full"
              mt={1}
            >
              Successful
            </Badge>
          )}
        </Box>
      </Box>

      {/* Right Side: Amount + Date */}
      <Box textAlign="right">
        <Text fontWeight="semibold" fontSize="sm" mb={1}>
          {formatCurrency(transaction.amount)}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {formatDate(transaction.date)}
        </Text>
      </Box>
    </Box>
  );
};