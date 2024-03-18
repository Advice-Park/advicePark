import { atom } from "recoil";

export interface IAuthTypes {
    isLoggedIn?: boolean;
    userId?: number;
}

// 로그인 상태
export const authState = atom<IAuthTypes>({
    key: 'auth',
    default: {
        isLoggedIn: false,
        userId: 0
    }
});