import React, { useState } from 'react'

//chakra ui imports
import { Link, VStack, Box, Flex, Text, Avatar, useToast, Button }
    from '@chakra-ui/react'
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";

//react icons
import { CgMoreO } from "react-icons/cg";
import { BsInstagram } from "react-icons/bs";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import useFollowUnfollow from '../../hooks/useFollowUnfollow';

const UserHeader = ({ user }) => {

    const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);
    // current user logged in while the user in props is the one whos id we are watching
    const currentUser = useRecoilValue(userAtom);

    //copy profile and show toast
    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: "Success.",
                status: "success",
                description: "Profile link copied.",
                duration: 2500,
                isClosable: true,
            });
        });
    };


    return (
        <>
            <VStack
                gap={"4"} alignItems={"start"}
            >
                <Flex justifyContent={"space-between"} w={"full"}>

                    <Box>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>
                            {user.name}
                        </Text>
                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"sm"}>{user.username}</Text>
                            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                                Social Link
                            </Text>
                        </Flex>
                    </Box>
                    <Box>
                        {user.profilePic && <Avatar
                            name={user.name}
                            size={{
                                base: "md",
                                md: "xl"
                            }} src={user.profilePic} />}

                        {!user.profilePic && <Avatar
                            name={user.name}
                            size={{
                                base: "md",
                                md: "xl"
                            }} src='' />}
                    </Box>
                </Flex>
                <Text>{user.bio} </Text>
                {currentUser?._id === user._id && (
                    <>
                        <Flex gap={3}>

                            <Link as={RouterLink} to='/update'>
                                <Button size={"sm"}>Update Profile</Button>
                            </Link>

                            <Link as={RouterLink} to='/settings'>
                                <Button size={"sm"}>Freeze Account</Button>
                            </Link>
                        </Flex>
                    </>
                )}
                {currentUser?._id !== user._id && (
                    <Button size={"sm"}
                        onClick={handleFollowUnfollow}
                        isLoading={updating}
                    >
                        {following ? "Unfollow" : "Follow"}
                    </Button>
                )}
                <Flex w={"full"} justifyContent={"space-between"}>
                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"}>{user.followers.length} followers</Text>
                        {/* <Box w='1' h='1' bg={"gray.light"} borderRadius={"full"}></Box> */}
                        {/* <Link color={"gray.light"}>instagram.com</Link> */}
                    </Flex>
                    <Flex>
                        <Link href="https://www.instagram.com" isExternal>
                            <Box className='icon-container'>
                                <BsInstagram size={24} cursor={"pointer"} />
                            </Box>
                        </Link>
                        <Box className='icon-container'>
                            <Menu>

                                <MenuButton>
                                    <CgMoreO size={24} cursor={"pointer"} />
                                </MenuButton>
                                <Portal>
                                    <MenuList bg={"gray.dark"}>
                                        <MenuItem bg={"gray.dark"} onClick={copyURL}>
                                            Copy link
                                        </MenuItem>
                                    </MenuList>
                                </Portal>
                            </Menu>
                        </Box>
                    </Flex>
                </Flex>

                <Flex w={"full"}>
                    <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
                        <Text fontWeight={"bold"}> Posts</Text>
                    </Flex>
                    {/* <Flex
                        flex={1}
                        borderBottom={"1px solid gray"}
                        justifyContent={"center"}
                        color={"gray.light"}
                        pb='3'
                        cursor={"pointer"}
                    >
                        <Text fontWeight={"bold"}> Replies</Text>
                    </Flex> */}
                </Flex>

            </VStack>
        </>
    )
}

export default UserHeader