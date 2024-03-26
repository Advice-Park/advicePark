import { useEffect, useState } from "react";
import { Comment, getComments } from "../../services/api/comment";
import { instance } from "../../services/instance";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";

type CommentProps = {
  postId: number;
};

const CommentList = ({ postId }: CommentProps) => {
  const auth = useRecoilValue(authState);

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getComments(postId).then((res) => {
      res ? setComments(res) : console.log("댓글이 없습니다");
    });
  }, []);

  const deleteComment = async (postId: number, commentId: number) => {
    try {
      await instance.delete(`/api/comment/${postId}/${commentId}`);
    } catch (err) {
      alert("훈수 삭제 에러");
    }
  };

  return (
    <div className="pb-24">
      {comments.map((post) => (
        <>
          <ul className="p-5" key={post.postId}>
            <li>댓쓴이: {post.userId}</li>
            <li>{post.content}</li>
            <li>{post.likeCount}</li>
            <li>{post.createdTime}</li>
            {/* <li><FormattingTime createdTime={post.createdTime} /></li> */}
          </ul>
          {auth.userId === post.userId && (
            <button onClick={() => deleteComment(postId, post.commentId)}>
              삭제
            </button>
          )}
        </>
      ))}
    </div>
  );
};

export default CommentList;
