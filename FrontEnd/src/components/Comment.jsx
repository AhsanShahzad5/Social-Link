import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Actions from "./Actions";

const Comment = ({ username, comment, likes, createdAt }) => {
    const [liked, setLiked] = useState()
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={"/zuck-avatar.png"} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize='sm' fontWeight='bold'>
                            {username}
                        </Text>
                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.ligth"}>
                                {createdAt}
                            </Text>
                        </Flex>
                    </Flex>
                    <Text>{comment}</Text>
                    <Actions liked={liked} setLiked={setLiked} />
                    <Text fontSize={"sm"} color={"gray.light"} >
                        {likes + (liked ? 1 : 0)}
                    </Text>
                </Flex>
            </Flex>
            <Divider />
        </>
    );
};

export default Comment;