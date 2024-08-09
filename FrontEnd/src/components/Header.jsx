import { Flex, Image, useColorMode, Link, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import userAtom from '../../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { Link as RouterLink } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { IoIosChatbubbles } from "react-icons/io";
import CreatePost from '../components/CreatePost'
import LogoutButton from '../components/LogoutButton'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);

  // Responsive sizes for icons and logo
  const iconSize = useBreakpointValue({ base: 21, md: 24 });
  const logoWidth = useBreakpointValue({ base: "5", md: "6" });

  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      mt={6}
      mb="12"
      px={4}
      wrap="wrap"
    >
      <Flex>
        {user && (
          <Link as={RouterLink} to='/' marginRight={4}>
            <AiFillHome size={iconSize} />
          </Link>
        )}
      </Flex>

      
      <Flex>
        {user && (
          <Link as={RouterLink} to={`/${user.username}`} marginLeft={4}>
            <RxAvatar size={iconSize} />
          </Link>
        )}
      </Flex>
      <Image
        cursor={"pointer"}
        alt='logo'
        w={logoWidth}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
      <Flex>
        {user && (
          <Link as={RouterLink} to={`/chat`} marginLeft={4}>
            <IoIosChatbubbles size={iconSize} />
          </Link>

        )}
      </Flex>
      
      <Flex>
        {user && <LogoutButton size={iconSize} />}
      </Flex>
    </Flex>
  );
}

export default Header;
