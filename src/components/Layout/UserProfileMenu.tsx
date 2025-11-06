import { Menu, Portal, Box, Text, Icon, Avatar, Separator } from "@chakra-ui/react";
import {
  Settings, ShoppingCart, Gift, Puzzle,
  Bug, ArrowDownWideNarrow, LogOut, ScrollText, LayoutGrid
} from "lucide-react";
import type { User } from "../../types/schema";

interface UserProfileMenuProps {
  user: User | null;
}

export const UserProfileMenu = ({ user }: UserProfileMenuProps) => {
  const menuItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "purchase-history", label: "Purchase History", icon: ScrollText },
    { id: "refer-earn", label: "Refer and Earn", icon: Gift },
    { id: "integrations", label: "Integrations", icon: LayoutGrid },
    { id: "report-bug", label: "Report Bug", icon: Bug },
    { id: "switch-account", label: "Switch Account", icon: ArrowDownWideNarrow },
  ];

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content
          minW="280px"
          p={2}
          mt={3}
          ml={3}
          boxShadow="0 2px 5px -3px rgba(0, 0, 0, 0.1), 0 1px 16px -2px rgba(0, 0, 0, 0.05)"
          borderRadius='1rem'
        >
          {/* User Info */}
          <Box display={"flex"} flexDirection="row" alignItems="center" pt={0} px={2.5}>
            <Avatar.Root
              size={{ base: "2xs", md: "2xs", lg: "xs" }}
              backgroundImage="linear-gradient(to bottom, #5C6670, #131316)"
              color="white"
              borderRadius="full"
            >
              <Avatar.Fallback>{user?.avatar || "OJ"}</Avatar.Fallback>
            </Avatar.Root>
            <Box px={3} py={3} mb={0}>
              <Text fontWeight="semibold" fontSize="sm" mb={0.5}>
                {user?.first_name || "Olivier"}{" "}
                {user?.last_name || "Jones"}
              </Text>
              <Text fontSize="xs" color="gray.600">
                {user?.email || "olivierjones@gmail.com"}
              </Text>
            </Box>

          </Box>

          {/* <Separator mb={2} /> */}

          {/* Menu Items */}
          {menuItems.map((item) => (
            <Menu.Item
              key={item.id}
              value={item.id}
              cursor="pointer"
              borderRadius="md"
              px={2.5}
              py={3.0}
              _hover={{ bg: "gray.50" }}
            >
              <Box display="flex" alignItems="center" gap={3}>
                <Icon color="gray.600">
                  <item.icon size={13} />
                </Icon>
                <Text fontSize="xs" fontWeight="semibold">{item.label}</Text>
              </Box>
            </Menu.Item>
          ))}

          {/* <Separator my={2} /> */}

          {/* Sign Out */}
          <Menu.Item
            value="signout"
            cursor="pointer"
            borderRadius="md"
            px={2.5}
            py={2.5}
            _hover={{ bg: "red.50" }}
          // color="red.600"
          >
            <Box display="flex" alignItems="center" gap={3}>
              <Icon>
                <LogOut size={13} />
              </Icon>
              <Text fontSize="xs" fontWeight="semibold">Sign Out</Text>
            </Box>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
};