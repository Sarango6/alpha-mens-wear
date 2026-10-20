import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { useToast } from "../context/ToastContext";

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  const handleOpenChat = () => {
    showToast("Opening Alpha Mens Stylist Support (+91 98765 XXXXX - Demo Placeholder)", "info", 4000);
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "68px",
        right: "16px",
        zIndex: 99990,
        pointerEvents: "auto"
      }}
    >
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "54px",
            right: 0,
            width: "280px",
            background: "#16171b",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            boxShadow: "var(--shadow-elevated)",
            animation: "slideUp 200ms ease"
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>
              Alpha Mens VIP Stylist
            </span>
            <button
              onClick={() => setIsOpen(false)}
              style={{ color: "var(--text-muted)" }}
            >
              <X size={16} />
            </button>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "12px", lineHeight: 1.5 }}>
            Need help selecting your oversized t-shirt size or inquiring about fabric GSM?
          </p>
          <button
            onClick={handleOpenChat}
            style={{
              width: "100%",
              background: "#25D366",
              color: "#ffffff",
              padding: "8px 12px",
              borderRadius: "4px",
              fontWeight: 700,
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px"
            }}
          >
            <MessageSquare size={16} /> Chat on WhatsApp (Demo)
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "#25D366",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(37, 211, 102, 0.4)",
          transition: "transform 200ms ease"
        }}
        title="Chat with Alpha Mens Stylist"
        aria-label="WhatsApp Stylist Chat"
      >
        <MessageSquare size={22} />
      </button>
    </div>
  );
};
