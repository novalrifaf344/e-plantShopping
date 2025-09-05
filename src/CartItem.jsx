import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./ProductList.css";

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  // price helpers
  const unitPrice = (item) => {
    const c = item?.cost;
    if (typeof c === "number") return c;
    if (typeof c === "string") {
      const n = parseFloat(c.replace(/[^0-9.]+/g, ""));
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };
  const itemTotal = (item) => unitPrice(item) * (item.quantity || 0);
  const cartTotal = items.reduce((sum, it) => sum + itemTotal(it), 0);

  // actions
  const handleContinueShopping = (e) => { onContinueShopping && onContinueShopping(e); };
  const handleCheckoutShopping = () => { alert("Functionality to be added for future reference"); };

  const handleIncrement = (name) => {
    const it = items.find((x) => x.name === name);
    if (!it) return;
    dispatch(updateQuantity({ name, amount: (it.quantity || 0) + 1 }));
  };
  const handleDecrement = (name) => {
    const it = items.find((x) => x.name === name);
    if (!it) return;
    if ((it.quantity || 0) > 1) {
      dispatch(updateQuantity({ name, amount: it.quantity - 1 }));
    } else {
      dispatch(removeItem(name)); // drop to 0 => remove
    }
  };
  const handleRemove = (name) => dispatch(removeItem(name));

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Total Cart Amount: ${cartTotal.toFixed(2)}</h2>

      {items.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        items.map((it) => (
          <div
            key={it.name}
            className="product-card"
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "20px",
              alignItems: "center",
              maxWidth: 900,
              margin: "0 auto 20px auto",
            }}
          >
            <img
              src={it.image}
              alt={it.name}
              className="product-image"
              style={{ width: 220, height: 160, objectFit: "cover" }}
            />
            <div>
              <h2 style={{ marginTop: 0 }}>{it.name}</h2>
              <div style={{ marginBottom: 8 }}>${unitPrice(it).toFixed(2)}</div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <button className="product-button" onClick={() => handleDecrement(it.name)}>-</button>
                <span>{it.quantity}</span>
                <button className="product-button" onClick={() => handleIncrement(it.name)}>+</button>
              </div>

              <div style={{ marginBottom: 10 }}>
                <strong>Total: ${itemTotal(it).toFixed(2)}</strong>
              </div>

              <button className="product-button" onClick={() => handleRemove(it.name)}>Delete</button>
            </div>
          </div>
        ))
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 10 }}>
        <button className="product-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="product-button" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
