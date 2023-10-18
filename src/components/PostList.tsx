import { useEffect, useState } from "react";
import { Post } from "../models/Post";
import { getPosts } from "../services/PostService";
import AddPostForm from "./AddPostForm";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await getPosts();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, []);

  const addPost = (data: Post): void => {
    setPosts([...posts, data]);
  };

  return (
    <>
      <AddPostForm onPostAdded={addPost} />
      <ul>
        {posts &&
          posts.slice(0, 5).map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PostList;
