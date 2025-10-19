import { Menu, Box, Text, Icon } from "@chakra-ui/react";
import { Link, ShoppingBag, FolderOpenDot, Receipt, CalendarCheck2, ChevronRight } from "lucide-react";
import { mockApps } from "../../data/dashboardMockData";

const iconMap = {
  link: Link,
  store: ShoppingBag,
  media: FolderOpenDot,
  invoice: Receipt,
  calendar: CalendarCheck2,
};

export const AppsDropdown = () => {
  return (
    <Menu.Content minW="320px" p={2}>
      {mockApps.map((app) => {
        const IconComponent = iconMap[app.icon as keyof typeof iconMap] || Link;
        return (
          <Menu.Item
            key={app.id}
            value={app.id}
            cursor="pointer"
            borderRadius="md"
            p={3}
            _hover={{
              bg: "gray.50",
              transform: "translateY(-2px)",
              boxShadow: "sm",
            }}
            transition="all 0.2s"
          >
            <Box display="flex" alignItems="center" gap={3} w="full">
              <Box
                bg="gray.100"
                p={2}
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon color="gray.700">
                  <IconComponent size={20} />
                </Icon>
              </Box>
              <Box flex={1}>
                <Text fontWeight="semibold" fontSize="sm" mb={0.5}>
                  {app.name}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  {app.description}
                </Text>
              </Box>
              <Icon color="gray.400">
                <ChevronRight size={16} />
              </Icon>
            </Box>
          </Menu.Item>
        );
      })}
    </Menu.Content>
  );
};