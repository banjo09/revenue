import { Box, IconButton, Icon, Tooltip as ChakraTooltip, Image } from "@chakra-ui/react";
import { Link, FileText, FolderOpenDot, Users } from "lucide-react";

export const Sidebar = () => {
  const sidebarItems = [
    { id: "link", icon: Link, label: "Link in Bio", color: "blue.500", image: "/apps/bio.png" },
    { id: "file", icon: FileText, label: "Store", color: "gray.600", image: "/apps/store.png" },
    { id: "folder", icon: FolderOpenDot, label: "Media Kit", color: "gray.600", image: "/apps/media.png" },
    { id: "users", icon: Users, label: "Invoicing", color: "gray.600", image: "/apps/invoicing.png" },
  ];

  return (
    <Box
      position="fixed"
      left={0}
      top="50%"
      transform="translateY(-50%)"
      zIndex={100}
      bg="white"
      // borderRadius="0 12px 12px 0"
      borderRadius="18px"
      boxShadow="0 1px 3px 0.3px rgba(0, 0, 0, 0.1), 0 1px 3px -2px rgba(0, 0, 0, 0.05)"
      py={1}
      px={1}
      ml={6}
    >
      <Box display="flex" flexDirection="column" gap={2.0} bg="">
        {sidebarItems.map((item) => (
          <ChakraTooltip.Root key={item.id} positioning={{ placement: "right" }}>
            <ChakraTooltip.Trigger asChild >
              <Box
                as="button"
                borderRadius="3xl"
                _hover={{
                  transform: "scale(1.05)",
                  bg: "gray.100",
                }}
                transition="all 0.2s ease"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  boxSize={{ base: '1.6rem', md: '2.0rem', lg: '2.3rem' }}
                  objectFit="cover"
                  filter="grayscale(100%) brightness(0.9)"
                  _hover={{
                    filter: "grayscale(0%) brightness(1)",
                  }}
                  transition="filter 0.3s ease, transform 0.2s ease"
                />
              </Box>
            </ChakraTooltip.Trigger>
            <ChakraTooltip.Positioner >
              <ChakraTooltip.Content  >
                <ChakraTooltip.Arrow />
                <Box px={1.5} py={2.5} fontSize="sm" fontWeight="medium">
                  {item.label}
                </Box>
              </ChakraTooltip.Content>
            </ChakraTooltip.Positioner>
          </ChakraTooltip.Root>
        ))}
      </Box>
    </Box>
  );
};