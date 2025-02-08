import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Install: npm install jwt-decode

// const users = [
//   {
//     id: 1,
//     username: "admin",
//     email: "admin@example.com",
//     password: "admin123",
//     role: "admin",
//   },
//   {
//     id: 2,
//     username: "teacher1",
//     email: "teacher@example.com",
//     password: "teacher123",
//     role: "teacher",
//   },
//   {
//     id: 3,
//     username: "student1",
//     email: "student@example.com",
//     password: "student123",
//     role: "student",
//   },
// ];

// const API_URL = "/api/auth";
const API_BASE_URL = "http://localhost:8080";

const authService = {
  login: async (credentials) => {
    const response = await axios.post(
      `${API_BASE_URL}` + "/api/auth/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = response.headers.get("Authorization");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response;
  },

  register: async (formData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      formData
    );
    return response;
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.clear();
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
  getRoleFromToken: (token) => {
    try {
      const decodedToken = jwtDecode(token);
      // Check if the role claim exists and return it.
      // The name of the role claim might vary depending on your backend setup.
      // It's commonly 'role', 'roles', 'authorities', or something similar.
      // Check your backend's JWT generation logic to confirm the claim name.

      if (decodedToken.role) {
        // Example: If the role is in a 'role' claim
        return decodedToken.role;
      } else if (decodedToken.roles) {
        // Example: If roles are in a 'roles' claim (array)
        return decodedToken.roles; // Or handle the array as needed
      } else if (decodedToken.authorities) {
        // Example: If roles are in a 'authorities' claim (array)
        return decodedToken.authorities; // Or handle the array as needed
      } else {
        console.warn(
          "No 'role' or 'roles' or 'authorities' claim found in the token."
        );
        return null; // Or return a default role
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },

  getRole: () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Use jwt-decode
        return decoded.role; // Assuming your JWT has a 'role' field
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  },
};

export default authService;
