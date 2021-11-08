import { AddIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseClient";
import * as EmailValidator from "email-validator";

type AddContactProps = {};

const AddContact: React.FC<AddContactProps> = ({}) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const toast = useToast();

  const submitForm = async () => {
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
      // form is valid
      // add document
      const docRef = await addDoc(collection(db, "contacts"), {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
      }).then((res) => {
        console.log("Response: ", res);

        setNewFirstName("");
        setNewLastName("");
        setNewEmail("");
      });
      console.log("Added doc: ", docRef);
      toast({
        title: "Added contact",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center>
      <Box width={"70%"}>
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
          mt={"5"}
          leftIcon={<AddIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={() => submitForm()}
        >
          Add Contact
        </Button>
      </Box>
    </Center>
  );
};
export default AddContact;
