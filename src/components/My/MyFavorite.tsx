import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Posts, getFavoritePosts } from "../../services/api/posts";
import LikeIcon from "../../assets/icons/like.svg?react";
import VeiwIcon from "../../assets/icons/eye.svg?react";
import CommentIcon from "../../assets/icons/comment.svg?react";

const MyFavorite: React.FC = () => {
  const navi = useNavigate();
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    getFavoritePosts().then((res) => {
      res ? setPosts(res) : console.log("글이 없습니다");
    });

  }, []);

  return (
    <div>
      <h3>내가 즐겨찾기 한 글</h3>
      <div className="flex gap-3 w-full">
        {posts.map((post) => (
          <ul
            className="py-5 px-8 border-b cursor-pointer"
            key={post.postId}
            onClick={() => navi(`/posts/${post.postId}`)}
          >
            <li>{post.voteOption}</li>
            <li>{post.category}</li>
            <li className="font-bold">{post.title}</li>
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
    </div>
  );
};

export default MyFavorite;
