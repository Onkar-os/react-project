import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = state?.product;

  const primaryColor = "#FF9900"; 
  const darkBg = "#0F1111"; 
  const textColor = "#EEEEEE"; 
  const cardBgColor = "#222222"; 

  const [isImageOpen, setIsImageOpen] = useState(false);
function handleBuyNow(ev, product) {
  ev.stopPropagation();
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // check login from localStorage
  if (!isLoggedIn) {
    navigate("/login");
  } else {
    navigate(`/checkout/${product._id}`, { state: { product } });
  }
}

  const handleAddToCart = async () => {
    try {
      if (!localStorage.getItem("isLoggedIn")) {
        alert("Please log in to add items to your cart.");
        navigate("/login");
        return;
      }
      await axios.post("http://localhost:3000/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      alert(`✅ ${product.pname} has been added to your cart!`);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("❌ Failed to add product to cart!");
    }
  };

  if (!product) {
    return (
      <div
        className="container text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: darkBg,
          paddingTop: "80px",
          color: textColor,
        }}
      >
        <h4 className="text-warning">Product not found!</h4>
        <button
          className="btn fw-semibold mt-3"
          style={{ backgroundColor: primaryColor, color: "black" }}
          onClick={() => navigate("/allproducts")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: darkBg,
        minHeight: "100vh",
        color: textColor,
        paddingTop: "80px",
      }}
    >
      <div className="row justify-content-center">
        {/* Image Column */}
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <div
            className="p-3 rounded shadow-lg"
            style={{ backgroundColor: cardBgColor }}
          >
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.pname}
              className="img-fluid rounded"
              style={{
                maxHeight: "400px",
                objectFit: "contain",
                width: "100%",
                cursor: "pointer",
              }}
              onClick={() => setIsImageOpen(true)}
            />
          </div>
        </div>

        {/* Details Column */}
        <div className="col-md-5">
          <div
            className="p-4 rounded shadow-lg"
            style={{ backgroundColor: cardBgColor }}
          >
            <h2 className="fw-bold mb-3" style={{ color: primaryColor }}>
              {product.pname}
            </h2>
            <h4 className="fw-bold mb-3" style={{ color: "#00A650" }}>
              ₹{product.price.toLocaleString()}
            </h4>
            <p className="mb-4" style={{ color: textColor }}>
              {product.description}
            </p>
            <hr style={{ borderColor: "#444" }} />
            <div className="mt-4 d-grid gap-3 d-md-flex">
              <button
                className="btn fw-semibold text-dark"
                style={{
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                  padding: "10px 30px",
                }}
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>
              <button
                className="btn fw-semibold"
                style={{
                  border: `1px solid ${primaryColor}`,
                  color: primaryColor,
                  backgroundColor: "transparent",
                  padding: "10px 30px",
                }}
                onClick={() => navigate("/allproducts")}
              >
                🏠 Back to Home
              </button>
             <button
  className="btn btn-amazon-primary w-50 fw-semibold text-dark shadow-sm btn-sm"
  style={{
    backgroundColor: "#FFD814",
    borderColor: "#FFD814",
    color: "#0F1111",
    transition: "all 0.3s",
  }}
  onClick={(ev) => handleBuyNow(ev, product)}
  onMouseOver={(el) => (el.currentTarget.style.backgroundColor = "#F7CA00")}
  onMouseOut={(el) => (el.currentTarget.style.backgroundColor = "#FFD814")}
>
  Buy Now
</button>

            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isImageOpen && (
        <div
          onClick={() => setIsImageOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.pname}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
