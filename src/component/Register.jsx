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
    const [isError, setIsError] = useState(false); // State to track success/error status

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        setIsError(false);

        if (!formData.name || !formData.password) {
            setMessage("⚠️ Please fill all fields");
            setIsError(true);
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/Login/register", formData);
            
            // Assuming successful registration returns a message
            setMessage("✅ Registration Successful! Redirecting to login...");
            setIsError(false); // Success
            
            setTimeout(() => {
                navigate("/login"); // Redirect to login page after registration
            }, 1500);
            
        } catch (error) {
            console.error("Registration Error:", error);
            setIsError(true); // Error
            
            if (error.response && error.response.data && error.response.data.message) {
                 // Use specific error message from the server if available
                setMessage(`❌ Registration failed: ${error.response.data.message}`);
            } else {
                setMessage("❌ Registration failed. Server error or user already exists.");
            }
        }
    }

    // --- Custom Styles for Dark UI (matching Login component) ---
    const primaryColor = '#FF9900'; // Amazon Orange for accents
    const cardBgColor = '#222222'; // Dark grey for the card
    const inputBgColor = '#333333'; // Slightly lighter dark grey for inputs
    const textColor = '#EEEEEE'; // Light text color

    return (
        // Component Container: Full screen black background
        <div 
            className="container-fluid d-flex justify-content-center align-items-center" 
            style={{ 
                minHeight: "100vh", 
                backgroundColor: '#0F1111' // Deep Black/Dark Gray background
            }}
        >
            {/* Register Card */}
            <div 
                className="card shadow-lg p-4" 
                style={{ 
                    width: "400px", 
                    borderRadius: "15px", 
                    backgroundColor: cardBgColor,
                    border: `1px solid ${inputBgColor}`
                }}
            >
                {/* Title */}
                <h3 
                    className="text-center mb-4 fw-bold" 
                    style={{ color: primaryColor }}
                >
                    Create EzBuy Account
                </h3>

                {/* Message Alert */}
                {message && (
                    <div 
                        className={`alert text-center py-2`} 
                        style={{ 
                            backgroundColor: isError ? '#D9534F' : primaryColor, // Red for error, Orange for success
                            color: isError ? 'white' : 'black',
                            borderColor: isError ? '#D9534F' : primaryColor,
                            fontWeight: 'bold'
                        }}
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
                            style={{ 
                                backgroundColor: inputBgColor, 
                                color: textColor, 
                                border: '1px solid #555' 
                            }}
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
                            style={{ 
                                backgroundColor: inputBgColor, 
                                color: textColor, 
                                border: '1px solid #555' 
                            }}
                        />
                    </div>

                    {/* Register Button */}
                    <button 
                        type="submit" 
                        className="btn w-100 fw-semibold mt-3"
                        style={{ 
                            backgroundColor: primaryColor, 
                            borderColor: primaryColor,
                            color: 'black', 
                            fontSize: '1.1rem',
                            padding: '10px 0'
                        }}
                    >
                        Register
                    </button>

                    {/* Login Link */}
                    <p className="text-center fw-semibold mt-3 mb-0" style={{ color: textColor }}>
                        Already have an account?{" "}
                        <Link 
                            to="/login" 
                            style={{ 
                                color: primaryColor, 
                                textDecoration: 'none', 
                                fontWeight: 'bold' 
                            }}
                        >
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Register;