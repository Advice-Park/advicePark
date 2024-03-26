import { useEffect, useState } from "react";
import { Comment, getComments } from "../../services/api/comment";
import { instance } from "../../services/instance";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";
import ideaIcon from "/iconImgs/idea-icon.png";

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
          <div className="pb-1 p-8" key={post.postId}>
            <div className="flex gap-3 pb-2">
              <img className="w-8 h-8" src={ideaIcon} />
              <div>
                <p className="font-bold leading-5">{post.userId}</p>
                <p className="text-xs">{post.createdTime}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="max-w-64 ml-10 px-2 py-1 text-sm bg-white rounded-lg">
                {post.content}
              </div>
              <div>{post.likeCount}</div>
            </div>
            {/* <li><FormattingTime createdTime={post.createdTime} /></li> */}
            {auth.userId === post.userId && (
              <button
                className="ml-10 text-xs mt-2"
                onClick={() => deleteComment(postId, post.commentId)}
              >
                삭제
              </button>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default CommentList;
