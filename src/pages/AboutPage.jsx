import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Sparkles, Feather, Compass, Layers } from "lucide-react";

export const AboutPage = () => {
  return (
    <div style={{ padding: "40px 0 100px" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / About Us
          </div>
          <span className="section-label">The Alpha Mens Ethos</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1 }}>
            ENGINEERED STREETWEAR // BRED FOR DURABILITY
          </h1>
        </div>

        {/* Hero Image */}
        <div style={{ position: "relative", height: "420px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-medium)", marginBottom: "48px" }}>
          <img
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85"
            alt="Alpha Mens Brand Photography"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(9, 9, 11, 0.95) 100%)" }} />
          <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
            <span className="badge badge-orange" style={{ marginBottom: "8px" }}>
              FOUNDED 2026 // NEW DELHI
            </span>
            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>
              Rejecting flimsy fast fashion. One 240 GSM drop at a time.
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "60px" }}>
          <p>
            For years, the Indian menswear market was split between two unappealing extremes: overpriced multinational luxury labels charging ₹8,000 for standard tees, or cheap fast-fashion brands mass-producing 140 GSM polyester-blend shirts that lose their neckline after two machine washes.
          </p>

          <p>
            <strong>Alpha Mens was born out of pure frustration with this mediocrity.</strong> We set out to build an authentic domestic streetwear house that engineers heavyweight garments for modern men who respect their aesthetic.
          </p>

          <p>
            We spent nine months perfecting our proprietary fabric recipes. Our oversized t-shirts start at a dense 240 GSM single jersey and interlock knit, woven exclusively from long-staple combed cotton yarns. We bio-wash each roll with non-toxic silicone enzymes, creating an ultra-soft handle with zero surface pilling.
          </p>
        </div>

        {/* The 4 Pillars */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "60px" }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", padding: "28px", borderRadius: "var(--radius-md)" }}>
            <Layers size={24} style={{ color: "var(--accent-orange)", marginBottom: "12px" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>
              240+ GSM Heavyweight Density
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Dense combed cotton that creates a structured architectural drape. No see-through, no body cling, and zero transparency even in bone white.
            </p>
          </div>

          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", padding: "28px", borderRadius: "var(--radius-md)" }}>
            <Compass size={24} style={{ color: "var(--accent-orange)", marginBottom: "12px" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>
              Engineered Boxy Silhouette
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Tailored with an intentional 2-inch drop shoulder, wider bicep cuffs, and a balanced body length that complements an athletic build.
            </p>
          </div>

          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", padding: "28px", borderRadius: "var(--radius-md)" }}>
            <Shield size={24} style={{ color: "var(--accent-orange)", marginBottom: "12px" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>
              Anti-Sag Lycra Collars
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Our 1.25" crewneck ribs are reinforced with high-retention Lycra spandex so your collar stays crisp and flat over 50+ wash cycles.
            </p>
          </div>

          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", padding: "28px", borderRadius: "var(--radius-md)" }}>
            <Sparkles size={24} style={{ color: "var(--accent-orange)", marginBottom: "12px" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>
              Tactile 3D & Discharge Prints
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Zero heavy rubber stickers. We use zero-hand Japanese discharge ink and sculptural 3D foam puff embroidery that breaths with the fabric.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <Link to="/shop" className="btn-primary" style={{ padding: "16px 36px" }}>
            Explore The Latest Drops <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};
