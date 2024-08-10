import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { selectedConversationAtom } from "../../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";
import userAtom from "../../atoms/userAtom";

const Message = ({ message, ownMessage }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <>
      {ownMessage ? (
        <Flex
          gap={2} alignSelf={"flex-end"}
        >
          <Flex bg={"blue.400"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"white"}>
              {message.text}
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
          <Avatar src={user.profilePic} w='7' h={7} />

        </Flex>
      ) : (
        <Flex
          gap={2} alignSelf={"flex-start"}
        >
          <Avatar src={selectedConversation.userProfilePic} w='7' h={7} />
          <Flex bg={"gray.500"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"black"}>
            {message.text}
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