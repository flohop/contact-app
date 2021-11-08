import { useState } from "react";
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState("none");
  return (
    <Flex>
      <Flex position="fixed" top="1rem" right="1rem" align="center">
        {/* Desktop */}
        <Flex display={["none", "none", "flex", "flex"]}>
          <Link to="/">
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Home
            </Button>
          </Link>

          <Link to="/add">
            <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
              Add
            </Button>
          </Link>
        </Flex>

        {/* Mobile */}
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay("flex")}
          display={["flex", "flex", "none", "none"]}
        />
        <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
      </Flex>

      {/* Mobile Content */}
      <Flex
        w="100vw"
        display={display}
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay("none")}
          />
        </Flex>

        <Flex flexDir="column" align="center">
          <Link to="/">
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Home
            </Button>
          </Link>

          <Link to="/add">
            <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
              Add
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
