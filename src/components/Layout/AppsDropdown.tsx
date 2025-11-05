import { useState } from "react";
import { Menu, Portal, Box, Text, Icon, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { Link, ShoppingBag, FolderOpenDot, Receipt, CalendarCheck2, ChevronRight } from "lucide-react";
import { mockApps } from "../../data/dashboardMockData";

const iconMap = {
  link: Link,
  store: ShoppingBag,
  media: FolderOpenDot,
  invoice: Receipt,
  calendar: CalendarCheck2,
};

// A "jump" animation
const jumpBack = keyframes`
  0% { transform: translateX(0); }
  40% { transform: translateX(-6px) scale(1.02); }
  70% { transform: translateX(-3px) scale(0.98); }
  100% { transform: translateX(0); }
`;
const dance = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  20% { transform: translateY(-4px) rotate(-3deg); }
  40% { transform: translateY(4px) rotate(3deg); }
  60% { transform: translateY(-2px) rotate(-2deg); }
  80% { transform: translateY(2px) rotate(2deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

export const AppsDropdown = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content
          minW="320px"
          p={2}
          mt={2}
          boxShadow="0 2px 5px -3px rgba(0, 0, 0, 0.1), 0 1px 16px -2px rgba(0, 0, 0, 0.05)"
          borderRadius='1rem'
        >
          {mockApps.map((app) => {
            const IconComponent = iconMap[app.icon as keyof typeof iconMap] || Link;
            const isActive = activeId === app.id;

            return (
              <Menu.Item
                key={app.id}
                value={app.id}
                borderRadius="md"
                p={3}
                role="group"
                as={Box}
                _hover={{
                  bg: "gray.50",
                  transform: "translateY(-2px)",
                  boxShadow: "sm",
                }}
                transition="all 0.2s"
                onMouseEnter={() => setActiveId(app.id)}
                onMouseLeave={() => setActiveId((prev) => (prev === app.id ? null : prev))}
                onFocus={() => setActiveId(app.id)}
                onBlur={() => setActiveId((prev) => (prev === app.id ? null : prev))}
              >
                <Box display="flex" alignItems="center" gap={3} w="full">
                  <Box
                    // bg="gray.100"
                    p={1}
                    borderRadius="xl"
                    borderColor='gray.100'
                    borderWidth={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {/* <Icon color="gray.700">
                      <IconComponent size={20} />
                    </Icon> */}
                    <Image
                      src={app.image}
                      alt={app.name}
                      boxSize={{ base: '1.8rem', md: '2.2rem', lg: '2.5rem' }}
                      objectFit="cover"
                    />
                  </Box>
                  <Box
                    flex={1}
                    transition="transform 0.005s ease-in-out"
                    transform={isActive ? "translateX(-14px) scale(1.02)" : "translateX(0)"}
                  >
                    <Text fontWeight="semibold" fontSize="sm" mb={0.5}>
                      {app.name}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {app.description}
                    </Text>
                  </Box>
                  {/* <Icon color="gray.400">
                    <ChevronRight size={16} />
                  </Icon> */}
                  <Box
                    aria-hidden
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.18s ease"
                    opacity={isActive ? 1 : 0}
                    transform={isActive ? "translateX(0)" : "translateX(-6px)"}
                  >
                    <Icon as={ChevronRight} boxSize={4} color="gray.400" />
                  </Box>
                </Box>
              </Menu.Item>
            );
          })}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
};