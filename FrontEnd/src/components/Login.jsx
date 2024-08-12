import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react'

import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { useSetRecoilState } from 'recoil'
import authenticationAtom from '../../atoms/authAtom'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'



export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreen = useSetRecoilState(authenticationAtom);
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const onChangeFunction = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {

            // const res = await axios.post('/api/users/signup', formData);
            const res = await fetch('/api/users/login', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
        
            if (data.error) {
                showToast("Error", data.error, 'error')
                return;
            }
            else {
                showToast("success", "Logged in successfully"
                    , 'success');

                setFormData({
                    username: "",
                    password: ""
                })
            }
            // storing user data in local stoorage
            localStorage.setItem('user-threads', JSON.stringify(data));
            setUser(data);
            
        } catch (error) {
            showToast("Error", error, 'error')

        }finally{
            setLoading(false)
        }
    }

    const { username, password } = formData;

    return (
        <>
            <Flex
                align={'center'}
                justify={'center'}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Login
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.dark')}
                        boxShadow={'lg'}
                        p={8}
                        w={{
                            base: "full",
                            sm: "400px"
                        }}>
                        <Stack spacing={4}>
                            <HStack>

                            </HStack>
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" name='username'
                                    onChange={onChangeFunction}
                                    value={username}
                                />
                            </FormControl>
                            <FormControl  isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        onChange={onChangeFunction}
                                        value={password}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Logging-in"
                                    size="lg"
                                    bg={useColorModeValue("gray.600", "gray.700")}
                                    color={'white'}
                                    _hover={{
                                        bg: useColorModeValue("gray.700", "gray.900")
                                    }}

                                    onClick={handleLogin}
                                    isLoading = {loading}
                                >
                                    Login
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Not a user? <Link color={'blue.400'}
                                        onClick={() => { setAuthScreen("signup") }}

                                    >Signup</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>)
}