import React, { useEffect, useState } from "react";
import { Posts, getMyPosts } from "../../services/api/posts";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";

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
    <div>
      <div>My 페이지</div>
      <div><img src={auth.image} className="w-20 h-20 rounded-full" />{auth.name}</div>
      <div>
        {myPosts.map((post) => (
          <ul
            className="p-5"
            key={post.postId}
            onClick={() => navi(`/posts/${post.postId}`)}
          >
            <li>제목: {post.title}</li>
            <li>{post.contents}</li>
            <li>{post.category}</li>
            <li>{post.imageUrls}</li>
            <li>{post.voteOption}</li>
            <li>뷰: {post.viewCount}</li>
            <li>댓글: {post.commentCount}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default My;
