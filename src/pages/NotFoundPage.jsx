import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div style={{ padding: "120px 0", textAlign: "center" }}>
      <div className="container" style={{ maxWidth: "540px" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(249, 115, 22, 0.12)", color: "var(--accent-orange)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <Compass size={40} />
        </div>
        <div style={{ fontSize: "3.5rem", fontWeight: 900, fontFamily: "var(--font-mono)", color: "var(--accent-orange)", lineHeight: 1 }}>
          404
        </div>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, textTransform: "uppercase", margin: "16px 0 12px" }}>
          Drop Not Found
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "32px" }}>
          The streetwear silhouette or page you requested does not exist or has been relocated to an archived drop.
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/" className="btn-secondary">
            Return Home
          </Link>
          <Link to="/shop" className="btn-primary">
            Explore All Drops <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
