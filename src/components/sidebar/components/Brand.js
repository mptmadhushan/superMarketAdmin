import React from "react";

// Chakra imports
import { Flex, useColorModeValue,Image } from "@chakra-ui/react";
import logoWhite from "assets/img/auth/logo.png";
// Custom components
import { SuperMarketLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("red.700", "white");

  return (
    <Flex align="center" direction="column">
      <Image src={logoWhite} w="100px" h="100px" />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
