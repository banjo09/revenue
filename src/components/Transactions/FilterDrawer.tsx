import { useState } from "react";
import {
  Drawer, Box, Heading, Button,
  Text, Checkbox, Input, Icon,
  Select, createListCollection, Portal
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { TransactionType, TransactionStatus, DateFilterPreset } from "../../types/enums";
import type { TransactionFilters } from "../../types/schema";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: TransactionFilters;
  onApplyFilters: (filters: TransactionFilters) => void;
}

export const FilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}: FilterDrawerProps) => {
  const [localFilters, setLocalFilters] = useState<TransactionFilters>(filters);

  const presets = [
    { id: DateFilterPreset.TODAY, label: "Today" },
    { id: DateFilterPreset.LAST_7_DAYS, label: "Last 7 days" },
    { id: DateFilterPreset.THIS_MONTH, label: "This month" },
    { id: DateFilterPreset.LAST_3_MONTHS, label: "Last 3 months" },
  ];



  const transactionTypesFrameworks = createListCollection({
    items: [
      { value: TransactionType.STORE_TRANSACTIONS, label: "Store Transactions" },
      { value: TransactionType.GET_TIPPED, label: "Get Tipped" },
      { value: TransactionType.WITHDRAWALS, label: "Withdrawals" },
      { value: TransactionType.CHARGEBACKS, label: "Chargebacks" },
      { value: TransactionType.CASHBACKS, label: "Cashbacks" },
      { value: TransactionType.REFER_AND_EARN, label: "Refer & Earn" },
    ],
  })

  const transactionTypes = [
    { id: TransactionType.STORE_TRANSACTIONS, label: "Store Transactions" },
    { id: TransactionType.GET_TIPPED, label: "Get Tipped" },
    { id: TransactionType.WITHDRAWALS, label: "Withdrawals" },
    { id: TransactionType.CHARGEBACKS, label: "Chargebacks" },
    { id: TransactionType.CASHBACKS, label: "Cashbacks" },
    { id: TransactionType.REFER_AND_EARN, label: "Refer & Earn" },
  ];

  const transactionStatuses = [
    { id: TransactionStatus.SUCCESSFUL, label: "Successful" },
    { id: TransactionStatus.PENDING, label: "Pending" },
    { id: TransactionStatus.FAILED, label: "Failed" },
  ];

  const handleTypeToggle = (type: TransactionType) => {
    setLocalFilters((prev) => ({
      ...prev,
      transactionTypes: prev.transactionTypes.includes(type)
        ? prev.transactionTypes.filter((t) => t !== type)
        : [...prev.transactionTypes, type],
    }));
  };

  const handleStatusToggle = (status: TransactionStatus) => {
    setLocalFilters((prev) => ({
      ...prev,
      transactionStatuses: prev.transactionStatuses.includes(status)
        ? prev.transactionStatuses.filter((s) => s !== status)
        : [...prev.transactionStatuses, status],
    }));
  };

  const handleClear = () => {
    setLocalFilters({
      transactionTypes: [],
      transactionStatuses: [],
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  return (
    <Portal>
      <Drawer.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} placement="end" size="md">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content p={4} m={3} borderRadius="2xl">
            <Drawer.Header>
              <Box bg='' flex={1} display="flex" justifyContent="space-between" alignItems="center">
                <Heading size="lg" fontWeight={"extrabold"}>Filter</Heading>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  borderRadius="full"
                >
                  <Icon>
                    <X size={20} />
                  </Icon>
                </Button>
              </Box>
            </Drawer.Header>

            <Drawer.Body>
              {/* Quick Filters */}
              <Box mb={6} mt={5}>
                <Box display="flex" gap={2} flexWrap="wrap">
                  {presets.map((preset) => (
                    <Button
                      key={preset.id}
                      variant="outline"
                      size="sm"
                      px={4}
                      py={3}
                      borderRadius="full"
                      borderWidth={localFilters.preset === preset.id ? "0px" : "0.1px"}
                      bg={localFilters.preset === preset.id ? "black" : "white"}
                      color={localFilters.preset === preset.id ? "white" : "gray.700"}
                      _hover={{
                        bg: localFilters.preset === preset.id ? "gray.900" : "gray.200",
                      }}
                      onClick={() =>
                        setLocalFilters((prev) => ({ ...prev, preset: preset.id }))
                      }
                    >
                      {preset.label}
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Date Range */}
              <Box mb={6}>
                <Text fontWeight="semibold" mb={2}>
                  Date Range
                </Text>
                <Box display="flex" gap={3}>
                  <Box flex={1}>
                    <Input
                      type="date"
                      placeholder="17 Jul 2023"
                      size="md"
                      borderRadius="md"
                      px={3}
                    />
                  </Box>
                  <Box flex={1}>
                    <Input
                      type="date"
                      placeholder="17 Aug 2023"
                      size="md"
                      borderRadius="md"
                      px={3}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Transaction Type */}
              <Box mb={6}>
                <Text fontWeight="semibold" mb={2}>
                  Transaction Type
                </Text>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Select.Root
                    multiple
                    collection={transactionTypesFrameworks}
                    size="sm"
                    width="320px"
                  >
                    <Select.HiddenSelect />
                    <Select.Label>Transaction Type</Select.Label>
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Transaction Type" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Content>
                      {transactionTypesFrameworks.items.map((framework) => (
                        <Select.Item item={framework} key={framework.value}>
                          {framework.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Box>
              </Box>

              {/* Transaction Status */}
              <Box mb={6}>
                <Text fontWeight="semibold" mb={2}>
                  Transaction Status
                </Text>
                <Box display="flex" flexDirection="column" gap={2}>
                  {transactionStatuses.map((status) => (
                    <Checkbox.Root
                      key={status.id}
                      checked={localFilters.transactionStatuses.includes(status.id)}
                      onCheckedChange={() => handleStatusToggle(status.id)}
                      size="md"
                    >
                      <Checkbox.Control />
                      <Checkbox.Label fontSize="sm">{status.label}</Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                </Box>
              </Box>
            </Drawer.Body>

            <Drawer.Footer>
              <Box display="flex" gap={3} w="full">
                <Button
                  flex={1}
                  variant="outline"
                  borderRadius="full"
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <Button
                  flex={1}
                  bg="black"
                  color="white"
                  borderRadius="full"
                  _hover={{ bg: "gray.800" }}
                  onClick={handleApply}
                >
                  Apply
                </Button>
              </Box>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Portal>
  );
};












// {transactionTypes.map((type) => (
//   <>
//     <Checkbox.Root
//     key={type.id}
//     checked={localFilters.transactionTypes.includes(type.id)}
//     onCheckedChange={() => handleTypeToggle(type.id)}
//     size="md"
//   >
//     <Checkbox.Control />
//     <Checkbox.Label fontSize="sm">{type.label}</Checkbox.Label>
//   </Checkbox.Root>
//   </>
// ))}
