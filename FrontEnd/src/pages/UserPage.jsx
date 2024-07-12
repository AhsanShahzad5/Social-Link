import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
    <UserHeader />
    <UserPost userName={'marky'}  avatarImg={'/zuck-avatar.png'} likes = {'1.2k'} replies = {"35"} postImg = "/post1.png" postTitle = {"just joined here"}/>

    <UserPost userName={'ahsan'} avatarImg={'/ahsan.jpg'} likes = {"1.5k"} replies = {"51"} postImg = "/post2.png" postTitle = {"learn now"}/>

    <UserPost userName={'Elon'} likes = {"2k"} replies = {"65"} postImg = "/post3.png" postTitle = {"just joined today " }
      avatarImg={'/elon.jpeg'}
    />
    </>
  )
}

export default UserPage