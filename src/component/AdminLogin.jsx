import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/admin/login", {
        email,
        password,
      });

      // Save Token
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);

        alert(res.data.message || "Admin Login Successful!");

        navigate("/admin/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Admin Credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px", color: "white" }}>
      <h2 className="text-center mb-4">Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100" type="submit">
          Admin Login
        </button>

        <button
          className="btn btn-secondary w-100 mt-3"
          onClick={() => navigate("/login")}
          type="button"
        >
          Back to User Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
