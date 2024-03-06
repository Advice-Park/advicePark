// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import NotFound from "./pages/NotFound.tsx";
import Home from "./pages/Home/Home.tsx";
import PostPage from "./pages/Post/PostPage.tsx";
import PostsPage from "./pages/Posts/PostsPage.tsx";
import My from "./pages/MyPage/My.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/post", element: <PostPage /> },
      { path: "/posts", element: <PostsPage /> },
      { path: "/my", element: <My /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // 리액트 쿠키
  <CookiesProvider>
      {/* Recoil 상태관리 */}
      <RecoilRoot>
        {/* 리액트 router */}
        <RouterProvider router={router} />
      </RecoilRoot>
  </CookiesProvider>
);
