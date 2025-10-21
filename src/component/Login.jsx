import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    password: ""
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(""); 
    setIsError(false);

    try {
    
     const res = await axios.post("http://localhost:3000/api/Login/login", formData);

      
      
      setMessage(res.data.message);
      console.log("Login successful:", res.data);

      
      setTimeout(() => {
          navigate('/allproducts');
      }, 1500); 

    } catch (error) {
      setIsError(true);
      if (error.response) {
    
        setMessage(error.response.data.message);
      } else {
        setMessage("Server error, please try again.");
      }
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">EzBuy Login</h3>

        {message && (
          <div className={`alert ${isError ? 'alert-danger' : 'alert-success'} text-center py-2`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
