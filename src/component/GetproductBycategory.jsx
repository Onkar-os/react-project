import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function GetproductBycategory({ isLoggedIn }) {
  const [formData, setformData] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const apiurl = "http://localhost:3000";

  const fetchproducts = useCallback(async () => {
    try {
      const res = await axios.get(`${apiurl}/getcategory/${category}`);
      setformData(res.data.p);
    } catch (error) {
      console.error("Error fetching products:", error);
      setformData([]);
    }
  }, [category, apiurl]);

  useEffect(() => {
    fetchproducts();
  }, [fetchproducts]);

  // Updated Buy Now logic
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
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#0F1111",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <h2
        className="text-center mb-5 fw-bold text-uppercase"
        style={{ color: "#FF9900", fontSize: "2.5rem" }}
      >
        {category} Products
      </h2>

      {formData.length === 0 ? (
        <div className="text-center fs-5" style={{ color: "#ccc" }}>
          No products found.
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {formData.map((e, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"
              onClick={() =>
                navigate(`/product/${e._id}`, { state: { product: e } })
              }
              style={{ cursor: "pointer" }}
              key={index}
            >
              <div
                className="card shadow-lg border-0 w-100 rounded-4 overflow-hidden"
                style={{
                  backgroundColor: "#ffffff",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  transform: "translateY(0)",
                }}
                onMouseOver={(el) => {
                  el.currentTarget.style.boxShadow =
                    "0 6px 12px 0 rgba(0, 0, 0, 0.3)";
                  el.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseOut={(el) => {
                  el.currentTarget.style.boxShadow =
                    "0 2px 4px 0 rgba(0, 0, 0, 0.15)";
                  el.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="image-container"
                  style={{
                    height: "250px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    padding: "15px",
                  }}
                >
                  <img
                    src={e.image || "https://via.placeholder.com/250"}
                    alt={e.pname}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseOver={(el) =>
                      (el.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(el) =>
                      (el.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
                <div
                  className="card-body d-flex flex-column"
                  style={{ padding: "0.75rem 1.5rem" }}
                >
                  <h5
                    className="card-title text-center fw-semibold text-dark"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {e.pname}
                  </h5>
                  <p
                    className="card-text text-muted small text-center"
                    style={{ flexGrow: 1, color: "#555" }}
                  >
                    {e.description.length > 60
                      ? e.description.substring(0, 60) + "..."
                      : e.description}
                  </p>
                  <div className="mt-auto text-center pt-3">
                    <h6 className="fw-bold mb-3" style={{ color: "#00A650" }}>
                      ₹{e.price.toLocaleString()}
                    </h6>

                    <div className="d-flex justify-content-center gap-2">
                      {/* Buy Now */}
                      <button
                        className="btn fw-semibold btn-sm w-50"
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

                      {/* Add to Cart */}
                      <button
                        className="btn fw-semibold btn-sm w-50"
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
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetproductBycategory;
