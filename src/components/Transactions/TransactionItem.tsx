import { Box, Text, Badge, Circle, Icon } from "@chakra-ui/react";
import { CheckCheck, MoveDiagonal, MoveDownLeft, MoveUpRight } from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { TransactionStatus, TransactionType } from "../../types/enums";
import type { Transaction } from "../../types/schema";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  // console.log('transaction', transaction)
  const isSuccessful = transaction.status === TransactionStatus.SUCCESSFUL;
  const isPending = transaction.status === TransactionStatus.PENDING;
  const withdrawalType = transaction.type === TransactionType.WITHDRAWAL;
  const depositType = transaction.type === TransactionType.DEPOSIT;


  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py={5}
      // borderBottom="1px solid"
      // borderColor="gray.100"
      _hover={{ bg: "gray.25" }}
      transition="background 0.15s"
      px={0}
    >
      {/* Left Side: Icon + Details */}
      <Box display="flex" alignItems="center" gap={4}>
        <Circle
          size="38px"
          bg={depositType ? "green.100" : "#F9E3E0"}
          color={depositType ? "green.700" : "#961100"}
        >
          <Icon>
            {depositType ? (
              <MoveDownLeft size={18} strokeWidth={1.2} />
            ) : (
              <MoveUpRight size={18} strokeWidth={1.2} />
            )}
          </Icon>
        </Circle>

        <Box>
          <Text fontWeight="medium" fontSize="sm" mb={1} color="gray.900" textTransform="capitalize">
            {transaction?.metadata?.product_name || transaction?.metadata?.type || "Cash withdrawal"}
          </Text>
          <Box display="flex" alignItems="center" gap={2}>
            <Text
              fontSize="sm"
              textTransform="capitalize"
              color={
                !!transaction?.metadata?.name ? "gray.600"
                  : isSuccessful ? "green.600"
                    : transaction.status === TransactionStatus.PENDING ? "orange.700" : "red.700"
              }
            >
              {
                !!transaction?.metadata?.name ? transaction?.metadata?.name
                  : isSuccessful ? "Successful"
                    : transaction.status === TransactionStatus.PENDING
                      ? "Pending" : "Failed"
              }
            </Text>
            {/* {!isSuccessful && (
              <Badge
                bg={isPending ? "orange.100" : "red.100"}
                color={isPending ? "orange.700" : "red.700"}
                fontSize="2xs"
                px={2}
                py={0.5}
                borderRadius="full"
                fontWeight="medium"
              >
                {transaction.status === TransactionStatus.PENDING
                  ? "Pending"
                  : "Failed"}
              </Badge>
            )}
            {isSuccessful && (
              <Badge
                bg="green.100"
                color="green.700"
                fontSize="2xs"
                px={2}
                py={0.5}
                borderRadius="full"
                fontWeight="medium"
              >
                Successful
              </Badge>
            )} */}
          </Box>
        </Box>
      </Box>

      {/* Right Side: Amount + Date */}
      <Box textAlign="right">
        <Text fontWeight="semibold" fontSize="sm" mb={1} color="gray.900">
          {formatCurrency(transaction.amount)}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {formatDate(transaction.date)}
        </Text>
      </Box>
    </Box>
  );
};