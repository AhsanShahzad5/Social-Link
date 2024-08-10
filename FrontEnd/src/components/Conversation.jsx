import React from 'react'
import {
    Avatar,
    AvatarBadge,
    Box,
    Flex,
    Image,
    Stack,
    Text,
    WrapItem,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import { selectedConversationAtom } from '../../atoms/messagesAtom';

const Conversation = ({ conversation }) => {
    const currentUser = useRecoilValue(userAtom);
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
    const user = conversation.participants[0];
    const lastMessage = conversation.lastMessage;
    const colorMode = useColorMode();
    // console.log("selected convo",selectedConversation)
    return (
        <Flex
            gap={4}
            alignItems={"center"}
            p={"1"}
            _hover={{
                cursor: "pointer",
                bg: useColorModeValue("gray.400", "gray.dark"),
                color: "white",
            }}

            borderRadius={"md"}
            
            onClick={() => {
                setSelectedConversation({
                    _id: conversation._id,
                    userId: user._id,
                    username: user.username,
                    userProfilePic: user.profilePic ,
                    mock : conversation.mock
                })
            }}
            bg={
				selectedConversation?._id === conversation._id ? (colorMode === "light" ? "gray.400" : "gray.dark") : ""
			}
        >

            <WrapItem>
                <Avatar
                    size={{
                        base: "xs",
                        sm: "sm",
                        md: "md",
                    }}
                    src={user.profilePic}
                >
                    {true ? <AvatarBadge boxSize='1em' bg='green.500' /> : ""}
                </Avatar>
            </WrapItem>
            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight='700' display={"flex"} alignItems={"center"}>
                    {user.username}
                    <Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                    {/* if the msg is from us , */}
                    {currentUser._id === lastMessage.sender ? (
                        <BsCheck2All size={16} />) : ("")}
                    {lastMessage.text.length > 20
                        ? lastMessage.text.substring(0, 20) + "..."
                        : lastMessage.text || <BsFillImageFill size={16} />}
                </Text>
            </Stack>
        </Flex>
    )
}

export default Conversation