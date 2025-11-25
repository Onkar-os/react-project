import React, { useEffect, useState } from "react";
import axios from "axios";

function Addtocart() {
  const [cartItems, setCartItems] = useState([]);
  const apiUrl = "http://localhost:3000/cart";

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;

    try {
      await axios.put(`http://localhost:3000/cart/update/${id}`, { quantity: qty });
      fetchCart();
    } catch (error) {
      console.error("Quantity update failed:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cart/delete/${id}`);
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">🛒 Your Cart ({cartItems.length})</h3>

      {cartItems.length === 0 ? (
        <h5 className="text-center text-muted">Your cart is empty</h5>
      ) : (
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.product?.image || "https://via.placeholder.com/70"}
                    width="70"
                    alt={item.product?.pname || "Product"}
                  />
                </td>
                <td>{item.product?.pname}</td>
                <td>₹{item.product?.price}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >+</button>
                </td>
                <td>₹{(item.product?.price || 0) * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cartItems.length > 0 && (
        <h3 className="text-end">Grand Total: ₹{totalPrice}</h3>
      )}
    </div>
  );
}

export default Addtocart;
