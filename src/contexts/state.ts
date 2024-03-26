import { atom } from "recoil";

export interface IAuthTypes {
    isLoggedIn?: boolean;
    userId: number;
    name: string;
    image?: string;
}

// 로그인 상태
export const authState = atom<IAuthTypes>({
    key: 'auth',
    default: {
        isLoggedIn: false,
        userId: 0,
        name: '비회원',
        image: ''
    }
});