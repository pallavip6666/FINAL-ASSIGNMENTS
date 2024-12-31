import ErrorPage from "./ErrorPage";
import Login from "./login";
import SignIn from "./signIn";
import App from "./App";
import NewPost from "./newPost";
import Comments from "./comments";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signIn", element: <SignIn /> },
      { path: "newPost", element: <NewPost /> },
      { path: "comments", element: <Comments /> },
    ],
  },
];

export default routes;