import { MouseEventHandler, useEffect, useState } from "react";
import {
  Comment,
  delLikeComment,
  getComments,
  getLiked,
  postLikeComment,
} from "../../services/api/comment";
import { instance } from "../../services/instance";
import { useRecoilValue } from "recoil";
import { authState } from "../../contexts/state";
import ideaIcon from "/iconImgs/idea-icon.png";
import LikeIcon from "../../assets/icons/like.svg?react";
import WriteComment from "./WriteComment";

type CommentProps = {
  postId: number;
};

const CommentList = ({ postId }: CommentProps) => {
  const auth = useRecoilValue(authState);

  const [comments, setComments] = useState<Comment[]>([]);
  const [likeComment, setLikeComment] = useState<{ [key: number]: boolean }>({});
  const [likeCount, setLikeCount] = useState<{ [key: number]: number }>({});

  const getCommentData = async () => {
    const commentsData = await getComments(postId);
    if (commentsData) {
      setComments(commentsData);

      // 댓글의 좋아요 기록 및 좋아요 수
      const myLikedComments: { [key: number]: boolean } = {};
      const commentLikeCount: { [key: number]: number } = {};
      for (const comment of commentsData) {
        const liked = await getLiked(comment.commentId);
        myLikedComments[comment.commentId] = liked;
        commentLikeCount[comment.commentId] = comment.likeCount;
      }
      setLikeComment(myLikedComments);
      setLikeCount(commentLikeCount);
    }
  };
  
  useEffect(() => {
    getCommentData();
  }, []);

  const likeCommentHandler = (commentId: number): MouseEventHandler<HTMLParagraphElement> => async (_event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    if (auth.isLoggedIn) {
      try {
        if (!likeComment[commentId]) {
          await postLikeComment(commentId);
          setLikeComment({ ...likeComment, [commentId]: true });
          setLikeCount({ ...likeCount, [commentId]: (likeCount[commentId] || 0) + 1 });
        } else {
          await delLikeComment(commentId);
          setLikeComment({ ...likeComment, [commentId]: false });
          setLikeCount({ ...likeCount, [commentId]: (likeCount[commentId] || 0) - 1 });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("로그인 후 이용해주세요!");
    }
  };

  const deleteComment = async (postId: number, commentId: number) => {
    try {
      await instance.delete(`/api/comment/${postId}/${commentId}`);
      setComments(comments.filter((comment) => comment.commentId !== commentId));
    } catch (err) {
      alert("훈수 삭제 에러");
    }
  };

  return (
    <div className="pb-24">
      {comments.map((post) => (
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

            {/* 좋아요 부분 */}
            <div className="flex gap-1">
              <p onClick={likeCommentHandler(post.commentId)}>
                {likeComment[post.commentId] ? "❤️" : <LikeIcon />}
              </p>
              {likeCount[post.commentId]}
            </div>
          </div>
          {auth.userId === post.userId && (
            <button
              className="ml-10 text-xs mt-2"
              onClick={() => deleteComment(postId, post.commentId)}
            >
              삭제
            </button>
          )}
        </div>
      ))}
        <WriteComment postId={postId} getCommentData={getCommentData} />
    </div>
  );
};

export default CommentList;
