import { useState } from "react";
import { instance } from "../../services/instance";

type CommentProps = {
  postId: number;
};

const WriteComment = ({ postId }: CommentProps) => {
  const [comment, setComment] = useState<string>("");

  const addComment = async (postId: number) => {
    try {
      await instance.post(`/api/comment/${postId}`, {
        content: comment,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input type="text" onChange={(e) => setComment(e.target.value)} />
      <button onClick={() => addComment(postId)}>등록</button>
    </div>
  );
};

export default WriteComment;
