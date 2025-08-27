import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }
    setError("");
    // Handle login logic here
    alert("Logged in!");
  };

  return (
    <div className="bg-light d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="text-center mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="User Avatar"
                      className="rounded-circle mb-3"
                      width="80"
                      height="80"
                    />
                    <h2 className="fw-bold">Login</h2>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        type="text"
                        className={`form-control ${
                          touched && !username ? "is-invalid" : ""
                        }`}
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          touched && !password ? "is-invalid" : ""
                        }`}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <i
                          className={`bi ${
                            showPassword ? "bi-eye-slash" : "bi-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mb-3">
                    <a
                      href="#"
                      className="text-decoration-none text-primary small"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {error && (
                    <div className="alert alert-danger py-2 mb-3">{error}</div>
                  )}

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Log In
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <span className="text-muted small">
                      Don't have an account?{" "}
                    </span>
                    <a
                      href="#"
                      className="text-decoration-none text-primary small"
                    >
                      Sign up
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;