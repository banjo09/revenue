import { Box, IconButton, Icon, Tooltip as ChakraTooltip } from "@chakra-ui/react";
import { Link, FileText, FolderOpenDot, Users } from "lucide-react";

export const Sidebar = () => {
  const sidebarItems = [
    { id: "link", icon: Link, label: "Link in Bio", color: "blue.500" },
    { id: "file", icon: FileText, label: "Documents", color: "gray.600" },
    { id: "folder", icon: FolderOpenDot, label: "Media Kit", color: "gray.600" },
    { id: "users", icon: Users, label: "Contacts", color: "gray.600" },
  ];

  return (
    <Box
      position="fixed"
      left={0}
      top="50%"
      transform="translateY(-50%)"
      zIndex={100}
      bg="white"
      borderRadius="0 12px 12px 0"
      boxShadow="sm"
      p={2}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {sidebarItems.map((item) => (
          <ChakraTooltip.Root key={item.id} positioning={{ placement: "right" }}>
            <ChakraTooltip.Trigger asChild>
              <IconButton
                variant="ghost"
                aria-label={item.label}
                size="md"
                borderRadius="md"
                _hover={{
                  bg: "gray.100",
                }}
              >
                <Icon color={item.color}>
                  <item.icon size={20} />
                </Icon>
              </IconButton>
            </ChakraTooltip.Trigger>
            <ChakraTooltip.Positioner>
              <ChakraTooltip.Content>
                <Box fontSize="sm" fontWeight="medium">
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