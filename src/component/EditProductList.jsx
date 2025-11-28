import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

function EditProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.response || error);
      alert("❌ Failed to delete product!");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.pname}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                  >
                    {deletingId === product._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EditProductList;
