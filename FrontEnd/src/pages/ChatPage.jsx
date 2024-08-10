import React from 'react'
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import { GiConversation } from "react-icons/gi";
import { useEffect, useState } from "react";
import Conversation from '../components/Conversation';
import MessageContainer from '../components/MessageContainer';
import useShowToast from '../../hooks/useShowToast';
import { useRecoilState } from 'recoil';
import { conversationAtom, selectedConversationAtom } from '../../atoms/messagesAtom';


const ChatPage = () => {
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [conversations, setConversations] = useRecoilState(conversationAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);

  const showToast = useShowToast();
  const handleConversationSearch = () => {
    console.log("hi");
  }

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
//        console.log(data);
        setConversations(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingConversations(false);
      }
    }
    getConversations();
  }, [showToast, setConversations])
  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{ base: "100%", md: "80%", lg: "750px" }}
      p={4}
      transform={"translateX(-50%)"}
    >
      <Flex
        gap={4}
        flexDirection={{ base: "column", md: "row" }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        mx={"auto"}>

        <Flex
          flex={30} gap={2} flexDirection={"column"} maxW={{ sm: "250px", md: "full" }} mx={"auto"}>

          <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
            Your Conversations
          </Text>
          <form onSubmit={handleConversationSearch}>
            <Flex alignItems={"center"} gap={2}>
              <Input placeholder='Search for a user'
              // onChange={(e) => setSearchText(e.target.value)} 

              />
              <Button size={"sm"} onClick={handleConversationSearch}

              // isLoading={searchingUser}

              >
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          {loadingConversations && [0, 1, 2, 3, 4].map((_, i) => (
            <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
              <Box>
                <SkeletonCircle size={"10"} />
              </Box>
              <Flex w={"full"} flexDirection={"column"} gap={3}>
                <Skeleton h={"10px"} w={"80px"} />
                <Skeleton h={"8px"} w={"90%"} />
              </Flex>
            </Flex>
          ))}
          {/* this code above is a way of showing 5 skeletons like render smthing 5 times */}


          {!loadingConversations &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
              />
            ))
          }

        </Flex>


        {/* if no convo is present  */}
        {!selectedConversation._id &&
          <Flex
            flex={70} borderRadius={"md"} p={2} flexDir={"column"} alignItems={"center"} justifyContent={"center"} height={"400px"}
          >
            <GiConversation size={100} />
            <Text fontSize={20}>Select a conversation to start messaging</Text>
          </Flex>}

        {selectedConversation._id && <MessageContainer />}
      </Flex>
    </Box>

  )
}

export default ChatPage