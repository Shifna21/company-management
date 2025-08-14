import React, { useState, useEffect } from "react";
import { loginUser } from "../api/Api";
import { useNavigate, Link } from "react-router-dom";
import "../style.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async () => {
    const result = await loginUser(email, password);

    if
      (result.status === 201) {
      setMessage(result.data.message);
      alert(result.data.message)
      navigate("/home");
    }
    else if
      (result.status === 404 || result.status === 401) {
      navigate("/register");
    }
    else {
      setMessage(result.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <div style={{ position: "relative" }}>
          <input
            type="email"
            placeholder={email ? "" : "Enter email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ position: "relative" }}>
          <input
            type={showPass ? "text" : "password"}
            placeholder={password ? "" : "Enter password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="auth-toggle"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "👁" : "👁"}
          </span>
        </div>

        <button onClick={handleLogin}>Login</button>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <Link to="/register">No account? Register</Link>
      </div>
    </div>
  );
}
