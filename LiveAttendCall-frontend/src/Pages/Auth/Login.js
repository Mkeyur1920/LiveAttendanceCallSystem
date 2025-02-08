import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../Services/authService"; // Assuming this is your auth service
import Registration from "./Registration"; // Import your registration component

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError(""); // Clear any previous errors

    try {
      const user = await authService.login(credentials);
      const role = authService.getRoleFromToken(localStorage.getItem("token"));
      if (user !== null) {
        //Check if the user object and role exists
        localStorage.setItem("role", role); // Store the role
        if (role === "ADMIN") navigate("/admin-dashboard");
        else if (role === "TEACHER") navigate("/teacher-dashboard");
        else if (role === "STUDENT") navigate("/student-dashboard");
        else {
          console.error("Invalid role received from backend:", user.userRole);
          setError("An error occurred during login. Please try again.");
        }
      } else {
        console.error("Invalid user data received from backend:", user);
        setError("An error occurred during login. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err); // Log the actual error for debugging
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display error message from the backend if available
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Invalid username or password"); // Generic error message
      }
    } finally {
      setLoading(false); // Set loading to false, regardless of success or failure
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"} {/* Show loading indicator */}
          </button>
          <div className="mt-2 text-center">
            {" "}
            {/* Center the link */}
            New User ? <Link to="/registration">Registration</Link>{" "}
            {/* Corrected Link to */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
