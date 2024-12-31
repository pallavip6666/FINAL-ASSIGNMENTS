import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/posts.css";

function Posts() {
  const [loading, setLoading] = useState(false); // Loading state

  // Get posts from the db
  const [posts, setPosts] = useState("");

  async function displayPosts() {
    try {
      setLoading(true); // Show loading screen
      const response = await fetch(
        "https://blog-api-backend-zvw9.onrender.com/posts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  }

  // When component mounts, display posts & comments.
  useEffect(() => {
    displayPosts();
  }, []);

  // New comment functionality...
  const [showForm, setShowForm] = useState({});
  const [formData, setFormData] = useState({});

  const handleChange = (postId, e) => {
    setFormData((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e, postId) => {
    e.preventDefault();

    const currentFormData = formData[postId];
    if (!currentFormData) return;

    try {
      const response = await fetch(
        "https://blog-api-backend-zvw9.onrender.com/newComment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Comment submitted successfully!");
        setFormData((prev) => ({
          ...prev,
          [postId]: { name: "", comment: "" },
        }));
        setShowForm((prev) => ({ ...prev, [postId]: false })); // Hide form after submission
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  const toggleForm = (postId) => {
    setShowForm((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="postDivs">
      {loading ? (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      ) : posts.length > 0 ? (
        posts.map((post, index) => (
          <div className="post" key={index}>
            <h2>{post.title}</h2>
            <div className="temporaryImg">{post.description}</div>
            <h4>
              By {post.name}, {post.uploadedAt}
            </h4>
            <Link
              to="/comments"
              state={{
                postId: post.id,
                postUploadedAt: post.uploadedAt,
                postName: post.name,
                postTitle: post.title,
                postDescription: post.description,
              }}
              className="viewCommentsLink"
            >
              View Comments
            </Link>
            {/* Comment form functionality (could make it a separate component) */}
            <button type="button" onClick={() => toggleForm(post.id)}>
              Comment?
            </button>
            {showForm[post.id] && (
              <form
                className="postCommentForm"
                onSubmit={(e) => handleSubmit(e, post.id)}
              >
                <fieldset>
                  <label>
                    Name:
                    <input
                      id={`name-${post.id}`}
                      name="name"
                      type="text"
                      onChange={(e) => handleChange(post.id, e)}
                      value={formData[post.id]?.name || ""}
                    />
                  </label>
                </fieldset>
                <fieldset>
                  <label>
                    Comment:
                    <input
                      id={`comment-${post.id}`}
                      name="comment"
                      type="text"
                      onChange={(e) => handleChange(post.id, e)}
                      value={formData[post.id]?.comment || ""}
                      required
                    />
                  </label>
                </fieldset>
                <input
                  id="postId"
                  name="postId"
                  type="hidden"
                  value={post.id}
                  onChange={handleChange}
                />
                <button type="submit">Submit Comment</button>
              </form>
            )}
          </div>
        ))
      ) : (
        <>
          <div className="post">
            <h4>No Posts?</h4>
          </div>
        </>
      )}
    </div>
  );
}

export default Posts;