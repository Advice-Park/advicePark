import React, { useEffect, useState } from "react";
import { Posts, getPosts } from "../../services/api/posts";
import { useNavigate } from "react-router-dom";
import LikeIcon from "../../assets/icons/like.svg?react";
import VeiwIcon from "../../assets/icons/eye.svg?react";
import CommentIcon from "../../assets/icons/comment.svg?react";

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
      <h2 className="text-lg font-bold text-center py-3 border-b bg-white">
        훈수게시판
      </h2>
      {posts.map((post) => (
        <ul
          className="py-5 px-8 border-b"
          key={post.postId}
          onClick={() => navi(`/posts/${post.postId}`)}
        >
          <li>{post.voteOption}</li>
          <li className="font-bold">{post.title}</li>
          <li className="text-sm text-gray-500">{post.contents}</li>
          <li>{post.category}</li>
          <li>{post.imageUrls.length > 0 ? "사진" : ""}</li>
          <li className="flex justify-between max-w-60 text-xs">
            <span className="flex gap-1">
              <LikeIcon /> {post.favoriteCount}
            </span>
            <span className="flex gap-1">
              <VeiwIcon /> {post.viewCount}
            </span>
            <span className="flex gap-1">
              <CommentIcon /> {post.commentCount}
            </span>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default PostsPage;
