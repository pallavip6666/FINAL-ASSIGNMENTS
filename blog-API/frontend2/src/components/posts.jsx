import { useState, useEffect } from "react";
import "../styles/posts.css";

function Posts() {
  const username = localStorage.getItem("username");

  const [loading, setLoading] = useState(false); // Loading state

  // Get posts from the db for the specific user
  const [posts, setPosts] = useState("");

  async function displayPosts() {
    try {
      setLoading(true); // Show loading screen
      const response = await fetch(
        `https://blog-api-backend-zvw9.onrender.com/userPosts?username=${username}`,
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

  // Delete post functionality
  const handleDelete = async (e) => {
    e.preventDefault();

    const postId = e.target.value;

    try {
      const response = await fetch(
        `https://blog-api-backend-zvw9.onrender.com/deletePost?postId=${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Delete successful!");
        displayPosts();
      } else {
        alert(`Something went wrong in fetch(deletePost)`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong in fetch(deletePost) here");
    }
  };

  // Edit published post functionality...
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
        "https://blog-api-backend-zvw9.onrender.com/editPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Post edited successfully!");
        setFormData((prev) => ({
          ...prev,
          [postId]: { name: "", comment: "" },
        }));
        setShowForm((prev) => ({ ...prev, [postId]: false })); // Hide form after submission
        displayPosts();
      } else {
        console.error("Failed to edit post");
      }
    } catch (error) {
      console.error("Error submitting edited post", error);
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
        <>
          <h1>Your Published Posts:</h1>
          {posts.map((post, index) => (
            <div className="post" key={index}>
              <h2>{post.title}</h2>
              <div className="temporaryImg">{post.description}</div>
              <h4>
                By {post.name}, {post.uploadedAt}
              </h4>
              <div className="buttons">
                {/* Edit form functionality (could make it a separate component) */}
                <button type="button" onClick={() => toggleForm(post.id)}>
                  Edit
                </button>
                {showForm[post.id] && (
                  <form
                    className="postCommentForm"
                    onSubmit={(e) => handleSubmit(e, post.id)}
                  >
                    <fieldset>
                      <label>
                        Title:
                        <input
                          id={`title-${post.id}`}
                          name="title"
                          type="text"
                          onChange={(e) => handleChange(post.id, e)}
                          value={formData[post.id]?.title || ""}
                        />
                      </label>
                    </fieldset>
                    <fieldset>
                      <label>
                        Description:
                        <textarea
                          id={`description-${post.id}`}
                          name="description"
                          type="text"
                          onChange={(e) => handleChange(post.id, e)}
                          value={formData[post.id]?.description || ""}
                          required
                          cols={30}
                          rows={7}
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
                    <button type="submit">Republish</button>
                    <button type="button" onClick={() => toggleForm(post.id)}>
                      Cancel
                    </button>
                  </form>
                )}

                {/* Inputs containing current values replace position & Republish button */}
                <button type="button" onClick={handleDelete} value={post.id}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
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