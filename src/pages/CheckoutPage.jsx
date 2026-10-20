import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldAlert,
  CreditCard,
  Smartphone,
  Banknote,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { PINCODE_DATABASE } from "../data/products";

export const CheckoutPage = () => {
  const { cartItems, subtotal, discountAmount, shippingAmount, total, appliedCoupon, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    firstName: "Arjun",
    lastName: "Kapoor",
    email: "arjun.kapoor@example.com",
    phone: "9876543210",
    address: "Flat 402, Skyline Residency, 12th Main Road",
    landmark: "Near Metro Pillar 140",
    pincode: "110001",
    city: "New Delhi",
    state: "Delhi"
  });

  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi', 'card', 'netbanking', 'cod'
  const [selectedUpiApp, setSelectedUpiApp] = useState("gpay");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto lookup city & state if 6-digit pincode matches
    if (name === "pincode" && value.length === 6 && PINCODE_DATABASE[value]) {
      setFormData((prev) => ({
        ...prev,
        city: PINCODE_DATABASE[value].city,
        state: PINCODE_DATABASE[value].state
      }));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
      showToast("Please fill in all mandatory shipping fields", "error");
      return;
    }

    if (cartItems.length === 0) {
      showToast("Your cart is empty", "error");
      navigate("/shop");
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderId = `AM-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderRecord = {
        orderId,
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        items: cartItems,
        subtotal,
        discountAmount,
        shippingAmount,
        total,
        paymentMethod: paymentMethod.toUpperCase(),
        shippingAddress: formData,
        status: "Confirmed (Prototype Simulation)"
      };

      try {
        const stored = JSON.parse(localStorage.getItem("alpha_mens_orders") || "[]");
        localStorage.setItem("alpha_mens_orders", JSON.stringify([orderRecord, ...stored]));
      } catch (err) {
        console.error("Failed to store order in local storage", err);
      }

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if canvas-confetti fails
      }

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation/${orderId}`);
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "16px" }}>
            No Items in Checkout
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            Please add silhouettes to your cart before proceeding to demo checkout.
          </p>
          <Link to="/shop" className="btn-primary">
            Browse All Drops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">
        {/* MANDATORY PROTOTYPE SAFETY DISCLAIMER BANNER */}
        <div
          style={{
            background: "rgba(249, 115, 22, 0.08)",
            border: "1px solid rgba(249, 115, 22, 0.35)",
            borderRadius: "var(--radius-md)",
            padding: "16px 20px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "flex-start",
            gap: "14px"
          }}
        >
          <ShieldAlert size={22} style={{ color: "var(--accent-orange)", flexShrink: 0, marginTop: "2px" }} />
          <div style={{ fontSize: "0.85rem", color: "#fed7aa", lineHeight: 1.6 }}>
            <strong>PROTOTYPE DEMO CHECKOUT:</strong> This is a front-end simulation for the Alpha Menswear startup brand.
            <strong> Do not enter real credit card PINs or banking credentials.</strong> No monetary transaction will take place, and no real physical garments will be delivered. All order numbers and confirmations generated are mock data.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.8fr", gap: "40px", alignItems: "flex-start" }}>
          {/* LEFT: CHECKOUT FORM */}
          <form onSubmit={handlePlaceOrder}>
            {/* 1. Contact Info */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                marginBottom: "24px"
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: "18px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--accent-orange)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800 }}>
                  1
                </span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, textTransform: "uppercase", color: "#fff" }}>
                  Customer Contact Details
                </h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-dark"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    10-Digit Mobile Number (for AWB SMS) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-dark"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                marginBottom: "24px"
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: "18px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--accent-orange)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800 }}>
                  2
                </span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, textTransform: "uppercase", color: "#fff" }}>
                  Shipping & Delivery Address
                </h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="input-dark"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="input-dark"
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Flat, House No., Apartment, Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-dark"
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    PIN Code (6 digits) *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="input-dark"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="input-dark"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="input-dark"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method Simulation */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                marginBottom: "24px"
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: "18px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--accent-orange)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800 }}>
                  3
                </span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, textTransform: "uppercase", color: "#fff" }}>
                  Select Payment Method (Simulation)
                </h3>
              </div>

              {/* Payment Tabs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  style={{
                    padding: "12px 8px",
                    borderRadius: "var(--radius-sm)",
                    background: paymentMethod === "upi" ? "rgba(249, 115, 22, 0.15)" : "var(--bg-input)",
                    border: `1px solid ${paymentMethod === "upi" ? "var(--accent-orange)" : "var(--border-light)"}`,
                    color: paymentMethod === "upi" ? "#fff" : "var(--text-secondary)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}
                >
                  <Smartphone size={18} />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  style={{
                    padding: "12px 8px",
                    borderRadius: "var(--radius-sm)",
                    background: paymentMethod === "card" ? "rgba(249, 115, 22, 0.15)" : "var(--bg-input)",
                    border: `1px solid ${paymentMethod === "card" ? "var(--accent-orange)" : "var(--border-light)"}`,
                    color: paymentMethod === "card" ? "#fff" : "var(--text-secondary)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}
                >
                  <CreditCard size={18} />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("netbanking")}
                  style={{
                    padding: "12px 8px",
                    borderRadius: "var(--radius-sm)",
                    background: paymentMethod === "netbanking" ? "rgba(249, 115, 22, 0.15)" : "var(--bg-input)",
                    border: `1px solid ${paymentMethod === "netbanking" ? "var(--accent-orange)" : "var(--border-light)"}`,
                    color: paymentMethod === "netbanking" ? "#fff" : "var(--text-secondary)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}
                >
                  <Building size={18} />
                  <span>NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  style={{
                    padding: "12px 8px",
                    borderRadius: "var(--radius-sm)",
                    background: paymentMethod === "cod" ? "rgba(249, 115, 22, 0.15)" : "var(--bg-input)",
                    border: `1px solid ${paymentMethod === "cod" ? "var(--accent-orange)" : "var(--border-light)"}`,
                    color: paymentMethod === "cod" ? "#fff" : "var(--text-secondary)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}
                >
                  <Banknote size={18} />
                  <span>Cash (COD)</span>
                </button>
              </div>

              {/* Payment Details Container */}
              <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-sm)", padding: "16px" }}>
                {paymentMethod === "upi" && (
                  <div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>
                      Select Simulated UPI Application:
                    </div>
                    <div className="flex gap-2" style={{ flexWrap: "wrap", marginBottom: "12px" }}>
                      {["Google Pay", "PhonePe", "Paytm UPI", "Cred Pay"].map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setSelectedUpiApp(app)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "4px",
                            fontSize: "0.76rem",
                            fontWeight: 600,
                            background: selectedUpiApp === app ? "var(--accent-orange)" : "rgba(255,255,255,0.06)",
                            color: selectedUpiApp === app ? "#fff" : "var(--text-secondary)"
                          }}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Simulation: Instant approval mock transaction via {selectedUpiApp}.
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "4px" }}>
                        Simulated Card Number
                      </label>
                      <input
                        type="text"
                        defaultValue="4111 •••• •••• 1111 (Demo Card)"
                        readOnly
                        className="input-dark"
                        style={{ color: "var(--text-muted)", cursor: "not-allowed" }}
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <input
                        type="text"
                        defaultValue="MM / YY: 12/28"
                        readOnly
                        className="input-dark"
                        style={{ color: "var(--text-muted)", cursor: "not-allowed", fontSize: "0.8rem" }}
                      />
                      <input
                        type="text"
                        defaultValue="CVV: •••"
                        readOnly
                        className="input-dark"
                        style={{ color: "var(--text-muted)", cursor: "not-allowed", fontSize: "0.8rem" }}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                      Choose Simulated Bank
                    </label>
                    <select className="input-dark">
                      <option>HDFC Bank (Demo)</option>
                      <option>ICICI Bank (Demo)</option>
                      <option>State Bank of India (Demo)</option>
                      <option>Axis Bank (Demo)</option>
                    </select>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div>
                    <div className="flex items-center gap-2" style={{ color: "#34d399", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                      <CheckCircle2 size={16} /> Cash on Delivery (COD) Approved
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                      Pay ₹{total.toLocaleString("en-IN")} upon doorstep parcel inspection. An SMS verification code will be sent prior to dispatch.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
              style={{ padding: "18px", fontSize: "1rem" }}
            >
              {isSubmitting ? (
                <span>Simulating Order Placement...</span>
              ) : (
                <span>
                  Place Demo Order (₹{total.toLocaleString("en-IN")}) <ArrowRight size={18} />
                </span>
              )}
            </button>
          </form>

          {/* RIGHT: ORDER SUMMARY */}
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
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "16px" }}>
              Order Review ({cartItems.length})
            </h3>

            {/* Items Mini List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "240px", overflowY: "auto", marginBottom: "20px", paddingRight: "4px" }}>
              {cartItems.map((item) => (
                <div key={item.cartId} className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{ width: "48px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.product.name}
                    </div>
                    <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                      Size: {item.size} • Qty: {item.quantity}
                    </div>
                  </div>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff" }}>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span style={{ color: "#fff" }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between" style={{ color: "var(--accent-orange)" }}>
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingAmount === 0 ? <strong style={{ color: "#34d399" }}>FREE</strong> : `₹${shippingAmount}`}
                </span>
              </div>
            </div>

            <div className="cart-total-line">
              <span>Final Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px", borderRadius: "4px", fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              🔒 Simulated PCI-DSS mock handshake. No real customer data is permanently persisted or broadcasted to third parties.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
