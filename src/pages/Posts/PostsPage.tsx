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
  // 카테고리 선택한 상태인지 관리
  const [filteredState, setFilteredState] = useState(false);

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
    setFilteredState(true);
  };

  const categoryResetHandler = () => {
    setFilteredPosts(posts);
    setFilteredState(false);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-center py-3 border-b bg-white">
        훈수게시판
      </h2>
      <ul className="flex gap-6 px-8 py-3 bg-white drop-shadow">
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
          className="py-5 px-8 border-b bg-white cursor-pointer"
          key={post.postId}
          onClick={() => navi(`/posts/${post.postId}`)}
        >
          <li className="flex gap-3 text-sm">
            {filteredState ? null : (
              <span className="rounded-full px-2 p-1 mb-1 text-white bg-light-blue">
                <FormattingCat category={post.category} />
              </span>
            )}

            {post.postVoteOption === "YES_NO" ? (
              <span className="rounded-full py-1 text-mid-blue">찬반💥</span>
            ) : null}
          </li>
          <li className="font-bold flex justify-between mb-1">
            {post.title} {post.imageUrls.length > 0 ? <CameraIcon /> : ""}
          </li>
          <li className="text-sm text-gray-500 inline-block overflow-hidden leading-4 max-h-8 text-wrap">
            {post.contents}
          </li>
          <li className="flex justify-between max-w-60 text-xs">
            <span className="icon-layout">
              <LikeIcon /> {post.favoriteCount}
            </span>
            <span className="icon-layout">
              <VeiwIcon /> {post.viewCount}
            </span>
            <span className="icon-layout">
              <CommentIcon /> {post.commentCount}
            </span>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default PostsPage;
