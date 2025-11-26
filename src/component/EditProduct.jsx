import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [formData, setFormData] = useState({
    pname: "",
    price: "",
    category: "",
    stock: "",
    orderDate: "",
    description: "",
    images: [],
  });

  // Check admin
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("⚠️ Admin login required!");
      navigate("/admin/login");
    }
    fetchProduct();
  }, [_id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/products/${_id}`);
      const product = res.data;

      setFormData({
        pname: product.pname,
        price: product.price,
        category: product.category,
        stock: product.stock.toString(),
        orderDate: product.orderDate?.split("T")[0] || "",
        description: product.description,
        images: product.images || [],
      });
    } catch (err) {
      alert("❌ Failed to fetch product!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "images") {
      setFormData({
        ...formData,
        images: value.split(",").map((img) => img.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      await axios.put(
        `http://localhost:3000/api/products/${_id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Product updated!");
      navigate("/admin/edit-product-list");
    } catch (err) {
      alert("❌ Failed to update product!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">

        <label>Product Name</label>
        <input type="text" name="pname" value={formData.pname}
          onChange={handleChange} className="form-control mb-2" required />

        <label>Price</label>
        <input type="number" name="price" value={formData.price}
          onChange={handleChange} className="form-control mb-2" required />

        <label>Category</label>
        <input type="text" name="category" value={formData.category}
          onChange={handleChange} className="form-control mb-2" required />

        <label>Stock</label>
        <select name="stock" value={formData.stock}
          onChange={handleChange} className="form-control mb-2">
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <label>Order Date</label>
        <input type="date" name="orderDate" value={formData.orderDate}
          onChange={handleChange} className="form-control mb-2" required />

        <label>Description</label>
        <textarea name="description" value={formData.description}
          onChange={handleChange} className="form-control mb-2"></textarea>

        <label>Images (comma separated)</label>
        <input type="text" name="images" value={formData.images.join(", ")}
          onChange={handleChange} className="form-control mb-2" />

        <button className="btn btn-primary w-100">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
