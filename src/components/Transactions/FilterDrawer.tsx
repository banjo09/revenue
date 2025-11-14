import { useState } from "react";
import {
  Drawer, Box, Heading, Button,
  Text, Checkbox, Input, Icon,
  Select, createListCollection, Portal
} from "@chakra-ui/react";
import { X, Square } from "lucide-react";
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
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const presets = [
    { id: DateFilterPreset.TODAY, label: "Today" },
    { id: DateFilterPreset.LAST_7_DAYS, label: "Last 7 days" },
    { id: DateFilterPreset.THIS_MONTH, label: "This month" },
    { id: DateFilterPreset.LAST_3_MONTHS, label: "Last 3 months" },
    { id: DateFilterPreset.THIS_YEAR, label: "This year" },
    { id: DateFilterPreset.LAST_YEAR, label: "Last year" },
    { id: DateFilterPreset.ALL_TIME, label: "All time" },
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

  const transactionStatusesFrameworks = createListCollection({
    items: [
      { value: TransactionStatus.SUCCESSFUL, label: "Successful" },
      { value: TransactionStatus.PENDING, label: "Pending" },
      { value: TransactionStatus.FAILED, label: "Failed" },
    ],
  })

  // const handleTypeToggle = (type: TransactionType) => {
  //   setLocalFilters((prev) => ({
  //     ...prev,
  //     transactionTypes: prev.transactionTypes.includes(type)
  //       ? prev.transactionTypes.filter((t) => t !== type)
  //       : [...prev.transactionTypes, type],
  //   }));
  // };

  // const handleStatusToggle = (status: TransactionStatus) => {
  //   setLocalFilters((prev) => ({
  //     ...prev,
  //     transactionStatuses: prev.transactionStatuses.includes(status)
  //       ? prev.transactionStatuses.filter((s) => s !== status)
  //       : [...prev.transactionStatuses, status],
  //   }));
  // };

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
                    <X strokeWidth='0.08rem' />
                  </Icon>
                </Button>
              </Box>
            </Drawer.Header>

            <Drawer.Body>
              {/* Quick Filters */}
              <Box mb={6} mt={5}>
                <Box
                  display="flex"
                  overflowX="auto"
                  gap={3}
                  py={2}
                  px={1}
                  css={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {presets.map((preset) => (
                    <Button
                      key={preset.id}
                      variant="outline"
                      size="sm"
                      px={4}
                      py={3}
                      borderRadius="full"
                      flexShrink={0}
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
                <Box display="flex" gap={1.5}>
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
                    value={selectedTypes}
                    onValueChange={(e) => setSelectedTypes(e.value)}
                    size="sm"
                  // width="320px"
                  >
                    <Select.HiddenSelect />
                    {/* <Select.Label>Transaction Type</Select.Label> */}
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText pl={3} placeholder="Transaction Type" />
                      </Select.Trigger>
                      <Select.IndicatorGroup pr={3}>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content px={2} py={2}>
                        {transactionTypesFrameworks.items.map((framework) => {
                          const isSelected = selectedTypes.includes(framework.value);
                          return (
                            <Select.Item
                              item={framework}
                              key={framework.value}
                              p={3}
                              borderRadius="md"
                            // bg='red'
                            // asChild
                            >
                              {/* <Select.ItemIndicator>
                                <Checkbox.Root
                                  checked={selectedTypes.includes(framework.value)}
                                  pointerEvents="none"
                                  size="sm"
                                >
                                  <Checkbox.Control transition="all 0.15s ease-in-out" />
                                </Checkbox.Root>
                              </Select.ItemIndicator>
                              {framework.label}
                              <Select.ItemIndicator /> */}
                              <Box
                                display="flex"
                                alignItems="center"
                                // justifyContent="space-between"
                                // px={3}
                                // py={2}
                                // bg='purple.emphasized'
                                // borderRadius="md"
                                // cursor="pointer"
                                // _hover={{ bg: "gray.100" }}
                                flex={1}
                              >
                                {
                                  !isSelected ? <Icon
                                    as={Square}
                                    color={"gray.400"}
                                    cursor="pointer"
                                    boxSize={4}
                                  /> : <Checkbox.Root
                                    checked={true}
                                    cursor="pointer"
                                    size="sm"
                                  >
                                    <Checkbox.Control transition="all 0.15s ease-in-out" />
                                  </Checkbox.Root>
                                }
                                <Text pl={2.5} fontSize="sm" color="gray.800">
                                  {framework.label}
                                </Text>
                              </Box>
                            </Select.Item>
                          )
                        })}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                </Box>
              </Box>

              {/* Transaction Status */}
              <Box mb={6}>
                <Text fontWeight="semibold" mb={2}>
                  Transaction Status
                </Text>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Select.Root
                    multiple
                    collection={transactionStatusesFrameworks}
                    value={selectedTypes}
                    onValueChange={(e) => setSelectedTypes(e.value)}
                    size="sm"
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText pl={3} placeholder="Transaction Status" />
                      </Select.Trigger>
                      <Select.IndicatorGroup pr={3}>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content px={2} py={2}>
                        {transactionStatusesFrameworks.items.map((framework) => {
                          const isSelected = selectedTypes.includes(framework.value);
                          return (
                            <Select.Item
                              item={framework}
                              key={framework.value}
                              p={3}
                              borderRadius="md"
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                flex={1}
                              >
                                {
                                  !isSelected ? <Icon
                                    as={Square}
                                    color={"gray.400"}
                                    cursor="pointer"
                                    boxSize={4}
                                  /> : <Checkbox.Root
                                    checked={true}
                                    cursor="pointer"
                                    size="sm"
                                  >
                                    <Checkbox.Control transition="all 0.15s ease-in-out" />
                                  </Checkbox.Root>
                                }
                                <Text pl={2.5} fontSize="sm" color="gray.800">
                                  {framework.label}
                                </Text>
                              </Box>
                            </Select.Item>
                          )
                        })}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
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

