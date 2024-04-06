import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritePosts, Posts, getFavoritePosts } from "../../services/api/posts";
import LikeIcon from "../../assets/icons/like.svg?react";
import VeiwIcon from "../../assets/icons/eye.svg?react";
import CommentIcon from "../../assets/icons/comment.svg?react";

const MyFavorite: React.FC = () => {
  const navi = useNavigate();
  const [favPosts, setFavPosts] = useState<FavoritePosts[]>([]);

  useEffect(() => {
    getFavoritePosts().then((res) => {
      res ? setFavPosts(res) : console.log("글이 없습니다");
    });

  }, []);

  return (
    <div>
      <h3>내가 즐겨찾기 한 글</h3>
      <div className="flex gap-3 w-full">
        {favPosts.map((posts) => (
          <ul
            className="py-5 px-8 border-b cursor-pointer"
            key={posts.post.postId}
            onClick={() => navi(`/posts/${posts.post.postId}`)}
          >
            <li>{posts.post.voteOption}</li>
            <li>{posts.post.category}</li>
            <li className="font-bold">{posts.post.title}</li>
            <li>{posts.post.imageUrls.length > 0 ? "사진" : ""}</li>
            <li className="flex justify-between max-w-60 text-xs">
              <span className="flex gap-1">
                <LikeIcon /> {posts.post.favoriteCount}
              </span>
              <span className="flex gap-1">
                <VeiwIcon /> {posts.post.viewCount}
              </span>
              <span className="flex gap-1">
                <CommentIcon /> {posts.post.commentCount}
              </span>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MyFavorite;
