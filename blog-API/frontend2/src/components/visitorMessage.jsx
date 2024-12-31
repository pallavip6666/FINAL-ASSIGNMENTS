import { Link } from "react-router-dom";
import Login from "./login";
import Posts from "./posts";
import UnpublishedPosts from "./unpublishedPosts";
import "../styles/posts.css";

function VisitorMessage() {
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  function isLoggedIn() {
    if (!token) {
      return <Login />;
    } else {
      return (
        <>
          <div className="visitorMessage">
            <h2>Welcome Back {username}</h2>
            <Link to="/newPost">Make New Post?</Link>
          </div>
          <Posts />
          <UnpublishedPosts />
        </>
      );
    }
  }

  return isLoggedIn();
}

export default VisitorMessage;