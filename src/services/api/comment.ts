import { instance } from "../instance";

export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  likeCount: number;
  createdTime: string;
}

export const addComment = async (postId: number, comment: string) => {
  try {
    await instance.post(`/api/comment/${postId}`, {
      content: comment,
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
