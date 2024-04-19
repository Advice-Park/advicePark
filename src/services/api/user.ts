import { instance } from "../instance";

export interface UserInfo {
    userId: number;
    name: string;
    image: string;
}

export const getUserInfo = async () => {
    try {
        const res = await instance.get("/api/auth/currentUserInfo");
        const userInfo: UserInfo = res.data.result;
        return userInfo;
    } catch (err) {
        console.log("userInfo 불러오기 에러 :", err);
    }
}

export const getUserInfoWithId = async (userId: number) => {
    try {
        const res = await instance.get(`/api/auth/${userId}`);
        const userInfo = res.data.result;
        console.log("userInfoWithId", userInfo);
        return userInfo;
    } catch (err) {
        console.log("userInfoWithId 불러오기 에러 :", err);
    }
}