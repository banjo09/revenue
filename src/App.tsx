import { useState } from 'react'
import { Box, Button, Heading, VStack } from '@chakra-ui/react'
import './App.css'

function App() {

  return (
    <>
      <VStack minH="100vh" justify="center" bg="gray.50">
        <Box textAlign="center">
          <Heading mb={4}>Welcome to Chakra UI v3 + Vite ⚡</Heading>
          <Button colorScheme="blue">Get Started</Button>
        </Box>
      </VStack>
    </>
  )
}

export default App
