import {
  Box,
  Center,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Contact } from "./types";

type ContactListProps = {
  contacts: Contact[];
};

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  if (contacts.length === 0) {
    return <Heading>Add contacts and they will show up here</Heading>;
  }
  return (
    <Center>
      <List>
        {contacts.map((contact) => (
          <ListItem
            key={String(
              contact.email + ":" + contact.firstName + ":" + contact.lastName
            )}
          >
            <HStack spacing="24px">
              <Box w="33%" alignContent="start">
                <Text fontSize="lg" align="left" w="100%">
                  {contact.firstName}
                </Text>
              </Box>
              <Box w="33%">
                <Text fontSize="lg" align="left" w="100%">
                  {contact.lastName}
                </Text>
              </Box>
              <Box>
                <Text fontSize="lg" align="left" w="100%">
                  {contact.email}
                </Text>
              </Box>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Center>
  );
};
export default ContactList;
