import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Package, MapPin, Heart, Shield, LogOut, CheckCircle2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { wishlistCount } = useWishlist();

  const mockOrders = [
    {
      id: "AM-2026-892144",
      date: "18 Oct 2026",
      total: 2498,
      status: "Delivered (Demo)",
      items: "Shadow of Resolve Oversized Tee (L), Cyber Ronin Katakana Graphic Tee (L)"
    },
    {
      id: "AM-2026-641209",
      date: "04 Sep 2026",
      total: 2199,
      status: "Delivered (Demo)",
      items: "Tactical Ripstop Parachute Cargo Pants (M)"
    }
  ];

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / My Account (Demo)
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase" }}>
            MEMBER PROFILE
          </h1>
        </div>

        {/* Member Status Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #16171b 0%, #1e1f26 100%)",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-lg)",
            padding: "28px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          <div className="flex items-center gap-4">
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--accent-orange)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", fontWeight: 800 }}>
              AK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Arjun Kapoor</h3>
                <span className="badge badge-orange">ALPHA VIP</span>
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                arjun.kapoor@example.com • +91 98765 43210
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", textAlign: "center" }}>
            <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px 18px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--accent-orange)", fontFamily: "var(--font-mono)" }}>
                2
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Total Orders
              </div>
            </div>

            <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px 18px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", fontFamily: "var(--font-mono)" }}>
                {wishlistCount}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Saved Wishlist
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border-light)", paddingBottom: "12px", marginBottom: "28px" }}>
          <button
            onClick={() => setActiveTab("orders")}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "0.85rem",
              fontWeight: 700,
              background: activeTab === "orders" ? "var(--text-white)" : "transparent",
              color: activeTab === "orders" ? "#000" : "var(--text-secondary)",
              transition: "all var(--transition-fast)"
            }}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab("address")}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "0.85rem",
              fontWeight: 700,
              background: activeTab === "address" ? "var(--text-white)" : "transparent",
              color: activeTab === "address" ? "#000" : "var(--text-secondary)",
              transition: "all var(--transition-fast)"
            }}
          >
            Saved Delivery Addresses
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "orders" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {mockOrders.map((ord) => (
              <div
                key={ord.id}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px"
                }}
              >
                <div className="flex items-center justify-between" style={{ borderBottom: "1px solid var(--border-light)", paddingBottom: "12px", marginBottom: "12px" }}>
                  <div>
                    <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Order Placed</span>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>{ord.date}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Order ID</span>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-orange)", fontFamily: "var(--font-mono)" }}>{ord.id}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total</span>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>₹{ord.total.toLocaleString("en-IN")}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    {ord.items}
                  </div>
                  <Link
                    to={`/track-order?orderId=${ord.id}`}
                    style={{ fontSize: "0.8rem", color: "var(--accent-orange)", fontWeight: 700 }}
                  >
                    Track Shipment →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "address" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-md)",
                padding: "20px"
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
                <span className="badge badge-orange">DEFAULT RESIDENCE</span>
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                Arjun Kapoor
              </div>
              <div style={{ fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Flat 402, Skyline Residency, 12th Main Road, Near Metro Pillar 140
                <br />
                New Delhi, Delhi — 110001
                <br />
                Phone: +91 98765 43210
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
