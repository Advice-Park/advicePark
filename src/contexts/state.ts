import { atom } from "recoil";

export interface IAuthTypes {
    isLoggedIn: boolean;
}

// recoil state
export const authState = atom<IAuthTypes>({
    key: 'auth',
    default: {
        isLoggedIn: false,
    }
});