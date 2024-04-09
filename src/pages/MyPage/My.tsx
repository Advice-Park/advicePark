import React, { useEffect, useState } from "react";
import { Posts, getMyPosts } from "../../services/api/posts";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";
import VeiwIcon from "../../assets/icons/eye.svg?react";
import CommentIcon from "../../assets/icons/comment.svg?react";
import MyComments from "../../components/My/MyComments";
import MyFavorite from "../../components/My/MyFavorite";

const My: React.FC = () => {
  const navi = useNavigate();

  //recoil 사용 선언
  const auth = useRecoilValue(authState);

  const [myPosts, setMyPosts] = useState<Posts[]>([]);

  useEffect(() => {
    getMyPosts().then((res) => {
      res ? setMyPosts(res) : console.log("내가 쓴 글이 없습니다");
    });
  }, []);

  return (
    <div className="w-full mt-5">
      <h2 className="h2-primary">My 페이지</h2>
      <div className="flex gap-2">
        <img src={auth.image} className="w-20 h-20 rounded-full" />
        {auth.name}
      </div>

      <h3>내가 쓴 글</h3>
        {myPosts.map((post) => (
          <ul
            className="p-2 px-5 border-b"
            key={post.postId}
            onClick={() => navi(`/posts/${post.postId}`)}
          >
            <li className="font-bold">{post.title}</li>
            <ul className="flex justify-between">
              <li>{post.contents}</li>
              <li>{post.imageUrls.length > 0 ? "사진" : ""}</li>
              <li>{post.voteOption}</li>
              <li className="flex">
                <VeiwIcon /> {post.viewCount}
              </li>
              <li className="flex">
                <CommentIcon /> {post.commentCount}
              </li>
            </ul>
          </ul>
        ))}

      <MyComments />

      <MyFavorite />
    </div>
  );
};

export default My;
