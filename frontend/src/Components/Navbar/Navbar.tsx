import React, { useState, useEffect } from "react";
import logoImg from "../../assets/Navbar/online-learning.png";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";

import { Link } from "react-router-dom";

const AppNavbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Load theme + auth state
  useEffect(() => {
    // Dark mode
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") setDarkMode(true);

    // Auth check
    const storedUsername = localStorage.getItem("username");
    const storedId = localStorage.getItem("id");
    const storedToken = localStorage.getItem("token");

    if (storedUsername && storedId && storedToken) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername(null);
    }
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-white");
    } else {
      document.body.classList.remove("bg-dark", "text-white");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <Navbar
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
      expand="lg"
      className="shadow-sm"
    >
      <Container>
        {/* Logo + Company Name */}
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img
            src={logoImg}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="fw-bold">EduLanka</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/services">Services</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>

          {/* Dark Mode Toggle */}
          <Form.Check
            type="switch"
            id="dark-mode-switch"
            label={darkMode ? "Dark" : "Light"}
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="ms-lg-3"
          />

          {/* Auth Buttons */}
          <div className="ms-lg-3 d-flex gap-2">
            {!isLoggedIn ? (
              <>
                <Button variant={darkMode ? "outline-light" : "outline-primary"} size="sm">
                  Login
                </Button>
                <Button variant={darkMode ? "light" : "primary"} size="sm">
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <span className="me-2">Hello, {username}</span>
                <Button variant="danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
