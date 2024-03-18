import { instance } from "../instance";

export interface Posts {
  postId: number;
  userId: number;
  title: string;
  contents: string;
  category: "DAILY" | "LOVE" | "EXERCISE" | "FOOD" | "ETC";
  viewCount: number;
  commentCount: number;
  createdTime: string;
  imageUrls: string[];
  voteOption: "YES_NO" | "NORMAL";
}

export const getPosts = async () => {
  try {
    const res = await instance.get("/api/post");
    const posts: Posts[] = res.data.result;
    return posts;
  } catch (err) {
    console.log("posts 불러오기 에러 :", err);
  }
};

export const getMyPosts = async () => {
  try {
    const res = await instance.get("/api/mypage/post");
    const myPosts: Posts[] = res.data.result;
    return myPosts;
  } catch (err) {
    console.log("myPosts 불러오기 에러 :", err);
  }
};
