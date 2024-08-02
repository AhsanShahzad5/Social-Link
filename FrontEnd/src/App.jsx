import { useState } from 'react'
import './App.css'
import { Container } from '@chakra-ui/react'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import UserPage from './pages/UserPage.jsx'
import Header from './components/Header.jsx'
import PostPage from './pages/PostPage.jsx'
import HomePage from './pages/HomePage.jsx'
import AuthenticationPage from './pages/AuthenticationPage.jsx'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import Signup from './components/Signup'


function App() {
  const [count, setCount] = useState(0)
  const user = useRecoilValue(userAtom);
  //router
  const router = createBrowserRouter([
    {
      path: "/",
      
      element: (user?<HomePage/>: <Navigate to = '/auth'/>)
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
      path: "/auth",
      element: (!user?<AuthenticationPage/>: <Navigate to = '/'/>)
    }
  ])
  return (
    <>
      <Container maxW={'670px'}>
        <Header />
        <RouterProvider router={router} />
      </Container>
    </>
  )
}

export default App
