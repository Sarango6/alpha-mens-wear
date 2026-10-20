import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Package, Truck, Calendar, Download, ArrowRight, ShieldCheck, FileText } from "lucide-react";
import { useToast } from "../context/ToastContext";

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { showToast } = useToast();

  const orderData = useMemo(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("alpha_mens_orders") || "[]");
      const found = stored.find((o) => o.orderId === orderId);
      if (found) return found;
    } catch {
      // fallback
    }

    return {
      orderId: orderId || "AM-2026-849201",
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      items: [
        {
          product: {
            name: "Shadow of Resolve Oversized T-Shirt",
            images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"]
          },
          size: "L",
          color: { name: "Obsidian Black" },
          quantity: 1,
          price: 1199
        }
      ],
      total: 1199,
      paymentMethod: "UPI (SIMULATED)",
      shippingAddress: {
        firstName: "Arjun",
        lastName: "Kapoor",
        address: "Flat 402, Skyline Residency",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110001"
      }
    };
  }, [orderId]);

  const handleDownloadInvoice = () => {
    showToast(`Downloading Simulated Invoice for Order ${orderData.orderId}`, "success");
  };

  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* SUCCESS ICON & HEADLINE */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", border: "2px solid #10b981", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#34d399" }}>
            <CheckCircle2 size={44} />
          </div>

          <span className="badge badge-orange" style={{ marginBottom: "10px" }}>
            SIMULATED DEMO ORDER
          </span>

          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: "8px" }}>
            ORDER CONFIRMED
          </h1>

          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Order ID: <strong style={{ color: "#fff", fontFamily: "var(--font-mono)" }}>{orderData.orderId}</strong>
          </p>
        </div>

        {/* DEMO NOTICE CALLOUT */}
        <div
          style={{
            background: "rgba(249, 115, 22, 0.08)",
            border: "1px dashed rgba(249, 115, 22, 0.4)",
            borderRadius: "var(--radius-md)",
            padding: "16px 20px",
            marginBottom: "32px",
            fontSize: "0.82rem",
            color: "#fed7aa",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <ShieldCheck size={20} style={{ color: "var(--accent-orange)", flexShrink: 0 }} />
          <span>
            <strong>PROTOTYPE VERIFICATION:</strong> No money has been deducted from your account and no real shipment will be dispatched. This screen confirms that the checkout state machine, order record, and confirmation routing are functioning seamlessly.
          </span>
        </div>

        {/* ORDER DETAILS CARD */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-lg)",
            padding: "32px",
            marginBottom: "32px"
          }}
        >
          {/* Estimated Delivery Timeline */}
          <div style={{ marginBottom: "28px", paddingBottom: "24px", borderBottom: "1px solid var(--border-light)" }}>
            <div className="flex items-center gap-2" style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
              <Truck size={18} style={{ color: "var(--accent-orange)" }} />
              <span>Simulated Delivery Schedule</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "var(--radius-sm)" }}>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Estimated Dispatch</div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff", marginTop: "2px" }}>Within 24 Hours</div>
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Courier Partner</div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff", marginTop: "2px" }}>BlueDart Express Air (Mock)</div>
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Tracking Number</div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--accent-orange)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>BLU-892140</div>
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div style={{ marginBottom: "28px" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 800, textTransform: "uppercase", color: "#fff", marginBottom: "16px" }}>
              Purchased Silhouettes
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {orderData.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between" style={{ paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      style={{ width: "52px", height: "66px", objectFit: "cover", borderRadius: "4px" }}
                    />
                    <div>
                      <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff" }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Size: {item.size} • Color: {item.color.name} • Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address & Payment Method */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", borderTop: "1px solid var(--border-light)", paddingTop: "20px" }}>
            <div>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px" }}>
                Delivery Destination
              </div>
              <div style={{ fontSize: "0.85rem", color: "#fff", lineHeight: 1.5 }}>
                {orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}
                <br />
                {orderData.shippingAddress.address}
                <br />
                {orderData.shippingAddress.city}, {orderData.shippingAddress.state} — {orderData.shippingAddress.pincode}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px" }}>
                Payment Method & Total
              </div>
              <div style={{ fontSize: "0.85rem", color: "#fff", lineHeight: 1.5 }}>
                Method: <strong>{orderData.paymentMethod}</strong>
                <br />
                Total Paid: <strong style={{ color: "var(--accent-orange)" }}>₹{orderData.total.toLocaleString("en-IN")}</strong>
                <br />
                Status: <span style={{ color: "#34d399" }}>Demo Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={handleDownloadInvoice}
            className="btn-secondary"
            style={{ fontSize: "0.85rem" }}
          >
            <Download size={16} /> Download Demo Invoice
          </button>
          <Link to={`/track-order?orderId=${orderData.orderId}`} className="btn-secondary" style={{ fontSize: "0.85rem" }}>
            <Truck size={16} /> Track Simulated Shipment
          </Link>
          <Link to="/shop" className="btn-primary" style={{ fontSize: "0.85rem" }}>
            Continue Exploring Drops <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
