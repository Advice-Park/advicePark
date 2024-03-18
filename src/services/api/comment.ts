import { instance } from "../instance";

export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  likeCount: number;
  createdTime: string;
}

export const getComments = async (postId : number) => {
  try {
    const res = await instance.get(`/api/comment/${postId}`);
    const comments = res.data.result;
    return comments;
  } catch (err) {
    console.log("comments 불러오기 에러 :", err);
  }
};
