import {
  Box, Button, Text, IconButton, Avatar, Menu, Icon,
  Image, CloseButton, Drawer, Portal, Separator
} from "@chakra-ui/react";
import {
  House, ChartColumnIncreasing, WalletMinimal, MessageSquareText, Banknote,
  Users, LayoutGrid, Bell, ChevronDown, Menu as MenuIcon, SquareKanban
} from "lucide-react";
import { useState } from "react";
import { NavTab } from "../../types/enums";
import { AppsDropdown } from "./AppsDropdown";
import { UserProfileMenu } from "./UserProfileMenu";
import type { User } from "../../types/schema";
import { NavItemMenu } from "./NavItemMenu";

export const tabs = [
  { id: NavTab.HOME, label: "Home", icon: House },
  { id: NavTab.ANALYTICS, label: "Analytics", icon: SquareKanban },
  { id: NavTab.REVENUE, label: "Revenue", icon: Banknote },
  { id: NavTab.CRM, label: "CRM", icon: Users },
  { id: NavTab.APPS, label: "Apps", icon: LayoutGrid },
];

interface HeaderProps {
  user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.REVENUE);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Box
      as="header"
      position="sticky"
      // top={0}
      zIndex={1000}
      bg="white"
      borderRadius='5rem'
      boxShadow="0 2px 5px -3px rgba(0, 0, 0, 0.1), 0 1px 16px -2px rgba(0, 0, 0, 0.05)"
      top='0.6rem'
      mx={{ base: 1, md: 2, lg: 4 }}
      // px={{ base: 4, md: 6, lg: 8 }}
      py={{ base: 2, md: 2.5 }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      // borderRadius='2rem'
      // boxShadow="md"
      >
        {/* Logo */}
        <Drawer.Root placement={'start'}>
          <Drawer.Trigger asChild>
            {/* <Button variant="outline" size="sm">
              Open Drawer
            </Button> */}
            <Box
              // mr={{ base: 4, md: 6, lg: 8 }}
              pl={{ base: 4, md: 6, lg: 8 }}
              flexShrink={0}
            >
              <Image
                src="/mainstack-logo.png"
                alt="Company Logo"
                boxSize={{ base: '1.6rem', md: '2.0rem', lg: '2.3rem' }}
                objectFit="cover"
              />
            </Box>
          </Drawer.Trigger>
          <Portal>
            <NavItemMenu user={user} />
            {/* <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Context>
                  {(store) => (
                    <Drawer.Body pt="0" >
                      <Box
                        // ml={{ base: 4, md: 6, lg: 8 }} 
                        ml={6}
                        mt={2}
                        p={2}
                        _hover={{ bg: "gray.50" }}
                        display={'inline-block'}
                      >
                        <Image
                          src="/mainstack-logo.png"
                          alt="Company Logo"
                          boxSize={{ base: '1.6rem', md: '2.0rem', lg: '2.3rem' }}
                          objectFit="cover"
                        />
                      </Box>
                      <Separator mb={2} />
                      <Box display={'flex'} flexDirection="column" gap="3" mt="2rem !important" mb="4">
                        {tabs.map((item) => (
                          <Button variant="plain" size="sm"
                            key={item.id}
                            value={item.id}
                            cursor="pointer"
                            borderRadius="md"
                            px={8}
                            py={2.5}
                            _hover={{ bg: "gray.50" }}
                            justifyContent="flex-start"
                            onClick={() => store.setOpen(false)}
                          >
                            <Box display="flex" alignItems="center" justifyContent='start' gap={3}>
                              <Icon color="gray.600">
                                <item.icon size={18} />
                              </Icon>
                              <Text fontSize="sm">{item.label}</Text>
                            </Box>
                          </Button>
                        ))}
                      </Box>
                    </Drawer.Body>
                  )}
                </Drawer.Context>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner> */}
          </Portal>
        </Drawer.Root>

        {/* Navigation Tabs - Hidden on small screens */}
        <Box
          display={{ base: "none", md: "flex" }}
          gap={{ md: 1, lg: 2 }}
          flex={1}
          justifyContent="center"
          overflow="auto"
          minWidth="fit-content"
        >
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
                      px={{ md: 2.5, lg: 4 }}
                      py={2}
                      fontWeight="medium"
                      fontSize={{ md: "xs", lg: "sm" }}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {/* <Icon mr={{ md: 0.5, lg: 2 }}>
                        <tab.icon
                          size={16}
                        // size={{ md: 0.5, lg: 2 }}
                        />
                      </Icon> */}

                      <Icon
                        as={tab.icon}
                        // color="gray.600"
                        color={activeTab === tab.id ? "white" : "gray.600"}
                        boxSize={{ md: '14px', lg: '16px' }}
                        mr={{ md: 0.1, lg: 0.25 }}
                      />
                      {tab.label}
                      {
                        activeTab === tab.id && <>
                          <Box
                            width="1px"
                            bg="gray.300"
                            height={10}
                            mx={2}
                            borderRadius="full"
                          />
                          Link in Bio
                          <ChevronDown />
                        </>
                      }
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
                  px={{ md: 2.5, lg: 4 }}
                  py={2}
                  fontWeight="medium"
                  fontSize={{ md: "sm", lg: "sm" }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon
                    as={tab.icon}
                    boxSize={{ md: '14px', lg: '16px' }}
                    // color="gray.600"
                    color={activeTab === tab.id ? "white" : "gray.600"}
                    mr={{ md: 0.1, lg: 0.25 }}
                    strokeWidth={1.5}
                  />
                  {tab.label}
                </Button>
              )}
            </Box>
          ))}
        </Box>

        {/* Right Side Icons */}
        <Box display="flex" alignItems="center" gap={{ base: 1, md: 1.5, lg: 2 }}>
          {/* Notifications - Hidden on small screens */}
          <IconButton
            variant="ghost"
            aria-label="Notifications"
            size="sm"
            borderRadius="full"
            // display={{ base: "none", md: "flex" }}
            display={"flex"}
          >
            <Icon>
              <Bell size={'16px'} strokeWidth={1.5} />
            </Icon>
          </IconButton>

          {/* Messages - Hidden on small screens */}
          <IconButton
            variant="ghost"
            aria-label="Messages"
            size="sm"
            borderRadius="full"
            // display={{ base: "none", md: "flex" }}
            display={"flex"}
          >
            <Icon>
              <MessageSquareText size={'16px'} strokeWidth={1.5} />
            </Icon>
          </IconButton>

          <Button
            variant="solid"
            borderRadius="full"
            color="gray.700"
            bg='#EFF1F6'
            px={1}
            mr={{ base: 4, md: 4, lg: 4 }}
            height='2.0rem'
            fontSize="xs"
            fontWeight="semibold"
          >
            {/* User Profile */}
            <Menu.Root
              open={isProfileOpen}
              onOpenChange={(e) => setIsProfileOpen(e.open)}
            >
              <Menu.Trigger asChild>
                <Box
                  cursor="pointer"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar.Root
                    size={{ base: "2xs", md: "2xs" }}
                    backgroundImage="linear-gradient(to bottom, #5C6670, #131316)"
                    color="white"
                    borderRadius="full"
                  >
                    <Avatar.Fallback>{user?.avatar || "OJ"}</Avatar.Fallback>
                  </Avatar.Root>
                  <Box
                    // variant="ghost"
                    // aria-label="Menu"
                    // size="xs"
                    // borderRadius="full"
                    px={1.5}
                  >
                    <Icon>
                      <MenuIcon
                        // size={20}
                        size={'12px'} strokeWidth={1.0}
                      />
                    </Icon>
                  </Box>
                  {/* <Icon
                    as={MenuIcon}
                    boxSize="12px"
                    strokeWidth={1.0}
                    ml={1}
                    color="gray.600"
                  /> */}
                </Box>
              </Menu.Trigger>
              <UserProfileMenu user={user} />
            </Menu.Root>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};