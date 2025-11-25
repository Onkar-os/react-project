import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home({ searchQuery = "", isLoggedIn }) {
  const apiurl = "http://localhost:3000";
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
        data.filter((product) =>
          product.pname.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, data]);

  async function fetchProducts() {
    try {
      const res = await axios.get(apiurl);
      setData(res.data.allProducts);
      setFilteredData(res.data.allProducts);
    } catch (err) {
      console.error(err);
    }
  }

  function handleBuyNow(ev, product) {
    ev.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/checkout/${product._id}`, { state: { product } });
    }
  }

  function handleAddToCart(ev, product) {
    ev.stopPropagation();
    navigate(`/addtocart/${product._id}`, { state: { product } });
  }

  return (
    <div className="container-fluid mt-4 px-2 min-vh-100">
      <h2 className="text-center fw-bold text-amazon">Featured Products</h2>
      <div className="row justify-content-center">
        {filteredData.length === 0 ? (
          <p className="text-center text-white">No products found.</p>
        ) : (
          filteredData.map((e, index) => (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4" key={index}>
              <div
                className="card amazon-card h-100 border-0"
                onClick={() =>
                  navigate(`/product/${e._id}`, { state: { product: e } })
                }
                style={{ cursor: "pointer" }}
              >
                <div className="image-container">
                  <img
                    src={e.image || "https://via.placeholder.com/250"}
                    className="card-img-top"
                    alt={e.pname}
                  />
                </div>
                <div className="card-body text-start px-3">
                  <h6 className="fw-semibold product-name">{e.pname}</h6>
                  <p className="text-success fw-bold mb-1">₹{e.price}</p>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button
                      className="btn btn-amazon-primary w-50 fw-semibold text-dark shadow-sm btn-sm"
                      onClick={(ev) => handleBuyNow(ev, e)}
                      style={{
                        backgroundColor: "#FFD814",
                        borderColor: "#FFD814",
                        color: "#0F1111",
                        transition: "all 0.3s",
                      }}
                      onMouseOver={(el) =>
                        (el.currentTarget.style.backgroundColor = "#F7CA00")
                      }
                      onMouseOut={(el) =>
                        (el.currentTarget.style.backgroundColor = "#FFD814")
                      }
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
                        transition: "all 0.3s",
                      }}
                      onMouseOver={(el) => {
                        el.currentTarget.style.backgroundColor = "#FF9900";
                        el.currentTarget.style.color = "white";
                      }}
                      onMouseOut={(el) => {
                        el.currentTarget.style.backgroundColor = "white";
                        el.currentTarget.style.color = "#FF9900";
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
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
