import React, { useEffect, useState } from "react";
import axios from "axios";
import "./External.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const apiurl = "http://localhost:3000";
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(apiurl);
      console.log(res.data.allProducts);
      setData(res.data.allProducts);
    } catch (err) {
      console.error(err);
    }
  }

  async function Handledelete(obj) {
    try {
      await axios.delete(`${apiurl}/${obj._id}`);
      alert("Record deleted successfully");
      setData(data.filter((e) => e._id !== obj._id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 fw-bold text-amazon">Featured Products</h2>
      <div className="row justify-content-center">
        {data.map((e, index) => (
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4" key={index}>
            <div
              className="card amazon-card h-100 border-0"
              onClick={() => navigate(`/product/${e._id}`, { state: { product: e } })}
              style={{ cursor: "pointer" }}
            >
              <div className="image-container">
                <img
                  src={e.image || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={e.pname}
                />
              </div>

              <div className="card-body text-start px-3">
                <h6 className="fw-semibold product-name">{e.pname}</h6>
                <p className="text-success fw-bold mb-1">₹{e.price}</p>
                <p className="text-muted small">{e.description}</p>
                 <div className="d-flex justify-content-center gap-2 mt-2">
              <button
                className="btn btn-warning w-50 fw-semibold text-dark shadow-sm"
                onClick={() => navigate(`/login`)}
              >
                Buy Now
              </button>

              <button
                className="btn btn-outline-dark w-50 fw-semibold"
                onClick={() =>
                  navigate(`/addtocart/${e._id}`, { state: { product: e } })
                }
              >
                Add to Cart
              </button>
            </div>
              </div>
            </div>

            {/* Separate action buttons below card */}
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
