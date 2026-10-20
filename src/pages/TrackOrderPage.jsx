import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Truck, CheckCircle2, Clock, MapPin, Package, AlertCircle } from "lucide-react";
import { useToast } from "../context/ToastContext";

export const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState("9876543210");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      showToast("Please enter an Order ID (e.g. AM-2026-8921)", "error");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTrackingData({
        orderId: orderId.toUpperCase(),
        carrier: "BlueDart Express Air (Mock)",
        awb: "BLU-892140",
        origin: "Alpha Mens Central Hub, New Delhi",
        destination: "New Delhi, 110001",
        estimatedDelivery: "In 2-3 Business Days",
        currentStatus: "In Transit — Hub Departure",
        steps: [
          { title: "Order Verified & Confirmed", date: "Today, 10:15 AM", done: true, current: false },
          { title: "Packed at Central Fulfillment Hub (Okhla)", date: "Today, 02:40 PM", done: true, current: false },
          { title: "Handed over to BlueDart Express Air", date: "Today, 06:10 PM", done: true, current: true },
          { title: "In Transit to Regional Sorting Facility", date: "Tomorrow, Expected", done: false, current: false },
          { title: "Out for Doorstep Delivery", date: "In 2 Days, Expected", done: false, current: false }
        ]
      });
      showToast("Simulated shipment details retrieved successfully!", "success");
    }, 500);
  };

  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
      // Auto trigger demo lookup
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setTrackingData({
          orderId: initialOrderId.toUpperCase(),
          carrier: "BlueDart Express Air (Mock)",
          awb: "BLU-892140",
          origin: "Alpha Mens Central Hub, New Delhi",
          destination: "New Delhi, 110001",
          estimatedDelivery: "In 2-3 Business Days",
          currentStatus: "Packed & Awaiting Courier Scan",
          steps: [
            { title: "Order Verified & Confirmed", date: "Today, 10:15 AM", done: true, current: false },
            { title: "Packed at Central Fulfillment Hub (Okhla)", date: "Today, 02:40 PM", done: true, current: true },
            { title: "Handed over to BlueDart Express Air", date: "Expected by 07:00 PM", done: false, current: false },
            { title: "In Transit to Regional Sorting Facility", date: "Tomorrow, Expected", done: false, current: false },
            { title: "Out for Doorstep Delivery", date: "In 2 Days, Expected", done: false, current: false }
          ]
        });
      }, 300);
    }
  }, [initialOrderId]);

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container" style={{ maxWidth: "760px" }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / Track Demo Order
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase" }}>
            TRACK YOUR SHIPMENT
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
            Real-time simulated tracking for Alpha Mens orders across India.
          </p>
        </div>

        {/* Search Card */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-md)",
            padding: "28px",
            marginBottom: "32px"
          }}
        >
          <form onSubmit={handleTrackSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Alpha Mens Order ID *
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. AM-2026-8921"
                  className="input-dark"
                  style={{ textTransform: "uppercase" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  10-Digit Mobile Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="input-dark"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full">
              {isLoading ? "Fetching Shipment Telemetry..." : "Track Shipment"}
            </button>
          </form>

          <div style={{ marginTop: "16px", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textAlign: "center" }}>
            PROTOTYPE DEMO: Enter any sample ID or test with default <code>AM-2026-8921</code>
          </div>
        </div>

        {/* Tracking Status Card Result */}
        {trackingData && (
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-medium)",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
              animation: "fadeIn 300ms ease"
            }}
          >
            <div className="flex items-center justify-between" style={{ borderBottom: "1px solid var(--border-light)", paddingBottom: "20px", marginBottom: "24px" }}>
              <div>
                <span className="badge badge-orange" style={{ marginBottom: "6px" }}>
                  {trackingData.currentStatus}
                </span>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>
                  Order #{trackingData.orderId}
                </h3>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Estimated Arrival</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#34d399" }}>
                  {trackingData.estimatedDelivery}
                </div>
              </div>
            </div>

            {/* AWB info bar */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", background: "rgba(255,255,255,0.02)", padding: "14px", borderRadius: "var(--radius-sm)", marginBottom: "32px", fontSize: "0.8rem" }}>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Courier Partner</span>
                <strong style={{ color: "#fff" }}>{trackingData.carrier}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Air Waybill (AWB)</span>
                <strong style={{ color: "var(--accent-orange)", fontFamily: "var(--font-mono)" }}>{trackingData.awb}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)", display: "block" }}>Destination</span>
                <strong style={{ color: "#fff" }}>{trackingData.destination}</strong>
              </div>
            </div>

            {/* Timeline Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative", paddingLeft: "32px" }}>
              {/* Vertical line indicator */}
              <div style={{ position: "absolute", top: "10px", bottom: "10px", left: "11px", width: "2px", background: "var(--border-light)" }} />

              {trackingData.steps.map((step, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  {/* Step node dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-32px",
                      top: "2px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: step.done ? (step.current ? "var(--accent-orange)" : "#10b981") : "#262626",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: step.current ? "var(--shadow-glow)" : "none"
                    }}
                  >
                    {step.done ? <CheckCircle2 size={14} /> : <Clock size={12} />}
                  </div>

                  <div>
                    <div style={{ fontSize: "0.92rem", fontWeight: step.current ? 800 : 600, color: step.current ? "#fff" : step.done ? "#e4e4e7" : "var(--text-muted)" }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                      {step.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
