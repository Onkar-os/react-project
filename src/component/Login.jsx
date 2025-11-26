import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
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

            setMessage(res.data.message || "Login successful!");
            console.log("Login successful:", res.data);

            localStorage.setItem("isLoggedIn", "true");

            if (setIsLoggedIn) setIsLoggedIn(true);

            setTimeout(() => navigate('/allproducts'), 1000);

        } catch (error) {
            setIsError(true);
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Server error, please try again.");
            }
        }
    }

    function register() {
        navigate("/register");
    }

    function loginAsAdmin() {
        navigate("/admin/login"); // Redirect to admin login page
    }

    // --- Custom Styles for Dark UI ---
    const primaryColor = '#FF9900'; 
    const cardBgColor = '#222222'; 
    const inputBgColor = '#333333'; 
    const textColor = '#EEEEEE'; 

    return (
        <div 
            className="container-fluid d-flex justify-content-center align-items-center" 
            style={{ minHeight: "100vh", backgroundColor: '#0F1111' }}
        >
            <div 
                className="card shadow-lg p-4" 
                style={{ width: "400px", borderRadius: "15px", backgroundColor: cardBgColor, border: `1px solid ${inputBgColor}` }}
            >
                <h3 className="text-center mb-4 fw-bold" style={{ color: primaryColor }}>EzBuy Login</h3>

                {message && (
                    <div className={`alert ${isError ? 'alert-danger' : 'alert-success'} text-center py-2`} 
                        style={{ backgroundColor: isError ? '#D9534F' : primaryColor, color: isError ? 'white' : 'black', borderColor: isError ? '#D9534F' : primaryColor, fontWeight: 'bold' }}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: textColor }}>Username</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter username"
                            required
                            style={{ backgroundColor: inputBgColor, color: textColor, border: '1px solid #555' }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: textColor }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter password"
                            required
                            style={{ backgroundColor: inputBgColor, color: textColor, border: '1px solid #555' }}
                        />
                    </div>

                    <button type="submit" className="btn w-100 fw-semibold mt-3" style={{ backgroundColor: primaryColor, borderColor: primaryColor, color: 'black', fontSize: '1.1rem', padding: '10px 0' }}>
                        Login
                    </button>

                    <button type="button" className="btn w-100 fw-semibold mt-2" onClick={register} style={{ backgroundColor: cardBgColor, border: `1px solid ${primaryColor}`, color: primaryColor, fontSize: '1.1rem', padding: '10px 0' }}>
                        New User? Register
                    </button>

   

                </form>
            </div>
        </div>
    );
}

export default Login;
