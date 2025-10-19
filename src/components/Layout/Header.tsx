import { Box, Button, IconButton, Avatar, Menu, Icon } from "@chakra-ui/react";
import { House, ChartColumnIncreasing, WalletMinimal, Users, LayoutGrid, Bell, MessageSquare, Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { NavTab } from "../../types/enums";
import { AppsDropdown } from "./AppsDropdown";
import { UserProfileMenu } from "./UserProfileMenu";
import type { User } from "../../types/schema";

interface HeaderProps {
  user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.REVENUE);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const tabs = [
    { id: NavTab.HOME, label: "Home", icon: House },
    { id: NavTab.ANALYTICS, label: "Analytics", icon: ChartColumnIncreasing },
    { id: NavTab.REVENUE, label: "Revenue", icon: WalletMinimal },
    { id: NavTab.CRM, label: "CRM", icon: Users },
    { id: NavTab.APPS, label: "Apps", icon: LayoutGrid },
  ];

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={8}
      py={4}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Box fontWeight="bold" fontSize="2xl" mr={8}>
          |||
        </Box>

        {/* Navigation Tabs */}
        <Box display="flex" gap={2} flex={1}>
          {tabs.map((tab) => (
            <Box key={tab.id} position="relative">
              {tab.id === NavTab.APPS ? (
                <Menu.Root
                  open={isAppsOpen}
                  onOpenChange={(e) => setIsAppsOpen(e.open)}
                >
                  <Menu.Trigger asChild>
                    <Button
                      variant="ghost"
                      bg={activeTab === tab.id ? "black" : "transparent"}
                      color={activeTab === tab.id ? "white" : "gray.600"}
                      _hover={{
                        bg: activeTab === tab.id ? "black" : "gray.100",
                      }}
                      borderRadius="full"
                      px={4}
                      py={2}
                      fontWeight="medium"
                      fontSize="sm"
                    >
                      <Icon mr={2}>
                        <tab.icon size={16} />
                      </Icon>
                      {tab.label}
                    </Button>
                  </Menu.Trigger>
                  <AppsDropdown />
                </Menu.Root>
              ) : (
                <Button
                  variant="ghost"
                  bg={activeTab === tab.id ? "black" : "transparent"}
                  color={activeTab === tab.id ? "white" : "gray.600"}
                  _hover={{
                    bg: activeTab === tab.id ? "black" : "gray.100",
                  }}
                  borderRadius="full"
                  px={4}
                  py={2}
                  fontWeight="medium"
                  fontSize="sm"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon mr={2}>
                    <tab.icon size={16} />
                  </Icon>
                  {tab.label}
                </Button>
              )}
            </Box>
          ))}
        </Box>

        {/* Right Side Icons */}
        <Box display="flex" alignItems="center" gap={3}>
          <IconButton
            variant="ghost"
            aria-label="Notifications"
            size="sm"
            borderRadius="full"
          >
            <Icon>
              <Bell size={20} />
            </Icon>
          </IconButton>

          <IconButton
            variant="ghost"
            aria-label="Messages"
            size="sm"
            borderRadius="full"
          >
            <Icon>
              <MessageSquare size={20} />
            </Icon>
          </IconButton>

          <Menu.Root
            open={isProfileOpen}
            onOpenChange={(e) => setIsProfileOpen(e.open)}
          >
            <Menu.Trigger asChild>
              <Box cursor="pointer">
                <Avatar.Root
                  size="sm"
                  bg="gray.800"
                  color="white"
                  borderRadius="full"
                >
                  <Avatar.Fallback>{user?.avatar || "OJ"}</Avatar.Fallback>
                </Avatar.Root>
              </Box>
            </Menu.Trigger>
            <UserProfileMenu user={user} />
          </Menu.Root>

          <IconButton
            variant="ghost"
            aria-label="Menu"
            size="sm"
            borderRadius="full"
          >
            <Icon>
              <MenuIcon size={20} />
            </Icon>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};