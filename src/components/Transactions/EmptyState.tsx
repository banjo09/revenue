import { Box, Button, Icon } from "@chakra-ui/react";
import { EmptyState as ChakraEmptyState } from "@chakra-ui/react";
import { FileText } from "lucide-react";

interface EmptyStateProps {
  onClearFilter: () => void;
}

export const EmptyState = ({ onClearFilter }: EmptyStateProps) => {
  return (
    <Box py={16}>
      <ChakraEmptyState.Root>
        <ChakraEmptyState.Content>
          <ChakraEmptyState.Indicator>
            <Icon color="gray.400">
              <FileText size={48} />
            </Icon>
          </ChakraEmptyState.Indicator>
          <ChakraEmptyState.Title fontSize="xl" fontWeight="semibold" mt={4}>
            No matching transaction found for the selected filter
          </ChakraEmptyState.Title>
          <ChakraEmptyState.Description fontSize="sm" color="gray.600" mt={2}>
            Change your filters to see more results, or add a new product.
          </ChakraEmptyState.Description>
          <Button
            mt={6}
            px={6}
            variant="outline"
            borderRadius="full"
            onClick={onClearFilter}
          >
            Clear Filter
          </Button>
        </ChakraEmptyState.Content>
      </ChakraEmptyState.Root>
    </Box>
  );
};