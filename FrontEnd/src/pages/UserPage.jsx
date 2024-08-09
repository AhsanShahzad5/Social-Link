import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import Post from '../components/Post'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import useShowToast from '../../hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react';
import postsAtom from '../../atoms/postsAtom';
import useGetUserProfile from '../../hooks/useGetUserProfile';
import { useRecoilState, useRecoilValue } from 'recoil';

const UserPage = () => {

  const { username } = useParams()
  const showToast = useShowToast()
  const {user , loading} = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
 
  useEffect(() => {
   
    const getPosts = async ()=>{
      setFetchingPosts();
      try {
				const res = await fetch(`/api/posts/user/${username}`);
				const data = await res.json();
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setFetchingPosts(false);
			}
    }
    getPosts();
  }, [username,showToast,setPosts])
console.log("posts is here wuth recoil" , posts);
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
      
      {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
			{fetchingPosts && (
				<Flex justifyContent={"center"} my={12}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{posts.map((post) => (
				<Post key={post._id} post={post} postedBy={post.postedBy} />
			))}


    </>
  )
}

export default UserPage