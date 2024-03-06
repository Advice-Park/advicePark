import { atom } from "recoil";

export interface IAuthTypes {
    isLoggedIn: boolean;
}

// 로그인 상태
export const authState = atom<IAuthTypes>({
    key: 'auth',
    default: {
        isLoggedIn: false,
    }
});