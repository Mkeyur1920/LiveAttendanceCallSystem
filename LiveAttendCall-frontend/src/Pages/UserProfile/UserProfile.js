import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import axios from "axios"; // Or your preferred method for API calls
import authService from "../../Services/authService";

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: null, // Store as File object or URL
    // ... other user details
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null); // For new uploads
  const [password, setPassword] = useState(""); // New state for password
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [passwordMatchError, setPasswordMatchError] = useState(false); // State for password match error

  useEffect(() => {
    // Fetch user data from your API
    const fetchUserData = async () => {
      try {
        const response = authService.getCurrentUser();

        // const response = await axios.get("/api/users/me"); // Replace with your API endpoint
        setUser(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., display an error message)
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const getProfilePictureUrl = () => {
    if (newProfilePicture) {
      return URL.createObjectURL(newProfilePicture); // New upload preview
    }

    if (user.profilePicture) {
      if (user.profilePicture.startsWith("http")) {
        // Check if it's already a URL
        return user.profilePicture;
      } else {
        return `/api/users/profile-picture/${user.profilePicture}`; // Construct full URL using API path
      }
    }

    return "placeholder.jpg"; // Placeholder
  };

  const handleProfilePictureChange = (e) => {
    setNewProfilePicture(e.target.files[0]); // Store the selected file
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);

    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    // ... append other user details

    if (newProfilePicture) {
      formData.append("profilePicture", newProfilePicture);
    }
    if (password) {
      // Only include password if it's been changed
      formData.append("password", password);
    }

    try {
      const response = await axios.put("/api/users/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      setUser(response.data); // Update the user state with the returned data.
      setNewProfilePicture(null); // Clear the new profile picture.
      setIsEditing(false);
      setPassword(""); // Reset password fields
      setConfirmPassword("");
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h1>Hey, {user.firstName}</h1>
      <Row>
        <Col md={4} className="text-center">
          {
            <Image
              src={getProfilePictureUrl()}
              alt="Profile Picture"
              roundedCircle
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          }

          {isEditing && (
            <Form.Group controlId="profilePicture">
              <Form.Label>Change Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleProfilePictureChange} />
            </Form.Group>
          )}
        </Col>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                minLength={6} // Example minimum length
                isInvalid={passwordMatchError} // Show error if passwords don't match
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                isInvalid={passwordMatchError}
              />
              <Form.Control.Feedback type="invalid">
                Passwords do not match.
              </Form.Control.Feedback>{" "}
              {/* Error message */}
            </Form.Group>

            <div className="mt-3">
              {isEditing ? (
                <>
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>{" "}
                  <Button variant="secondary" onClick={handleEditToggle}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={handleEditToggle}>
                  Edit Profile
                </Button>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
