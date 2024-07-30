import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// react router dom
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


//chakra imports
import { ChakraProvider, Container } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { ColorModeScript } from "@chakra-ui/color-mode";
import UserPage from './pages/UserPage.jsx'
import Header from './components/Header.jsx'
import PostPage from './pages/PostPage.jsx'
import AuthenticationPage from './pages/AuthenticationPage.jsx'

//chakra methods
const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#101010")(props),
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};

const theme = extendTheme({ config, styles, colors });

// router

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/:username",
    element: <UserPage />
  },
  {
    path: "/:username/post/:pid",
    element: <PostPage />
  },
  {
    path: "/login",
    element:<AuthenticationPage/>
  }
])

//main.jsx core code
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Container maxW={'650px'}>

        <Header />
        <RouterProvider router={router} />
      </Container>
    </ChakraProvider>
  </React.StrictMode>,
)
