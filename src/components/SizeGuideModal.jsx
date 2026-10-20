import React, { useState } from "react";
import { X, Ruler, CheckCircle } from "lucide-react";

export const SizeGuideModal = ({ isOpen, onClose, category = "oversized-tshirts" }) => {
  const [unit, setUnit] = useState("in"); // 'in' or 'cm'

  if (!isOpen) return null;

  const sizeChartInches = [
    { size: "S", chest: "42\"", length: "28\"", shoulder: "21\"", sleeve: "9.0\"" },
    { size: "M", chest: "44\"", length: "29\"", shoulder: "22\"", sleeve: "9.5\"" },
    { size: "L", chest: "46\"", length: "30\"", shoulder: "23\"", sleeve: "10.0\"" },
    { size: "XL", chest: "48\"", length: "31\"", shoulder: "24\"", sleeve: "10.5\"" },
    { size: "XXL", chest: "50\"", length: "32\"", shoulder: "25\"", sleeve: "11.0\"" }
  ];

  const sizeChartCm = [
    { size: "S", chest: "107 cm", length: "71 cm", shoulder: "53 cm", sleeve: "23 cm" },
    { size: "M", chest: "112 cm", length: "74 cm", shoulder: "56 cm", sleeve: "24 cm" },
    { size: "L", chest: "117 cm", length: "76 cm", shoulder: "58 cm", sleeve: "25 cm" },
    { size: "XL", chest: "122 cm", length: "79 cm", shoulder: "61 cm", sleeve: "27 cm" },
    { size: "XXL", chest: "127 cm", length: "81 cm", shoulder: "63 cm", sleeve: "28 cm" }
  ];

  const activeChart = unit === "in" ? sizeChartInches : sizeChartCm;

  return (
    <div className="prototype-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="prototype-modal-card"
        style={{ maxWidth: "620px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="prototype-modal-header">
          <div className="flex items-center gap-2">
            <Ruler size={20} className="prototype-alert-icon" />
            <h3>Alpha Mens Official Sizing Guide</h3>
          </div>
          <button onClick={onClose} className="prototype-close-btn" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="prototype-modal-body">
          {/* Unit Toggle & Description */}
          <div className="flex items-center justify-between" style={{ marginBottom: "18px" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Engineered Dropped-Shoulder Oversized Cut
            </span>
            <div style={{ display: "inline-flex", background: "var(--bg-input)", borderRadius: "4px", padding: "2px", border: "1px solid var(--border-light)" }}>
              <button
                type="button"
                onClick={() => setUnit("in")}
                style={{
                  padding: "4px 12px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  borderRadius: "3px",
                  background: unit === "in" ? "var(--accent-orange)" : "transparent",
                  color: unit === "in" ? "#fff" : "var(--text-secondary)"
                }}
              >
                Inches (")
              </button>
              <button
                type="button"
                onClick={() => setUnit("cm")}
                style={{
                  padding: "4px 12px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  borderRadius: "3px",
                  background: unit === "cm" ? "var(--accent-orange)" : "transparent",
                  color: unit === "cm" ? "#fff" : "var(--text-secondary)"
                }}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto", border: "1px solid var(--border-light)", borderRadius: "6px", marginBottom: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255, 255, 255, 0.04)", borderBottom: "1px solid var(--border-light)" }}>
                  <th style={{ padding: "10px 14px", color: "var(--accent-orange)", fontWeight: 800 }}>SIZE</th>
                  <th style={{ padding: "10px 14px", color: "#fff", fontWeight: 700 }}>CHEST</th>
                  <th style={{ padding: "10px 14px", color: "#fff", fontWeight: 700 }}>LENGTH</th>
                  <th style={{ padding: "10px 14px", color: "#fff", fontWeight: 700 }}>SHOULDER</th>
                  <th style={{ padding: "10px 14px", color: "#fff", fontWeight: 700 }}>SLEEVE</th>
                </tr>
              </thead>
              <tbody>
                {activeChart.map((row, idx) => (
                  <tr
                    key={row.size}
                    style={{
                      borderBottom: idx !== activeChart.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
                      background: idx % 2 === 0 ? "transparent" : "rgba(255, 255, 255, 0.01)"
                    }}
                  >
                    <td style={{ padding: "10px 14px", fontWeight: 800, color: "#fff" }}>{row.size}</td>
                    <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>{row.chest}</td>
                    <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>{row.length}</td>
                    <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>{row.shoulder}</td>
                    <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Model & Measuring Tips */}
          <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "16px", borderRadius: "6px", border: "1px solid var(--border-light)", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            <div className="flex items-center gap-2" style={{ color: "#ffffff", fontWeight: 700, marginBottom: "6px" }}>
              <CheckCircle size={15} style={{ color: "var(--accent-orange)" }} />
              Model Size & Fit Note
            </div>
            <p>
              Our streetwear oversized cuts feature an intentional 2-inch drop shoulder.
              <strong> Our models typically stand 6'0" to 6'2" and wear size L for an authentic slouchy drape.</strong> If you desire a regular tailored fit, order one size smaller than your usual t-shirt size.
            </p>
          </div>

          <div style={{ marginTop: "20px" }}>
            <button className="btn-primary w-full" onClick={onClose}>
              Got It, Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
