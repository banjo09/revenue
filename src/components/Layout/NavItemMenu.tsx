import {
  Drawer, Portal, Box, Text, Icon, Separator,
  CloseButton, Image, Button
} from "@chakra-ui/react";
import { tabs } from "./Header";

export const NavItemMenu = () => {

  return (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Context>
            {(store) => (
              <Drawer.Body pt="0" >
                <Box
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
      </Drawer.Positioner>
    </Portal>
  );
};