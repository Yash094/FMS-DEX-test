import { Box, Flex, Text } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";

export default function Navbar() {
  return (
    <Box w="full" borderBottomWidth="1px" borderColor="gray.100">
      <Flex
        maxW="6xl"
        w="full"
        mx="auto"
        justifyContent="space-between"
        alignItems="center"
        py="5"
        px={{ base: "5", xl: "0" }}
      >
        <Text fontWeight="bold" fontSize="2xl">
          FMS DEX
        </Text>
        <ConnectWallet 
          theme={"light"}
          btnTitle={"Connect Wallet"}
          modalTitle={""}
          modalSize={"wide"}
          welcomeScreen={{
            title: "FMS DEX",
            subtitle: "Swap FMS Token with MATIC",
            img: {
              src: "https://i.imgur.com/3D2Arx0.png",
              width: 150,
              height: 150,
            },
          }}
          modalTitleIconUrl={
            "https://i.imgur.com/34MRBfl.png"
          }
        />
      </Flex>
    </Box>
  );
}
