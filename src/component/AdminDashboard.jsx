import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Admin Dashboard</h2>

      <div className="my-4 d-flex justify-content-center gap-3">
        <Link to="/admin/add-product" className="btn btn-success">Add Product</Link>
        <Link to="/admin/edit-product-list" className="btn btn-warning">Edit / Delete Products</Link>
      </div>

      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
