// import React from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import NotFound from "./pages/NotFound.tsx";
import Home from "./pages/Home/Home.tsx";
import PostPage from "./pages/Post/PostPage.tsx";
import PostsPage from "./pages/Posts/PostsPage.tsx";
import My from "./pages/MyPage/My.tsx";
import DetailPost from "./pages/Detail/DetailPost.tsx";
import Search from "./pages/Search/Search.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/post", element: <PostPage /> },
      { path: "/posts", element: <PostsPage /> },
      { path: "/posts/:postId", element: <DetailPost /> },
      { path: "/search", element: <Search /> },
      { path: "/my", element: <My /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  //  Recoil 상태관리
  <RecoilRoot>
    {/* 리액트 쿠키  */}
    <CookiesProvider>
      {/* 리액트 router */}
      <RouterProvider router={router} />
    </CookiesProvider>
  </RecoilRoot>
);
