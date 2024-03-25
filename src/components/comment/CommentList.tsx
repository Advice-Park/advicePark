import { useEffect, useState } from "react";
import { Comment, getComments } from "../../services/api/comment";

type CommentProps = {
  postId: number;
};

const CommentList = ({ postId } : CommentProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getComments(postId).then((res) => {
      res ? setComments(res) : console.log("댓글이 없습니다");
    });
  }, []);

  return (
    <div className="mb-448">
        {comments.map((post) => (
          <ul
            className="p-5"
            key={post.postId}
          >
            <li>댓쓴이: {post.userId}</li>
            <li>{post.content}</li>
            <li>{post.likeCount}</li>
            <li>{post.createdTime}</li>
            {/* <li><FormattingTime createdTime={post.createdTime} /></li> */}
          </ul>
        ))}
    </div>
  );
};

export default CommentList;
