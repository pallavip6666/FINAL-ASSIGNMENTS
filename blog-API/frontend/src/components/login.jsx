import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/postForm.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://blog-api-backend-zvw9.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      // If successfully logged in, store desired variables in localStorage
      if (response.ok) {
        const data = await response.json();
        if (data.accessToken) {
          // Store the token in localStorage or sessionStorage
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("username", formData.username);
          alert("Login successful!");
          navigate("/");
        } else {
          alert(`Login failed`);
        }
      } else {
        // Handle HTTP errors (e.g., 401 Unauthorized)
        alert(`Login failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up.");
    }
  };

  return (
    <form
      action="/login"
      method="POST"
      className="postForm"
      onSubmit={handleSubmit}
    >
      <h1>Login</h1>

      <fieldset>
        <label>
          Username:
          <input
            id="username"
            name="username"
            type="text"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </label>
      </fieldset>
      <fieldset>
        <label>
          Password:
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;