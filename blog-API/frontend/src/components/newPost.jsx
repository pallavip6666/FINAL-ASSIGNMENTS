import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://blog-api-backend-zvw9.onrender.com/newPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            username: username,
          }),
        }
      );

      if (response.ok) {
        alert("Post successful!");
        navigate("/");
      } else {
        alert(`Something went wrong in fetch(newPost)`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong in fetch(newPost) here");
    }
  };

  return (
    <>
      <form
        action="/newPost"
        method="POST"
        onSubmit={handleSubmit}
        className="postForm"
      >
        <h1>New Post</h1>

        <fieldset>
          <label>
            Title:
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Description:
            <textarea
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              required
              cols={30}
              rows={7}
            />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default NewPost;