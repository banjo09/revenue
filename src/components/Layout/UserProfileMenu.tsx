import { Menu, Box, Text, Icon, Separator } from "@chakra-ui/react";
import { Settings, ShoppingCart, Gift, Puzzle, Bug, ArrowDownWideNarrow, LogOut } from "lucide-react";
import type { User } from "../../types/schema";

interface UserProfileMenuProps {
  user: User | null;
}

export const UserProfileMenu = ({ user }: UserProfileMenuProps) => {
  const menuItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "purchase-history", label: "Purchase History", icon: ShoppingCart },
    { id: "refer-earn", label: "Refer and Earn", icon: Gift },
    { id: "integrations", label: "Integrations", icon: Puzzle },
    { id: "report-bug", label: "Report Bug", icon: Bug },
    { id: "switch-account", label: "Switch Account", icon: ArrowDownWideNarrow },
  ];

  return (
    <Menu.Content minW="280px" p={2}>
      {/* User Info */}
      <Box px={3} py={3} mb={2}>
        <Text fontWeight="semibold" fontSize="sm" mb={1}>
          {user?.name || "Olivier Jones"}
        </Text>
        <Text fontSize="xs" color="gray.600">
          {user?.email || "olivierjones@gmail.com"}
        </Text>
      </Box>

      <Separator mb={2} />

      {/* Menu Items */}
      {menuItems.map((item) => (
        <Menu.Item
          key={item.id}
          value={item.id}
          cursor="pointer"
          borderRadius="md"
          px={3}
          py={2.5}
          _hover={{ bg: "gray.50" }}
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Icon color="gray.600">
              <item.icon size={18} />
            </Icon>
            <Text fontSize="sm">{item.label}</Text>
          </Box>
        </Menu.Item>
      ))}

      <Separator my={2} />

      {/* Sign Out */}
      <Menu.Item
        value="signout"
        cursor="pointer"
        borderRadius="md"
        px={3}
        py={2.5}
        _hover={{ bg: "red.50" }}
        color="red.600"
      >
        <Box display="flex" alignItems="center" gap={3}>
          <Icon>
            <LogOut size={18} />
          </Icon>
          <Text fontSize="sm">Sign Out</Text>
        </Box>
      </Menu.Item>
    </Menu.Content>
  );
};