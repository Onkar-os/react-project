import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

function Home({ searchQuery = "", isLoggedIn, isAdmin }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredData(
        data.filter((product) => product.pname.toLowerCase().includes(query))
      );
    }
  }, [searchQuery, data]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  function handleBuyNow(ev, product) {
    ev.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/checkout/${product._id}`, { state: { product } });
    }
  }

  async function handleAddToCart(ev, product) {
    ev.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/cart/add`, {
        productId: product._id,
      });
      if (res.status === 200) alert("Product added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  }

  // ADMIN DELETE
  async function handleDelete(ev, id) {
    ev.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setDeletingId(id);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert("Admin login required!");
        navigate("/admin/login");
        return;
      }

      await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product deleted!");
      setData(data.filter((product) => product._id !== id));
      setFilteredData(filteredData.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err.response || err);
      alert("❌ Failed to delete product!");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="container-fluid mt-4 px-2 min-vh-100">
      <h2 className="text-center fw-bold text-amazon">Featured Products</h2>
      <div className="row justify-content-center">
        {filteredData.length === 0 ? (
          <p className="text-center text-white">No products found.</p>
        ) : (
          filteredData.map((e) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 "
              key={e._id}
            >
              <div
                className="card amazon-card h-100 border-0"
                onClick={() =>
                  navigate(`/product/${e._id}`, { state: { product: e } })
                }
                style={{ cursor: "pointer" }}
              >
                <div className="image-container">
                  <div className="image-container">
  <img
  src={
    e.images?.[0] ||
    e.image ||
    "https://via.placeholder.com/250"
  }
  className="card-img-top"
  alt={e.pname}
/>

</div>

                </div>

                <div className="card-body text-start px-3">
                  <h6 className="fw-semibold product-name">{e.pname}</h6>
                  <p className="text-success fw-bold mb-1">₹{e.price}</p>

                  {/* USER BUTTONS */}
                  {!isAdmin && (
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <button
                        className="btn btn-amazon-primary w-50 fw-semibold text-dark shadow-sm btn-sm"
                        onClick={(ev) => handleBuyNow(ev, e)}
                        style={{
                          backgroundColor: "#FFD814",
                          borderColor: "#FFD814",
                          color: "#0F1111",
                        }}
                      >
                        Buy Now
                      </button>
                      <button
                        className="btn btn-amazon-outline w-50 fw-semibold btn-sm"
                        onClick={(ev) => handleAddToCart(ev, e)}
                        style={{
                          border: "1px solid #FF9900",
                          color: "#FF9900",
                          backgroundColor: "white",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  )}

                  {/* ADMIN BUTTONS */}
                  {isAdmin && (
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <button
                        className="btn btn-warning btn-sm w-50 fw-semibold"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          navigate(`/admin/edit-product/${e._id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm w-50 fw-semibold"
                        onClick={(ev) => handleDelete(ev, e._id)}
                        disabled={deletingId === e._id}
                      >
                        {deletingId === e._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
