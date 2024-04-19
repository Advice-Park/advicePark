import React, { useEffect, useState } from "react";
import { Comment, getMyComments } from "../../services/api/comment";
import { useNavigate } from "react-router-dom";
import ThumIcon from "../../assets/icons/thumbsUp.svg?react";
import FormattingTime from "../format/FormattingTime";

const MyComments: React.FC = () => {
  const navi = useNavigate();

  const [myComments, setMyComments] = useState<Comment[]>([]);

  useEffect(() => {
    getMyComments().then((res) => {
      if (res) {
        setMyComments(res.filter((comment) => comment.commentType === "USER"));
      } else {
        console.log("내가 쓴 훈수댓글이 없습니다");
      }
    });
  }, []);

  return (
    <div className="w-full my-5">
      <h3 className="h3-primary">내가 쓴 훈수댓글({myComments.length})</h3>
      <div className="w-full">
        {myComments.map((comment) => (
          <ul
            className="p-2 px-5 border-b cursor-pointer"
            key={comment.commentId}
            onClick={() => navi(`/posts/${comment.postId}`)}
          >
            <li className="whitespace-nowrap text-ellipsis overflow-hidden">
              {comment.content}
            </li>
            <ul className="flex justify-between">
              <li className="flex gap-1">
                <ThumIcon />
                {comment.likeCount}
              </li>
              <li>
                <FormattingTime createdTime={comment.createdTime} />{" "}
              </li>
            </ul>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MyComments;
