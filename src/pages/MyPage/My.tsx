import React, { useEffect, useState } from "react";
import { Posts, getMyPosts } from "../../services/api/posts";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";
import VeiwIcon from "../../assets/icons/eye.svg?react";
import CommentIcon from "../../assets/icons/comment.svg?react";

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
      <h3 className="text-xl font-bold">My 페이지</h3>
      <div>
        <img src={auth.image} className="w-20 h-20 rounded-full" />
        {auth.name}
      </div>
      <div>
        {myPosts.map((post) => (
          <ul
            className="p-5"
            key={post.postId}
            onClick={() => navi(`/posts/${post.postId}`)}
          >
            <li className="font-bold">{post.title}</li>
            <li>{post.contents}</li>
            <li>{post.imageUrls.length > 0 ? "사진" : ""}</li>
            <li>{post.voteOption}</li>
            <li className="flex"><VeiwIcon /> {post.viewCount}</li>
            <li className="flex"><CommentIcon /> {post.commentCount}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default My;
