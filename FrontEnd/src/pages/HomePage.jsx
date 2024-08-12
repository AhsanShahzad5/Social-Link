import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useShowToast from "../../hooks/useShowToast";
import Post from "../components/Post";
import LogoutButton from "../components/LogoutButton";
import CreatePost from "../components/CreatePost";

import postsAtom from "../../atoms/postsAtom";
import userAtom from "../../atoms/userAtom";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userAtom)
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);



  return (
    <>
      {user && <CreatePost />}
      <Flex gap='10' alignItems={"flex-start"} >
        <Box flex={90} >
          {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

          {loading && (
            <Flex justify='center'>
              <Spinner size='xl' />
            </Flex>
          )}

          {posts.map((post) => (
            <Post key={post._id} post={post} postedBy={post.postedBy} />
          ))}
        </Box>
        <Box flex={30} display={{ base: "none", md: "block", }} >
          <SuggestedUsers/>
        </Box>
      </Flex>
      {/* {user && <LogoutButton />} */}

    </>);
};

export default HomePage;