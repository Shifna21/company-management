import React, { useState, useEffect } from "react";
import { registerUser } from "../api/Api";
import { useNavigate, Link } from "react-router-dom";
import "../style.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  // const handleRegister = async () => {
  //   const result = await registerUser(email, password);

  //   if
  //     (result.status === 201) {
  //     setMessage(result.data.message);
  //     navigate("/login");
  //   }
  //   else {
  //     setMessage(result.data.message);
  //   }
  // };

  const handleRegister = async () => {
  setMessage("");

  if (!email || !password) {
    setMessage("Provide a valid data");
    return;
  }

  if (password.length < 8) {
    setMessage("Password must be at least 8 characters long.");
    return;
  }

  try {
    const data = await registerUser(email, password);

    if (data.error === "Email already in use") {
      setMessage("Email already in use");
      return;
    }

    if (data.error) {
      setMessage(data.error);
      return;
    }

    setMessage(data.message || "Registered successfully");
    setEmail("");
    setPassword("");
    navigate("/login");
  }
   catch (error)
   {
    setMessage("Register error: " + (error.message || "Unknown error"));
  }
};


  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <input
          type="email"
          placeholder={email ? "" : "Enter email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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

        <button onClick={handleRegister}>Register</button>

        {message && <p style={{ color: "red" }}>{message}</p>}
        
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}
