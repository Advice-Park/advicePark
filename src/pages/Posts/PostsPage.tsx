import React, { useEffect, useState } from "react";
import { Posts, getPosts } from "../../services/api/posts";

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      res ? setPosts(res) : console.log("글이 없습니다");
    });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <ul>
          <li>{post.title}</li>
          <li>{post.contents}</li>
          <li>{post.category}</li>
          <li>{post.imageUrls}</li>
          <li>{post.votingEnabled}</li>
          <li>{post.viewCount}</li>
          <li>{post.commentCount}</li>
        </ul>
      ))}
    </div>
  );
};

export default PostsPage;
