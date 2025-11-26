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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    const payload = {
      ...formData,
      images: formData.images.split(",").map((img) => img.trim()),
    };

    try {
      await axios.post("http://localhost:3000/api/products", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Product added!");
      navigate("/admin/dashboard");
    } catch (err) {
      alert("❌ Error adding product!");
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

        <button className="btn btn-primary w-100">Add Product</button>
      </form>
    </div>
  );
}

export default Addproduct;
