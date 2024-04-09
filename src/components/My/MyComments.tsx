import React, { useEffect, useState } from "react";
import { Comment, getMyComments } from "../../services/api/comment";
import { useNavigate } from "react-router-dom";

const MyComments: React.FC = () => {
  const navi = useNavigate();

  const [myComments, setMyComments] = useState<Comment[]>([]);

  useEffect(() => {
    getMyComments().then((res) => {
      res ? setMyComments(res) : console.log("내가 쓴 훈수댓글이 없습니다");
    });
  }, []);

  return (
    <div className="w-full my-5">
      <h3>내가 쓴 훈수댓글</h3>
      <div className="w-full">
        {myComments.map((comment) => (
          <ul
            className="p-2 px-5 border-b"
            key={comment.commentId}
            onClick={() => navi(`/posts/${comment.postId}`)}
          >
            <li className="whitespace-nowrap text-ellipsis overflow-hidden">{comment.content}</li>
            <li>{comment.likeCount}</li>
            <li>{comment.createdTime}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MyComments;
