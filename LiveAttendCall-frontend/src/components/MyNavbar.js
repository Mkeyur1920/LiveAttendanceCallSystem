import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Services/authService";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaChartLine,
  FaUsers,
  FaBook,
  FaPlus,
  FaHome,
  FaUserTie,
} from "react-icons/fa"; // Import icons

const MyNavbar = () => {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaHome className="me-2" /> LiveAttendanceApp{" "}
          {/* Icon next to brand */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="mr-auto">
            {isAuthenticated && userRole === "ADMIN" && (
              <Nav.Link as={Link} to="/admin-dashboard">
                <FaChartLine className="me-2" /> Dashboard
              </Nav.Link>
            )}
            {isAuthenticated && userRole === "TEACHER" && (
              <Nav.Link as={Link} to="/teacher-dashboard">
                <FaChartLine className="me-2" /> Dashboard
              </Nav.Link>
            )}
            {isAuthenticated &&
              (userRole === "TEACHER" || userRole === "ADMIN") && (
                <Nav.Link as={Link} to="/classes">
                  <FaBook className="me-2" /> Classes
                </Nav.Link>
              )}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/students">
                  <FaUsers className="me-2" /> Students
                </Nav.Link>
                <Nav.Link as={Link} to="/attendance">
                  <FaPlus className="me-2" /> Attendance
                </Nav.Link>
                <Nav.Link as={Link} to="/reports/summary">
                  <FaChartLine className="me-2" /> Reports
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {isAuthenticated ? (
              <NavDropdown
                title={
                  <>
                    {userRole === "ADMIN" ? (
                      <>
                        <FaUserTie className="me-1" /> Admin
                      </>
                    ) : userRole === "TEACHER" ? (
                      <>
                        <FaUserTie className="me-1" /> Teacher
                      </>
                    ) : userRole === "STUDENT" ? (
                      <>
                        <FaUserCircle className="me-1" /> Student
                      </>
                    ) : (
                      <>
                        <FaUserCircle className="me-1" /> User
                      </>
                    )}
                  </>
                }
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  <FaUserCircle className="me-2" /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                <FaUserCircle className="me-2" /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
