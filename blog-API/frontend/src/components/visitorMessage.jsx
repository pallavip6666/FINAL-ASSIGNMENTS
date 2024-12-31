import "../styles/posts.css";

function VisitorMessage() {
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  function isLoggedIn() {
    if (!token) {
      return <h2>Sign In To Create Posts!</h2>;
    } else {
      return <h2>Welcome Back {username}</h2>;
    }
  }

  return <div className="visitorMessage">{isLoggedIn()}</div>;
}

export default VisitorMessage;