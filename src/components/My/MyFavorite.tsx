import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritePosts, getFavoritePosts } from "../../services/api/posts";
import LikeIcon from "../../assets/icons/like.svg?react";
import VeiwIcon from "../../assets/icons/eye.svg?react";
import CommentIcon from "../../assets/icons/comment.svg?react";
import CameraIcon from "../../assets/icons/camera.svg?react";

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
      <h3 className="h3-primary">내가 즐겨찾기 한 글({favPosts.length})</h3>
      <div className="w-full">
        {favPosts.map((posts) => (
          <ul
            className="p-2 px-5 border-b cursor-pointer"
            key={posts.post.postId}
            onClick={() => navi(`/posts/${posts.post.postId}`)}
          >
            <li>{posts.post.postVoteOption}</li>
            <li className="font-bold">{posts.post.title}</li>
            <li className="flex justify-between max-w-60 text-xs">
              <span>{posts.post.imageUrls.length > 0 ? <CameraIcon /> : ""}</span>

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
