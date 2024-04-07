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

type CommentProps = {
  postId: number;
};

const CommentList = ({ postId }: CommentProps) => {
  const auth = useRecoilValue(authState);

  const [comments, setComments] = useState<Comment[]>([]);
  const [likeComment, setLikeComment] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [likeCount, setLikeCount] = useState<{ [key: number]: number }>({[0]:0});

  useEffect(() => {
    getComments(postId).then((res) => {
      res ? setComments(res) : console.log("댓글이 없습니다");
    });

    const getLikes = async () => {
      const myLikedComments: { [key: number]: boolean } = {};
      const commentLikeCount: { [key: number]: number } = {};
      if (Array.isArray(comments)) {
        for (const comment of comments) {
          const res = await getLiked(comment.commentId);
          myLikedComments[comment.commentId] = res;

          const count = await getComments(postId);
          commentLikeCount[comment.commentId] = count.likeCount;
        }
        setLikeComment(myLikedComments);
        setLikeCount(commentLikeCount);
      }
    };
    getLikes();
  }, []);

  const likeCommentHandler =
    (commentId: number): MouseEventHandler<HTMLParagraphElement> =>
    (_event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
      if (auth.isLoggedIn) {
        if (!likeComment) {
          postLikeComment(commentId);
          setLikeComment({ [commentId]: true });
          setLikeCount((prev) => ({ ...prev, [commentId]: (prev?.[commentId] ?? 0) + 1 }));
        } else {
          delLikeComment(commentId);
          setLikeComment({ [commentId]: false });
          setLikeCount((prev) => ({ ...prev, [commentId]: (prev?.[commentId] ?? 0) - 1 }));
        }
      } else {
        alert("로그인 후 이용해주세요!");
      }
    };

  const deleteComment = async (postId: number, commentId: number) => {
    try {
      await instance.delete(`/api/comment/${postId}/${commentId}`);
      setComments(
        comments.filter((comment) => comment.commentId !== commentId)
      );
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

              {/* 댓글 좋아요 부분 */}
              <div className="flex gap-1">
                <p onClick={likeCommentHandler(post.commentId)}>
                  {likeComment[post.commentId] ? "❤️" : <LikeIcon />}
                </p>
                {likeCount?.[post.commentId]}
              </div>
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
