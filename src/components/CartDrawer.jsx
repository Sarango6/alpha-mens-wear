import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Check, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponCode)) {
      setCouponCode("");
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <div
      className="cart-drawer-backdrop"
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <ShoppingBag size={20} style={{ color: "var(--accent-orange)" }} />
            <span>Your Bag ({cartItems.length})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="prototype-close-btn"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="cart-free-shipping-progress">
          <div className="flex items-center justify-between" style={{ fontSize: "0.78rem" }}>
            {amountNeededForFreeShipping > 0 ? (
              <span style={{ color: "var(--text-secondary)" }}>
                Add <strong style={{ color: "var(--accent-orange)" }}>₹{amountNeededForFreeShipping.toLocaleString("en-IN")}</strong> more for <strong>FREE Express Shipping</strong>
              </span>
            ) : (
              <span style={{ color: "#34d399", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={14} /> You've unlocked FREE Express Shipping!
              </span>
            )}
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              {progressPercent}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Body */}
        {cartItems.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", marginBottom: "16px" }}>
              <ShoppingBag size={32} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>
              Your Bag is Empty
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "260px", marginBottom: "24px" }}>
              Explore our 240+ GSM heavyweight oversized t-shirts and hoodies.
            </p>
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/shop");
              }}
              className="btn-primary"
            >
              Explore Drops
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.cartId} className="cart-item-row">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="cart-item-thumb"
                  />
                  <div className="cart-item-details">
                    <Link
                      to={`/product/${item.product.id}`}
                      onClick={() => setIsCartOpen(false)}
                      className="cart-item-title"
                    >
                      {item.product.name}
                    </Link>
                    <div className="cart-item-meta">
                      Size: <strong style={{ color: "#fff" }}>{item.size}</strong> • Color: {item.color.name}
                    </div>

                    <div className="flex items-center justify-between" style={{ marginTop: "auto" }}>
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

                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          style={{ color: "var(--text-muted)", padding: "4px" }}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="cart-drawer-footer">
              {/* Promo Code Input */}
              {appliedCoupon ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "8px 12px", borderRadius: "var(--radius-sm)", marginBottom: "16px", fontSize: "0.82rem" }}>
                  <div className="flex items-center gap-2" style={{ color: "#34d399", fontWeight: 700 }}>
                    <Tag size={14} />
                    <span>Coupon: {appliedCoupon.code}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ fontSize: "0.75rem", color: "#f87171", textDecoration: "underline" }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="cart-coupon-row">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code (e.g. ALPHA10)"
                    className="input-dark"
                    style={{ textTransform: "uppercase" }}
                  />
                  <button type="submit" className="btn-secondary" style={{ padding: "0 16px", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                    Apply
                  </button>
                </form>
              )}

              {/* Summary Breakdown */}
              <div className="cart-summary-line">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div className="cart-summary-line" style={{ color: "var(--accent-orange)" }}>
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="cart-summary-line">
                <span>Estimated Shipping</span>
                <span>
                  {shippingAmount === 0 ? (
                    <strong style={{ color: "#34d399" }}>FREE</strong>
                  ) : (
                    `₹${shippingAmount}`
                  )}
                </span>
              </div>

              <div className="cart-total-line">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button onClick={handleProceedToCheckout} className="btn-primary w-full">
                  Proceed to Demo Checkout <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/cart");
                  }}
                  className="btn-secondary w-full"
                  style={{ fontSize: "0.82rem" }}
                >
                  View Full Cart Page
                </button>
              </div>

              <p style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "12px", fontFamily: "var(--font-mono)" }}>
                PROTOTYPE DEMO • NO REAL PAYMENT PROCESSED
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
