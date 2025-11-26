import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;

  const primaryColor = "#FF9900";
  const darkBg = "#0F1111";
  const cardBg = "#1A1A1A";
  const textColor = "#EEEEEE";

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [orderSuccess, setOrderSuccess] = useState(false);

  const handlePlaceOrder = () => {
    if (!address.fullname || !address.phone || !address.address || !address.pincode) {
      alert("Please fill in all the address details!");
      return;
    }
    setOrderSuccess(true);
  };

  if (!product) {
    return (
      <div className="container mt-4 text-white">
        <h3>No product selected.</h3>
      </div>
    );
  }

  // ------------------ ORDER SUCCESS SCREEN ------------------
  if (orderSuccess) {
    return (
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: darkBg,
          color: textColor,
        }}
      >
        <div
          className="p-5 rounded shadow text-center"
          style={{ backgroundColor: cardBg, width: "400px" }}
        >
          <h2 className="fw-bold text-success">✔ Order Successful!</h2>
          <p className="mt-3">Thank you for shopping with us.</p>

          <button
            className="btn fw-bold mt-4"
            style={{
              backgroundColor: primaryColor,
              color: "black",
              padding: "10px 30px",
              fontSize: "1rem",
            }}
            onClick={() => navigate("/allproducts")}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ------------------ CHECKOUT UI ------------------
  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: darkBg, minHeight: "100vh", color: textColor }}
    >
      <h2 className="fw-bold text-center mb-4" style={{ color: primaryColor }}>
        Checkout
      </h2>

      <div className="row justify-content-center">
        {/* Left Column - Delivery & Payment */}
        <div className="col-md-6 mb-4">
          {/* Delivery Details */}
          <div className="p-4 rounded mb-4 shadow" style={{ backgroundColor: cardBg }}>
            <h4 className="fw-bold mb-3" style={{ color: primaryColor }}>
              Delivery Details
            </h4>

            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control mb-3"
              value={address.fullname}
              onChange={(e) => setAddress({ ...address, fullname: e.target.value })}
            />

            <label className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control mb-3"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            />

            <label className="form-label">Full Address</label>
            <textarea
              className="form-control mb-3"
              rows="3"
              value={address.address}
              onChange={(e) => setAddress({ ...address, address: e.target.value })}
            ></textarea>

            <label className="form-label">Pincode</label>
            <input
              type="number"
              className="form-control mb-3"
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            />
          </div>

          {/* Payment Method */}
          <div className="p-4 rounded shadow" style={{ backgroundColor: cardBg }}>
            <h4 className="fw-bold mb-3" style={{ color: primaryColor }}>
              Payment Method
            </h4>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Cash on Delivery</label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Credit / Debit Card</label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-3">
                <input className="form-control mb-2" placeholder="Card Number" />
                <div className="row">
                  <div className="col">
                    <input className="form-control mb-2" placeholder="Expiry (MM/YY)" />
                  </div>
                  <div className="col">
                    <input className="form-control mb-2" placeholder="CVV" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="col-md-4">
          <div className="p-4 rounded shadow" style={{ backgroundColor: cardBg }}>
            <h4 className="fw-bold mb-3" style={{ color: primaryColor }}>
              Order Summary
            </h4>

            <div className="d-flex mb-3">
              <img
                src={product.image}
                alt={product.pname}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />
              <div className="ms-3">
                <h5 className="fw-semibold">{product.pname}</h5>
                <p className="text-success fw-bold">₹{product.price}</p>
              </div>
            </div>

            <hr style={{ borderColor: "#555" }} />

            <p className="d-flex justify-content-between">
              <span>Product Price:</span>
              <span>₹{product.price}</span>
            </p>

            <p className="d-flex justify-content-between">
              <span>Delivery Charge:</span>
              <span className="text-success">FREE</span>
            </p>

            <h5 className="d-flex justify-content-between fw-bold mt-3">
              <span>Total Amount:</span>
              <span style={{ color: primaryColor }}>₹{product.price}</span>
            </h5>

            <button
              className="btn w-100 mt-3 fw-bold"
              style={{
                backgroundColor: primaryColor,
                color: "black",
                padding: "10px",
                fontSize: "1.1rem",
              }}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
