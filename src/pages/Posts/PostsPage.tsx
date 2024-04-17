import React, { useEffect, useState } from "react";
import { Posts, getPosts } from "../../services/api/posts";
import { useNavigate } from "react-router-dom";
import LikeIcon from "../../assets/icons/like.svg?react";
import VeiwIcon from "../../assets/icons/eye.svg?react";
import CommentIcon from "../../assets/icons/comment.svg?react";
import CameraIcon from "../../assets/icons/camera.svg?react";
import FormattingCat from "../../components/format/FormattingCat";

const PostsPage: React.FC = () => {
  const navi = useNavigate();
  const [posts, setPosts] = useState<Posts[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Posts[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      if (res) {
        setPosts(res);
        setFilteredPosts(res);
      } else {
        console.log("글이 없습니다");
      }
    });
  }, []);

  const categoryHandler = (category: string) => {
    const newFilteredPosts = posts.filter((post) => post.category === category);
    setFilteredPosts(newFilteredPosts);
  };

  const categoryResetHandler = () => {
    setFilteredPosts(posts);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-center py-3 border-b bg-white">
        훈수게시판
      </h2>
      <ul className="flex gap-6 px-8 py-3 bg-white">
        <li onClick={categoryResetHandler} className="cursor-pointer">
          전체
        </li>
        <li onClick={() => categoryHandler("DAILY")} className="cursor-pointer">
          일상(잡담)
        </li>
        <li onClick={() => categoryHandler("LOVE")} className="cursor-pointer">
          연애
        </li>
        <li
          onClick={() => categoryHandler("EXERCISE")}
          className="cursor-pointer"
        >
          운동
        </li>
        <li onClick={() => categoryHandler("FOOD")} className="cursor-pointer">
          음식
        </li>
        <li onClick={() => categoryHandler("ETC")} className="cursor-pointer">
          기타
        </li>
      </ul>
      {filteredPosts.map((post) => (
        <ul
          className="py-5 px-8 border-b cursor-pointer"
          key={post.postId}
          onClick={() => navi(`/posts/${post.postId}`)}
        >
          <li>{post.voteOption}</li>
          <li className="font-bold">{post.title}</li>
          <li className="text-sm text-gray-500">{post.contents}</li>
          <li>
            <FormattingCat category={post.category} />
          </li>
          <li>{post.imageUrls.length > 0 ? <CameraIcon /> : ""}</li>
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
