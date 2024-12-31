import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/postForm.css";

// All the sending data to backend is done here
function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://blog-api-backend-zvw9.onrender.com/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            fullname: formData.firstName + " " + formData.lastName,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        alert("Signup successful!");
        navigate("/");
      } else {
        alert(`Signup failed`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up.");
    }
  };

  return (
    <>
      <form
        action="/signIn"
        method="POST"
        onSubmit={handleSubmit}
        className="postForm"
      >
        <h1>Sign In</h1>

        <fieldset>
          <label>
            Username:
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            First Name:
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Last Name:
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Confirm Password:
            <input
              id="password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignIn;