import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addproduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pname: "",
    price: "",
    category: "",
    stock: "",
    orderDate: "",
    description: "",
    images: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // quick checks
    const token = localStorage.getItem("adminToken");
    if (!token) {
      return alert("No admin token found. Please login as admin.");
    }

    // prepare payload with proper types
    const payload = {
      pname: formData.pname.trim(),
      price: Number(formData.price), // convert to number
      category: formData.category.trim(),
      stock: formData.stock === "true", // convert to boolean
      orderDate: formData.orderDate || null,
      // include `date` too because some backends expect `date`
      date: formData.orderDate || null,
      description: formData.description.trim(),
      images: formData.images
        ? formData.images.split(",").map((img) => img.trim())
        : [],
    };

    console.log("Prepared payload:", payload);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/products", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Server response:", res.data);
      alert("✅ Product added!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Add product error:", err);

      // helpful alerts/logs so you know exactly what failed
      if (err.response) {
        // server returned a response (likely 4xx or 5xx)
        console.error("Response data:", err.response.data);
        console.error("Status:", err.response.status);
        alert(`❌ Server error: ${err.response.data.message || JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        // request made but no response
        console.error("No response received:", err.request);
        alert("❌ No response from server. Is the backend running and CORS set up?");
      } else {
        // something else
        alert(`❌ Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">

        <input type="text" name="pname" onChange={handleChange}
          placeholder="Product Name" className="form-control mb-2" required />

        <input type="number" name="price" onChange={handleChange}
          placeholder="Price" className="form-control mb-2" required />

        <input type="text" name="category" onChange={handleChange}
          placeholder="Category" className="form-control mb-2" required />

        <select name="stock" onChange={handleChange} className="form-control mb-2" required>
          <option value="">-- Select Stock --</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <input type="date" name="orderDate" onChange={handleChange}
          className="form-control mb-2" required />

        <textarea name="description" onChange={handleChange}
          placeholder="Description" className="form-control mb-2" required />

        <input type="text" name="images" onChange={handleChange}
          placeholder="Image1, Image2 ..." className="form-control mb-2" required />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default Addproduct;
