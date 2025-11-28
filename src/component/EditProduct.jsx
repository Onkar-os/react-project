import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // match route param :id

  const [formData, setFormData] = useState({
    pname: "",
    price: "",
    category: "",
    stock: true,
    orderDate: "",
    description: "",
    images: [],
  });
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("⚠️ Admin login required!");
      navigate("/admin/login");
    } else {
      fetchProduct();
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const product = res.data;
      setFormData({
        pname: product.pname,
        price: product.price,
        category: product.category,
        stock: product.stock ?? true,
        orderDate: product.orderDate?.split("T")[0] || "",
        description: product.description,
        images: product.images || [],
      });
    } catch (err) {
      console.error("Error fetching product:", err.response || err);
      alert("❌ Failed to fetch product!");
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: value.split(",").map((img) => img.trim()) });
    } else if (name === "stock") {
      setFormData({ ...formData, stock: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    setUpdating(true);
    try {
      await axios.put(`${API_URL}/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Product updated successfully!");
      navigate("/admin/edit-product-list");
    } catch (err) {
      console.error("Error updating product:", err.response || err);
      alert("❌ Failed to update product!");
    } finally {
      setUpdating(false);
    }
  };

  if (loadingProduct) return <p>Loading product...</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
        <label>Product Name</label>
        <input type="text" name="pname" value={formData.pname} onChange={handleChange} className="form-control mb-2" required />

        <label>Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control mb-2" required />

        <label>Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="form-control mb-2" required />

        <label>Stock</label>
        <select name="stock" value={formData.stock.toString()} onChange={handleChange} className="form-control mb-2">
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <label>Order Date</label>
        <input type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} className="form-control mb-2" required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="form-control mb-2" />

        <label>Images (comma separated)</label>
        <input type="text" name="images" value={formData.images.join(", ")} onChange={handleChange} className="form-control mb-2" />

        <button className="btn btn-primary w-100" type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
