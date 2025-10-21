import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.password) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/Login/register", formData);
      setMessage("✅ Registration Successful!");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after registration
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Registration failed. Try again.");
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Registration</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Username:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter username"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Register</button>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
}

// Basic inline styles
const styles = {
  container: {
    width: "400px",
    margin: "100px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    textAlign: "left",
    margin: "10px 0 5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    fontWeight: "bold",
  },
  linkText: {
    marginTop: "15px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Register;
