import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import useShowToast from '../../hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react';
const UserPage = () => {

  const [user, setUser] = useState(null);
  const { username } = useParams()
  const showToast = useShowToast()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, 'error')
          return;
        }
        setUser(data);
      } catch (error) {
        console.log(error);
        showToast("Error", data.error, 'error')

      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [username])

  if (!user && loading) {
    return (
      <Flex  justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }
  if (!user && !loading) {
    return <h1>User not found</h1>;
  }
  return (
    <>
      <UserHeader user={user} />
      <UserPost userName={'marky'} avatarImg={'/zuck-avatar.png'} likes={'1.2k'} replies={"35"} postImg="/post1.png" postTitle={"just joined here"} />

      <UserPost userName={'ahsan'} avatarImg={'/ahsan.jpg'} likes={"1.5k"} replies={"51"} postImg="/post2.png" postTitle={"learn now"} />

      <UserPost userName={'Elon'} likes={"2k"} replies={"65"} postImg="/post3.png" postTitle={"just joined today "}
        avatarImg={'/elon.jpeg'}
      />
    </>
  )
}

export default UserPage