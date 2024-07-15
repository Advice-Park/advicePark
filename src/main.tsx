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
import PrivateRoute from "./components/route/PrivateRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/posts", element: <PostsPage /> },
      { path: "/posts/:postId", element: <DetailPost /> },
      { path: "/search", element: <Search /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "/post", element: <PostPage /> },
          { path: "/my", element: <My /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </RecoilRoot>
);
