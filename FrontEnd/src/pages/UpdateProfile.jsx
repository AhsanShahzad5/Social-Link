
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react';

import { useRef , useState } from 'react';
import { useRecoilState } from 'recoil';
import userAtom from '../../atoms/userAtom';
import useShowToast from '../../hooks/useShowToast'
import usePreviewImage from '../../hooks/usePreviewImage';

export default function UpdateProfile() {
  const [user, setUser] = useRecoilState(userAtom);
  //updating spinner
  const [updating, setUpdating] = useState(false)
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: "",
    bio: user.bio,
  })

  console.log(user , "is here");

  const showToast = useShowToast()

  const { name, username, email, password, bio } = inputs;

  const fileRef = useRef(null);

  const {handleImageChange , imgUrl} = usePreviewImage()

  const onChangeFunction = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if(updating) return;
    try {
      // const res = await axios.post('/api/users/signup', inputs);
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        //profile pic is written like this becuase its coming from the custom hook 
        body: JSON.stringify({ ...inputs, profilePic: imgUrl })
      });

      const data = await res.json(); //updated user obj
      console.log(data);

      if (data.error) {
        showToast("Error", data.error, 'error')
        return;
      }
      showToast("success", "Profile updated successfully"
        , 'success');
        setUser(data);
        localStorage.setItem("user-threads", JSON.stringify(data));

    } catch (error) {
      showToast("Error", error, "error");
      console.log("error signing up", error);

    }finally{
      setUpdating(false);
    }
  }

  return (
    <form onSubmit={handleFormSubmission}>
      <Flex align={"center"} justify={"center"} my={6}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id='userName'>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size='xl' boxShadow={"md"}
                  src={imgUrl || user.profilePic}

                />
              </Center>
              <Center w='full'>
                {/* basically it is refering to the file input thing which we had hiddeen. so basically whnenever we click here , action of that input tag is performed */}
                <Button w='full' onClick={() => fileRef.current.click()} >
                  Change Avatar
                </Button>
                {/* //using useRef hook to refernce it */}
                <Input type='file' hidden ref={fileRef}

                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder='Ahsan..'
              _placeholder={{ color: "gray.500" }}
              type='text'
              name='name'
              value={name}
              onChange={onChangeFunction}
            />
          </FormControl>
          <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder='Ahsan12345'
              _placeholder={{ color: "gray.500" }}
              type='text'
              name='username'
              onChange={onChangeFunction}
              value={username}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder='your-email@example.com'
              _placeholder={{ color: "gray.500" }}
              type='email'
              name='email'
              onChange={onChangeFunction}
              value={email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder='My Bio....'
              _placeholder={{ color: "gray.500" }}
              type='text'
              name='bio'
              onChange={onChangeFunction}
              value={bio}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder='password'
              _placeholder={{ color: "gray.500" }}
              type='password'
              name='password'
              onChange={onChangeFunction}
              value={password}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w='full'
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"green.400"}
              color={"white"}
              w='full'
              _hover={{
                bg: "green.500",
              }}
              type='submit'
              isLoading = {updating}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}