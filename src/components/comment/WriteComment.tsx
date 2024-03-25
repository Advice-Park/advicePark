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
    <div className="max-w-md w-full fixed bottom-0 h-20 p-6 flex justify-between bg-white">
      <input
        required
        autoFocus
        placeholder="최대 300자 훈수를 남겨보세요"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={300}
        className="max-w-xs w-full p-3 bg-gray-100 rounded"
      />
      <button onClick={() => addComment(postId)}>등록</button>
    </div>
  );
};

export default WriteComment;
