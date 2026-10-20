import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Tag, Check, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";

export const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    amountNeededForFreeShipping,
    freeShippingThreshold
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponCode)) {
      setCouponCode("");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "500px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.04)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--accent-orange)" }}>
            <ShoppingBag size={36} />
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "12px" }}>
            Your Bag is Empty
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: "32px", lineHeight: 1.6 }}>
            You haven't added any Alpha Mens silhouettes to your cart yet. Explore our 240+ GSM oversized t-shirts, hoodies, and tactical bottoms.
          </p>
          <Link to="/shop" className="btn-primary">
            Explore Drops <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / Shopping Bag
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase" }}>
            SHOPPING BAG ({cartItems.length})
          </h1>
        </div>

        {/* Free Shipping Alert Banner */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-md)",
            padding: "16px 20px",
            marginBottom: "32px"
          }}
        >
          <div className="flex items-center justify-between" style={{ fontSize: "0.85rem", marginBottom: "8px" }}>
            {amountNeededForFreeShipping > 0 ? (
              <span style={{ color: "var(--text-secondary)" }}>
                Add <strong style={{ color: "var(--accent-orange)" }}>₹{amountNeededForFreeShipping.toLocaleString("en-IN")}</strong> more to unlock <strong>FREE Express Shipping</strong>
              </span>
            ) : (
              <span style={{ color: "#34d399", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} /> You qualify for 100% Free Express Delivery!
              </span>
            )}
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", fontSize: "0.8rem" }}>
              {progressPercent}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Cart Layout: Two Columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: "40px", alignItems: "flex-start" }}>
          {/* Left: Cart Items List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                style={{
                  display: "flex",
                  gap: "20px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px"
                }}
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  style={{ width: "100px", height: "130px", objectFit: "cover", borderRadius: "var(--radius-sm)", background: "#111" }}
                />

                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        to={`/product/${item.product.id}`}
                        style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}
                      >
                        {item.product.name}
                      </Link>
                      <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginTop: "4px" }}>
                        Category: {item.product.categoryName} • {item.product.gsm}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      style={{ color: "var(--text-muted)", padding: "4px" }}
                      title="Remove from bag"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px", fontSize: "0.82rem" }}>
                    <span style={{ background: "rgba(255, 255, 255, 0.05)", padding: "4px 8px", borderRadius: "3px", border: "1px solid var(--border-light)" }}>
                      Size: <strong style={{ color: "#fff" }}>{item.size}</strong>
                    </span>
                    <span style={{ background: "rgba(255, 255, 255, 0.05)", padding: "4px 8px", borderRadius: "3px", border: "1px solid var(--border-light)" }}>
                      Color: <strong style={{ color: "#fff" }}>{item.color.name}</strong>
                    </span>
                  </div>

                  <div className="flex items-center justify-between" style={{ marginTop: "auto", paddingTop: "16px" }}>
                    {/* Quantity Stepper */}
                    <div className="cart-qty-control">
                      <button
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="cart-qty-btn"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="cart-qty-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Price Total */}
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                      {item.quantity > 1 && (
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                          (₹{item.price.toLocaleString("en-IN")} each)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/shop"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.84rem",
                color: "var(--text-secondary)",
                marginTop: "8px"
              }}
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Right: Order Summary Card */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-medium)",
              borderRadius: "var(--radius-md)",
              padding: "24px",
              position: "sticky",
              top: "100px"
            }}
          >
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "20px" }}>
              Order Summary
            </h2>

            {/* Demo Coupon Box */}
            <div style={{ marginBottom: "20px" }}>
              {appliedCoupon ? (
                <div style={{ display: "flex", alignItems: "center", justifyItems: "space-between", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "10px 14px", borderRadius: "var(--radius-sm)", fontSize: "0.84rem" }}>
                  <div className="flex items-center gap-2" style={{ color: "#34d399", fontWeight: 700, flex: 1 }}>
                    <Tag size={15} />
                    <span>Coupon '{appliedCoupon.code}' Applied</span>
                  </div>
                  <button onClick={removeCoupon} style={{ color: "#f87171", fontSize: "0.75rem", textDecoration: "underline" }}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. ALPHA10)"
                    className="input-dark"
                    style={{ textTransform: "uppercase", fontSize: "0.82rem" }}
                  />
                  <button type="submit" className="btn-secondary" style={{ padding: "0 18px", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                    Apply
                  </button>
                </form>
              )}

              {/* Quick Coupon Suggestions */}
              {!appliedCoupon && (
                <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => applyCoupon("ALPHA10")}
                    style={{ fontSize: "0.72rem", background: "rgba(249, 115, 22, 0.1)", border: "1px dashed rgba(249, 115, 22, 0.4)", color: "var(--accent-orange)", padding: "3px 8px", borderRadius: "3px" }}
                  >
                    Tap: ALPHA10 (10% OFF)
                  </button>
                  <button
                    onClick={() => applyCoupon("DROP200")}
                    style={{ fontSize: "0.72rem", background: "rgba(255, 255, 255, 0.05)", border: "1px dashed var(--border-medium)", color: "var(--text-secondary)", padding: "3px 8px", borderRadius: "3px" }}
                  >
                    Tap: DROP200 (₹200 OFF)
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.86rem", color: "var(--text-secondary)", borderTop: "1px solid var(--border-light)", paddingTop: "16px" }}>
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span style={{ color: "#fff" }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between" style={{ color: "var(--accent-orange)" }}>
                  <span>Coupon Savings</span>
                  <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>
                  {shippingAmount === 0 ? (
                    <strong style={{ color: "#34d399" }}>FREE</strong>
                  ) : (
                    `₹${shippingAmount}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Taxes (GST 12%)</span>
                <span style={{ color: "var(--text-muted)" }}>Included in Price</span>
              </div>
            </div>

            <div className="cart-total-line">
              <span>Final Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="btn-primary w-full"
              style={{ padding: "16px", fontSize: "0.95rem" }}
            >
              Proceed to Demo Checkout <ArrowRight size={18} />
            </button>

            <div style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "0.74rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              <ShieldCheck size={14} style={{ color: "#34d399" }} />
              DEMO STORE SANDBOX • NO REAL PAYMENT PROCESSED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
