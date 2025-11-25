import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const product = state?.product; // --- Custom Theme Colors ---

  const primaryColor = "#FF9900"; // Amazon Orange
  const darkBg = "#0F1111"; // Deep Black/Dark Gray
  const textColor = "#EEEEEE"; // Light text color
  const cardBgColor = "#222222"; // Dark grey for details box

  const handleAddToCart = async () => {
    try {
      // Assuming you need a logged-in user check before adding to cart
      if (!localStorage.getItem("isLoggedIn")) {
        alert("Please log in to add items to your cart.");
        navigate("/login");
        return;
      }
      const res = await axios.post("http://localhost:3000/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      alert(`✅ ${product.pname} has been added to your cart!`); // Redirect to correct cart page

      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("❌ Failed to add product to cart! Ensure the server is running.");
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
               {" "}
        <h4 className="text-warning">
          Product not found! Data may have been loaded incorrectly.
        </h4>
               {" "}
        <button
          className="btn fw-semibold mt-3"
          style={{ backgroundColor: primaryColor, color: "black" }}
          onClick={() => navigate("/allproducts")}
        >
                    Back to Home        {" "}
        </button>
             {" "}
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
           {" "}
      <div className="row justify-content-center">
                        {/* Image Column */}       {" "}
        <div className="col-md-5 text-center mb-4 mb-md-0">
                   {" "}
          <div
            className="p-3 rounded shadow-lg"
            style={{ backgroundColor: cardBgColor }}
          >
                       {" "}
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.pname}
              className="img-fluid rounded"
              style={{
                maxHeight: "400px",
                objectFit: "contain",
                width: "100%",
              }}
            />
                     {" "}
          </div>
                 {" "}
        </div>
                {/* Details Column */}       {" "}
        <div className="col-md-5">
                   {" "}
          <div
            className="p-4 rounded shadow-lg"
            style={{ backgroundColor: cardBgColor }}
          >
                                    {/* Product Name */}           {" "}
            <h2 className="fw-bold mb-3" style={{ color: primaryColor }}>
              {product.pname}
            </h2>
                                    {/* Price */}           {" "}
            <h4 className="fw-bold mb-3" style={{ color: "#00A650" }}>
                            ₹{product.price.toLocaleString()}           {" "}
            </h4>
                                    {/* Description */}           {" "}
            <p className="mb-4" style={{ color: textColor }}>
                            {product.description}           {" "}
            </p>
                        <hr style={{ borderColor: "#444" }} />           {" "}
            {/* Action Buttons */}           {" "}
            <div className="mt-4 d-grid gap-3 d-md-flex">
                            {/* Add to Cart Button */}             {" "}
              <button
                className="btn fw-semibold text-dark"
                style={{
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                  padding: "10px 30px",
                }}
                onClick={handleAddToCart}
              >
                                🛒 Add to Cart              {" "}
              </button>
                            {/* Back to Home Button */}             {" "}
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
                                🏠 Back to Home              {" "}
              </button>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
}

export default ProductDetails;
