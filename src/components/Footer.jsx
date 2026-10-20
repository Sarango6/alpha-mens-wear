import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin, ShieldCheck, ExternalLink } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { LEGAL_METADATA } from "../data/policies";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    showToast("VIP Access Granted! Use code 'ALPHA10' for 10% off your first drop.", "success", 5000);
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <Link to="/" className="nav-logo" style={{ marginBottom: "16px" }}>
              <span className="nav-logo-mark">▲</span>
              <span>ALPHA MENS</span>
            </Link>
            <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px", maxWidth: "340px" }}>
              Engineered heavyweight streetwear for the modern man. Built with 240+ GSM bio-washed French Terry cotton, drop-shoulder cuts, and enduring durability.
            </p>

            <form onSubmit={handleNewsletterSubmit} style={{ maxWidth: "340px" }}>
              <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--accent-orange)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Join the Alpha Brotherhood // 10% Off
              </span>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-dark"
                  style={{ fontSize: "0.82rem" }}
                  required
                />
                <button type="submit" className="btn-primary" style={{ padding: "0 16px" }}>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li>
                <Link to="/shop" className="footer-link">Shop All Drops</Link>
              </li>
              <li>
                <Link to="/category/oversized-tshirts" className="footer-link">240 GSM Oversized Tees</Link>
              </li>
              <li>
                <Link to="/category/printed-tshirts" className="footer-link">Graphic & Puff Tees</Link>
              </li>
              <li>
                <Link to="/category/plain-tshirts" className="footer-link">260 GSM Minimalist Blanks</Link>
              </li>
              <li>
                <Link to="/category/hoodies" className="footer-link">380-400 GSM Hoodies</Link>
              </li>
              <li>
                <Link to="/category/bottomwear" className="footer-link">Parachute Cargos & Shorts</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Help */}
          <div>
            <h4 className="footer-heading">Assistance</h4>
            <ul className="footer-links">
              <li>
                <Link to="/track-order" className="footer-link">Track Demo Order</Link>
              </li>
              <li>
                <Link to="/size-guide" className="footer-link">Official Size Guide</Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About Alpha Mens</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact Customer Care</Link>
              </li>
              <li>
                <Link to="/account" className="footer-link">Demo Customer Account</Link>
              </li>
            </ul>
          </div>

          {/* Startup Policies & Legal */}
          <div>
            <h4 className="footer-heading">Legal & Policies</h4>
            <ul className="footer-links">
              <li>
                <Link to="/policies/shipping" className="footer-link">Shipping & Delivery Policy</Link>
              </li>
              <li>
                <Link to="/policies/returns" className="footer-link">7-Day Return & Exchange</Link>
              </li>
              <li>
                <Link to="/policies/privacy" className="footer-link">Privacy & Data Handling</Link>
              </li>
              <li>
                <Link to="/policies/terms" className="footer-link">Terms of Sale & Use</Link>
              </li>
              <li>
                <Link to="/policies/cancellation" className="footer-link">Cancellation Policy</Link>
              </li>
            </ul>

            <div style={{ marginTop: "24px", fontSize: "0.76rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              <div>{LEGAL_METADATA.legalEntity}</div>
              <div>GSTIN: {LEGAL_METADATA.gstin}</div>
              <div>Support: {LEGAL_METADATA.supportEmail}</div>
            </div>
          </div>
        </div>

        {/* Prototype Legal Disclaimer Notice Box */}
        <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px dashed rgba(249, 115, 22, 0.3)", borderRadius: "var(--radius-md)", padding: "16px 20px", marginBottom: "32px", fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <ShieldCheck size={18} style={{ color: "var(--accent-orange)", flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong style={{ color: "#ffffff" }}>CLIENT PROTOTYPE NOTICE & DISCLAIMER:</strong> This website is an interactive front-end prototype engineered for Alpha Mens. All product specs, prices in INR, reviews, order confirmation numbers, and tracking statuses are illustrative mock data. No real monetary transactions or order dispatches occur on this preview build.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {LEGAL_METADATA.brandName} (PROTOTYPE DEMO). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.74rem", color: "var(--accent-orange)" }}>
              WATERMARK ACTIVE: DEMO ONLY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
