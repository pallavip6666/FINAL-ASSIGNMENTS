import ErrorPage from "./ErrorPage";
import Login from "./login";
import SignIn from "./signIn";
import NewPost from "./newPost";
import App from "./App";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signIn", element: <SignIn /> },
      { path: "newPost", element: <NewPost /> },
    ],
  },
];

export default routes;