import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import Header from '../components/Header';

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Box position={"relative"}  w="full" >
        <Container maxW={pathname === '/'?'900px' : '690px'}>
          <Header/>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
