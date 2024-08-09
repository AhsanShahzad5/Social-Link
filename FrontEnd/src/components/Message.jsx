import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { BsCheck2All } from "react-icons/bs";

import React from 'react'

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex
          gap={2} alignSelf={"flex-end"}
        >
          <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"white"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis neque ipsam vero omnis sint provident
            </Text>
            <Box
              alignSelf={"flex-end"}
              ml={1}
              color={true ? "blue.400" : ""}
              fontWeight={"bold"}
            >
              <BsCheck2All size={16} />
            </Box>
          </Flex>
          <Avatar src={'/ahsan.jpg'} w='7' h={7} />

        </Flex>
      ) : (
        <Flex
          gap={2} alignSelf={"flex-end"}
        >
          <Avatar src={'/zuck-avatar.png'} w='7' h={7} />
          <Flex bg={"gray.500"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"black"}>

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis neque ipsam vero omnis sint provident
            </Text>
            <Box
              ml={1}
              color={true ? "blue.400" : ""}
              fontWeight={"bold"}
            >
              <BsCheck2All size={16} />
            </Box>
          </Flex>

        </Flex>
      )}

    </>
  )
}

export default Message