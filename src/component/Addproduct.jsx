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

    description: "",
    images: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) return alert("Admin login required!");

const payload = {
  pname: formData.pname.trim(),
  price: Number(formData.price),
  category: formData.category.trim(),
  stock: formData.stock === "true",
  description: formData.description.trim(),
  images: formData.images
    .split(",")
    .map((img) => img.trim())
    .filter(Boolean),
};


    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/products", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("✅ Product added successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
        <input name="pname" onChange={handleChange} placeholder="Product Name" className="form-control mb-2" required />

        <input name="price" type="number" onChange={handleChange} placeholder="Price" className="form-control mb-2" required />

        <input name="category" onChange={handleChange} placeholder="Category" className="form-control mb-2" required />

        <select name="stock" onChange={handleChange} className="form-control mb-2" required>
          <option value="">-- Stock --</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>


        <textarea name="description" onChange={handleChange} placeholder="Description" className="form-control mb-2" required />

        <input
          name="images"
          onChange={handleChange}
          placeholder="Image URLs (comma separated)"
          className="form-control mb-2"
          required
        />

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default Addproduct;
