import axios from "axios";
import { getCookie } from "../components/cookie/reactCookie";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  // timeout: 1000,
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
    Cookie: `token=${getCookie("token")}`,
  },
});

// instance.interceptors.request.use(
//   function (config) {
//       config.headers.Authorization = `Bearer${cookies.token}`;
//       return config;
//   },
//   function (error) {
//       console.log("인터셉터 에러가 있습니다.");
//       return Promise.reject(error);
//   }
// );
