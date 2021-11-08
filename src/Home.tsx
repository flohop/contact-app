import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Input,
  toast,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Contact } from "./types";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import * as EmailValidator from "email-validator";
import { FocusableElement } from "@chakra-ui/utils";

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const [contacts, setContact] = useState<Contact[]>([
    { firstName: "Florian", lastName: "Hoppe", email: "me@me.com" },
  ]);

  const toast = useToast();

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const popOverBody = React.useRef<FocusableElement>();

  const submitForm = async (onClose: () => void) => {
    // make sure the input is valid
    if (
      newFirstName.length === 0 ||
      newLastName.length === 0 ||
      !EmailValidator.validate(newEmail)
    ) {
      // show error text
      toast({
        title: "Invalid input",
        description: "Please fill out the form",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // form is valid
      // add document
      onClose();
      toast({
        title: "Added contact",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Popover
        initialFocusRef={
          popOverBody as React.MutableRefObject<FocusableElement>
        }
      >
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button>Add</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Add Contact</PopoverHeader>
              <PopoverBody>
                <FormControl
                  id="first-name"
                  isRequired
                  isInvalid={newFirstName.length === 0}
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                  />
                </FormControl>
                <FormControl
                  id="last-name"
                  isRequired
                  isInvalid={newLastName.length === 0}
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                </FormControl>
                <FormControl
                  id="email"
                  isRequired
                  isInvalid={!EmailValidator.validate(newEmail)}
                >
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </FormControl>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="teal"
                  variant="solid"
                  onClick={() => submitForm(onClose)}
                >
                  Add Contact
                </Button>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    </div>
  );
};
export default Home;
