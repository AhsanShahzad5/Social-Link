import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Header from '../components/Header';

const Layout = () => {
  return (
    <>
      <Container maxW={'670px'}>
        <Header />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
