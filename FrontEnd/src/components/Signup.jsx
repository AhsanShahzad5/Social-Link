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
    Link
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import authenticationAtom from '../../atoms/authAtom'
import { useSetRecoilState } from 'recoil'
import useShowToast from '../../hooks/useShowToast'
import userAtom from '../../atoms/userAtom'


export default function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreen = useSetRecoilState(authenticationAtom);
    const setUser = useSetRecoilState(userAtom);
    //calling showToast function from our hook
    const showToast = useShowToast()

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    const onChangeFunction = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {

            // const res = await axios.post('/api/users/signup', formData);
            const res = await fetch('/api/users/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log(data);
         
            if (data.error) {
                showToast("Error" ,data.error,'error' )
              
                return;
            }
            else {
                showToast("success","user created successfully. login now"
                ,'success' );
         
                setFormData({
                    name: "",
                    username: "",
                    email: "",
                    password: ""
                })
            }
            
            // storing user data in local stoorage
            localStorage.setItem('user-threads', JSON.stringify(data))
            setUser(data);
           
        } catch (error) {
            showToast("Error", error, "error");
            // console.log("error signing up", derror);

        }
    }

    const { name, username, email, password } = formData;

    return (
        <>
            <Flex
                align={'center'}
                justify={'center'}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.dark')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl isRequired>
                                        <FormLabel >Full Name </FormLabel>
                                        <Input type="text" name='name'

                                            onChange={onChangeFunction}
                                            value={name}

                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input type="text" name='username'
                                            onChange={onChangeFunction}
                                            value={username}


                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl isRequired >
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                    name='email'
                                    onChange={onChangeFunction}
                                    value={email}

                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
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
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={useColorModeValue("gray.600", "gray.700")}
                                    color={'white'}
                                    _hover={{
                                        bg: useColorModeValue("gray.700", "gray.900")
                                    }}
                                    onClick={handleSignup}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link color={'blue.400'}
                                        onClick={() => { setAuthScreen("login") }}

                                    >Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>)
}