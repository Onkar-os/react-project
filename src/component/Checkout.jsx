import React from "react";
import { useLocation } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const product = location.state?.product;

  return (
    <div className="container mt-4 text-white">
      <h2>Checkout Page</h2>
      {product ? (
        <div>
          <h4>{product.pname}</h4>
          <p>Price: ₹{product.price}</p>
          <p>Proceed with payment here...</p>
        </div>
      ) : (
        <p>No product selected.</p>
      )}
    </div>
  );
}

export default Checkout;
