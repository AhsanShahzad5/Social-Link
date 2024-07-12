import React from 'react'

//chakra ui imports
import { Link, Stack, HStack, VStack, Box, Flex, Text, Avatar , useToast } 
from '@chakra-ui/react'
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";

//react icons
import { CgMoreO } from "react-icons/cg";
import { BsInstagram } from "react-icons/bs";

const UserHeader = () => {

    //copy profile and show toast
    const toast = useToast();
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
                            {"Ahsan"}
                        </Text>
                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"sm"}>{"Ahsan Shahzad"}</Text>
                            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                                Threads.net
                            </Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Avatar name='Ahsan' size={{
                            base : "md",
                            md : "xl"
                        }} src='/ahsan.jpg' />
                    </Box>
                </Flex>
                <Text>Ceo of this app </Text>

                <Flex w={"full"} justifyContent={"space-between"}>
                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"}>5k followers</Text>
                        <Box w='1' h='1' bg={"gray.light"} borderRadius={"full"}></Box>
                        <Link color={"gray.light"}>instagram.com</Link>
                    </Flex>
                    <Flex>
                        <Box className='icon-container'>
                            <BsInstagram size={24} cursor={"pointer"} />
                        </Box>
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
					<Text fontWeight={"bold"}> Threads</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Replies</Text>
				</Flex>
			</Flex>

            </VStack >
        </>
    )
}

export default UserHeader