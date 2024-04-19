import { instance } from "../instance";

export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  likeCount: number;
  createdTime: string;
  commentType?: "AI" | "USER";
}

export const addComment = async (
  postId: number,
  comment: string,
  type: "AI" | "USER"
) => {
  try {
    await instance.post(`/api/comment/${postId}`, {
      content: comment,
      commentType: type,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getComments = async (postId: number) => {
  try {
    const res = await instance.get(`/api/comment/${postId}`);
    const comments = res.data.result;
    return comments;
  } catch (err) {
    console.log("comments 불러오기 에러 :", err);
  }
};

export const getMyComments = async () => {
  try {
    const res = await instance.get("/api/mypage/comment");
    const myComments: Comment[] = res.data.result;
    return myComments;
  } catch (err) {}
};

export const getChatGpt = async (prompt: string) => {
  try {
    const res = await instance.get("/api/chatgpt", {
      params: { prompt },
    });
    return res.data as string;
  } catch {}
};

export const postLikeComment = async (commentId: number) => {
  try {
    await instance.post(`/api/comment/${commentId}/like`);
  } catch (err) {
    console.log(`댓글 좋아요 실패: err`);
  }
};

export const delLikeComment = async (commentId: number) => {
  try {
    await instance.delete(`/api/comment/${commentId}/like`);
  } catch (err) {
    console.log(`댓글 좋아요 취소 실패: err`);
  }
};

export const getLiked = async (commentId: number) => {
  try {
    const res = await instance.get(`/api/comment/${commentId}/like`);
    return res.data.result;
  } catch (err) {
    console.log(err);
  }
};
