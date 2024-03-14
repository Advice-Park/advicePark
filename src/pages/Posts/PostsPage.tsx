import React, { useEffect, useState } from "react";
import { Posts, getPosts } from "../../services/api/posts";
import { useNavigate } from "react-router-dom";

const PostsPage: React.FC = () => {
  const navi = useNavigate();
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      res ? setPosts(res) : console.log("글이 없습니다");
    });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <ul className="p-5" key={post.postId} onClick={()=>navi(`/posts/${post.postId}`)}>
          <li>제목: {post.title}</li>
          <li>{post.contents}</li>
          <li>{post.category}</li>
          <li>{post.imageUrls}</li>
          <li>{post.votingEnabled}</li>
          <li>뷰: {post.viewCount}</li>
          <li>댓글: {post.commentCount}</li>
        </ul>
      ))}
    </div>
  );
};

export default PostsPage;
