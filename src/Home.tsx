import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import { FocusableElement } from "@chakra-ui/utils";
import * as EmailValidator from "email-validator";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ContactList from "./ContactList";
import { db } from "./firebaseClient";
import { Contact } from "./types";
type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const [contacts, setContact] = useState<Contact[]>([
    { firstName: "", lastName: "", email: "" },
  ]);

  const toast = useToast();

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // get all contacats
  useEffect(() => {
    getDocs(collection(db, "contacts")).then((shot) => {
      const newContacts: Contact[] = [];
      shot.forEach((doc) => {
        newContacts.push(doc.data() as Contact);
        // contacts.push(doc.data)
      });
      setContact(newContacts);
    });
  }, []);

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
      const docRef = await addDoc(collection(db, "contacts"), {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
      }).then((res) => {
        console.log("Response: ", res);

        contacts.push({
          firstName: newFirstName,
          lastName: newLastName,
          email: newEmail,
        });

        setNewFirstName("");
        setNewLastName("");
        setNewEmail("");

        toast({
          title: "Added contact",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
      console.log("Added doc: ", docRef);
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
      <Heading mb="2%">Contacts</Heading>
      <ContactList contacts={contacts} />
    </div>
  );
};
export default Home;
