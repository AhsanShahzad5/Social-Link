import { Outlet } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import Header from '../components/Header';

const Layout = () => {
  return (
    <>
    <Box 
    position={"relative"}
    w="full"
    >
      <Container maxW={'690px'}>
        <Header />
        <Outlet />
      </Container>
    </Box>
    </>
  );
};

export default Layout;
