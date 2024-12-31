import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/posts.css";

function Comments() {
  const location = useLocation();
  const { postId, postUploadedAt, postName, postTitle, postDescription } =
    location.state || {}; // Safely extract postId from state

  // Get comments from the db
  const [comments, setComments] = useState([]);

  async function displayComments() {
    try {
      const response = await fetch(
        `https://blog-api-backend-zvw9.onrender.com/comments?postId=${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // send postId
        }
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  }

  // When component mounts, display posts & comments.
  useEffect(() => {
    displayComments();
  }, []);

  return (
    <div className="commentDiv">
      <div className="commentPost">
        <h2>{postTitle}</h2>
        <div className="temporaryImg">{postDescription}</div>
        <h4>
          By {postName}, {postUploadedAt}
        </h4>
      </div>

      <div className="comments">
        <h2>Comments:</h2>
        {comments.map((comment, index) => (
          <div className="comment" key={index}>
            <h3>{comment.name || "Anonymous"}:</h3>
            <h4 className="temporaryImg">{comment.description}</h4>
          </div>
        ))}
      </div>

      <button type="button">
        <a href="/">Back to home</a>
      </button>
    </div>
  );
}

export default Comments;