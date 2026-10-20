import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Ruler, CheckCircle, ArrowRight } from "lucide-react";

export const SizeGuidePage = () => {
  const [unit, setUnit] = useState("in"); // 'in' or 'cm'

  const teeChart = unit === "in" ? [
    { size: "S", chest: "42\"", length: "28\"", shoulder: "21\"", sleeve: "9.0\"" },
    { size: "M", chest: "44\"", length: "29\"", shoulder: "22\"", sleeve: "9.5\"" },
    { size: "L", chest: "46\"", length: "30\"", shoulder: "23\"", sleeve: "10.0\"" },
    { size: "XL", chest: "48\"", length: "31\"", shoulder: "24\"", sleeve: "10.5\"" },
    { size: "XXL", chest: "50\"", length: "32\"", shoulder: "25\"", sleeve: "11.0\"" }
  ] : [
    { size: "S", chest: "107 cm", length: "71 cm", shoulder: "53 cm", sleeve: "23 cm" },
    { size: "M", chest: "112 cm", length: "74 cm", shoulder: "56 cm", sleeve: "24 cm" },
    { size: "L", chest: "117 cm", length: "76 cm", shoulder: "58 cm", sleeve: "25 cm" },
    { size: "XL", chest: "122 cm", length: "79 cm", shoulder: "61 cm", sleeve: "27 cm" },
    { size: "XXL", chest: "127 cm", length: "81 cm", shoulder: "63 cm", sleeve: "28 cm" }
  ];

  const hoodieChart = unit === "in" ? [
    { size: "S", chest: "44\"", length: "27.5\"", shoulder: "22\"", sleeve: "24.0\"" },
    { size: "M", chest: "46\"", length: "28.5\"", shoulder: "23\"", sleeve: "24.5\"" },
    { size: "L", chest: "48\"", length: "29.5\"", shoulder: "24\"", sleeve: "25.0\"" },
    { size: "XL", chest: "50\"", length: "30.5\"", shoulder: "25\"", sleeve: "25.5\"" },
    { size: "XXL", chest: "52\"", length: "31.5\"", shoulder: "26\"", sleeve: "26.0\"" }
  ] : [
    { size: "S", chest: "112 cm", length: "70 cm", shoulder: "56 cm", sleeve: "61 cm" },
    { size: "M", chest: "117 cm", length: "72 cm", shoulder: "58 cm", sleeve: "62 cm" },
    { size: "L", chest: "122 cm", length: "75 cm", shoulder: "61 cm", sleeve: "64 cm" },
    { size: "XL", chest: "127 cm", length: "77 cm", shoulder: "64 cm", sleeve: "65 cm" },
    { size: "XXL", chest: "132 cm", length: "80 cm", shoulder: "66 cm", sleeve: "66 cm" }
  ];

  return (
    <div style={{ padding: "40px 0 100px" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / Official Sizing Guide
          </div>
          <span className="section-label">Engineered Silhouette Dimensions</span>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase" }}>
            ALPHA MENS SIZING CHART
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
            Our pieces are tailored with an intentional boxy drop-shoulder cut. Use this chart to determine your ideal streetwear drape.
          </p>
        </div>

        {/* Unit Toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            TOGGLE MEASUREMENT STANDARD:
          </span>
          <div style={{ display: "inline-flex", background: "var(--bg-input)", borderRadius: "4px", padding: "2px", border: "1px solid var(--border-light)" }}>
            <button
              onClick={() => setUnit("in")}
              style={{
                padding: "6px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                borderRadius: "3px",
                background: unit === "in" ? "var(--accent-orange)" : "transparent",
                color: unit === "in" ? "#fff" : "var(--text-secondary)"
              }}
            >
              Inches (")
            </button>
            <button
              onClick={() => setUnit("cm")}
              style={{
                padding: "6px 14px",
                fontSize: "0.78rem",
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

        {/* 1. Oversized T-Shirts Chart */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", padding: "24px", marginBottom: "36px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "16px" }}>
            1. 240+ GSM Oversized T-Shirts
          </h3>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255, 255, 255, 0.04)", borderBottom: "1px solid var(--border-light)" }}>
                  <th style={{ padding: "12px", color: "var(--accent-orange)", fontWeight: 800 }}>SIZE</th>
                  <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>CHEST (CIRCUMFERENCE)</th>
                  <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>BODY LENGTH</th>
                  <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>SHOULDER WIDTH</th>
                  <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>SLEEVE LENGTH</th>
                </tr>
              </thead>
              <tbody>
                {teeChart.map((row, idx) => (
                  <tr key={row.size} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                    <td style={{ padding: "12px", fontWeight: 800, color: "#fff" }}>{row.size}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.chest}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.length}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.shoulder}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Heavyweight Hoodies Chart */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", padding: "24px", marginBottom: "36px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "16px" }}>
            2. 380–400 GSM Heavyweight Hoodies
          </h3>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255, 255, 255, 0.04)", borderBottom: "1px solid var(--border-light)" }}>
                  <th style={{ padding: "12px", color: "var(--accent-orange)", fontWeight: 800 }}>SIZE</th>
                  <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>CHEST (CIRCUMFERENCE)</th>
                  <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>BODY LENGTH</th>
                  <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>SHOULDER WIDTH</th>
                  <th style={{ padding: "12px", color: "#fff", fontWeight: 700 }}>SLEEVE LENGTH</th>
                </tr>
              </thead>
              <tbody>
                {hoodieChart.map((row, idx) => (
                  <tr key={row.size} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                    <td style={{ padding: "12px", fontWeight: 800, color: "#fff" }}>{row.size}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.chest}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.length}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.shoulder}</td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure Instructions */}
        <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-md)", padding: "28px", marginBottom: "36px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "16px" }}>
            How To Measure Your Best-Fitting T-Shirt
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
            <div>
              <strong style={{ color: "#fff", display: "block" }}>1. Chest Width:</strong>
              Lay your favorite t-shirt flat on a table. Measure 1 inch below the armhole across from left seam to right seam, then double that measurement for the full circumference.
            </div>

            <div>
              <strong style={{ color: "#fff", display: "block" }}>2. Garment Length:</strong>
              Measure vertically from the highest point of the shoulder seam right next to the collar down to the bottom hem.
            </div>

            <div>
              <strong style={{ color: "#fff", display: "block" }}>3. Shoulder Width:</strong>
              Measure straight across the back from the tip of the left shoulder seam to the tip of the right shoulder seam.
            </div>

            <div>
              <strong style={{ color: "#fff", display: "block" }}>4. Intended Fit Strategy:</strong>
              For an authentic streetwear slouch with dropped shoulders, order your true standard size. If you want a tailored fit, size down by one.
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link to="/shop" className="btn-primary">
            Browse All Drops Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
