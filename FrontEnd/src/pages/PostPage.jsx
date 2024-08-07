import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import Actions from "../components/Actions";
import { DeleteIcon } from "@chakra-ui/icons";

import React, { useState } from 'react'
import Comment from "../components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false)

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={"/ahsan.jpg"} size={"md"} name='Ahsan' />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {"ahsan"}
            </Text>
            <Image src='/verified.png' w='4' h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
            1d ago
          </Text>

          {/* {currentUser?._id === user._id && (
            <DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePost} />
          )} */}
        </Flex>
      </Flex>

      <Text my={3}>{"my post"}</Text>


      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={'/post1.png'} w={"full"} />
      </Box>


      <Flex gap={3} my={3}>
        {/* <Actions liked={liked} setLiked={setLiked} /> */}
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize='sm'>
          {"77"} replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize='sm'>
          {"1.2k"} likes
        </Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />
      <Comment comment="nice work man" createdAt="5d" likes="500" username="ahmad" />
      <Comment comment="appreciated" createdAt="1d" likes="500" username="haris" />
      <Comment comment="great" createdAt="2d" likes="500" username="rame" />
    </>
  )
}

export default PostPage