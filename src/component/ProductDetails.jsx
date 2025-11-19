import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const product = state?.product;

  const handleAddToCart = async () => {
    try {
      const res = await axios.post("http://localhost:3000/cart/add", {
        productId: product._id,   // ✅ FIXED
        quantity: 1,
      });

      alert(`${product.pname} has been added to your cart!`);

      // Redirect to correct cart page
      navigate("/cart");   // ✅ FIXED
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart!");
    }
  };

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h4>Product not found!</h4>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/allproducts")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.pname}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold text-dark">{product.pname}</h2>
          <h4 className="text-success mb-3">₹{product.price}</h4>
          <p className="text-muted">{product.description}</p>

          <div className="mt-4 d-flex gap-3">
            <button
              className="btn btn-warning fw-semibold text-dark"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-outline-dark fw-semibold"
              onClick={() => navigate("/allproducts")}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
