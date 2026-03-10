import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Registration.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosclient from "../../utils/axiosclient";

export default function Login() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  // update input fields
  function updateField(fieldname, value) {
    setCredentials((prev) => ({
      ...prev,
      [fieldname]: value
    }));
  }

  // login request
  async function submitLogin(e) {
    e.preventDefault();

    try {

      const response = await axiosclient.post("/login", credentials);

      const token = response.data.token;
      const username = response.data.name;

      // store token for authentication
      localStorage.setItem("token", token);

      alert("Login successful");

      // navigate and pass username
      navigate("/loginsuccess", {
        state: { username }
      });

    } catch (error) {

      if (error.response && error.response.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Login failed. Please try again.");
      }

    }
  }

  return (
    <div className="login-container">

      <Form onSubmit={submitLogin} className="login-form">

        <h3 className="text-center mb-4">Login</h3>

        {/* Email */}
        <Form.Group className="mb-3">

          <Form.Label>Email address</Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
          />

        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">

          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => updateField("password", e.target.value)}
            required
          />

        </Form.Group>

        {/* Login Button */}
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>

        {/* Forgot Password */}
        <p className="mt-3 text-center">
          Forgot Password? <Link to="/forgot-password">Click here</Link>
        </p>

        {/* Signup */}
        <p className="mt-3 text-center">
          New User? <Link to="/">Signup</Link>
        </p>

      </Form>

    </div>
  );
}