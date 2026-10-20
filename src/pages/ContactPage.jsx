import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { LEGAL_METADATA } from "../data/policies";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order & Sizing Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all mandatory fields", "error");
      return;
    }
    setSubmitted(true);
    showToast("Support ticket simulated successfully! We will get back within 4 hours.", "success");
  };

  return (
    <div style={{ padding: "40px 0 100px" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / Contact Us
          </div>
          <span className="section-label">Direct Communication</span>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase" }}>
            GET IN TOUCH WITH ALPHA MENS
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
            Our concierge team is here to assist with sizing consultations, orders, and returns.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "40px" }}>
          {/* Contact Details Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-md)", padding: "28px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "20px" }}>
                Alpha Mens Headquarters
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <div className="flex items-start gap-3">
                  <Mail size={18} style={{ color: "var(--accent-orange)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong style={{ color: "#fff", display: "block" }}>Customer Care Email</strong>
                    <span>{LEGAL_METADATA.supportEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} style={{ color: "var(--accent-orange)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong style={{ color: "#fff", display: "block" }}>Phone Helpline (Demo)</strong>
                    <span>{LEGAL_METADATA.supportPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} style={{ color: "var(--accent-orange)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong style={{ color: "#fff", display: "block" }}>Support Operating Hours</strong>
                    <span>{LEGAL_METADATA.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} style={{ color: "var(--accent-orange)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong style={{ color: "#fff", display: "block" }}>Registered Logistics Hub</strong>
                    <span>{LEGAL_METADATA.registeredOffice}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border-light)" }}>
                <a
                  href="#whatsapp-chat"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast("Opening WhatsApp Stylist Support (+91 98765 XXXXX)", "info");
                  }}
                  className="btn-secondary w-full"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                >
                  <MessageSquare size={16} style={{ color: "#25D366" }} /> Chat on WhatsApp (Demo)
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-md)", padding: "32px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>
              Send Us A Message
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "24px" }}>
              Submit your inquiry below. All queries receive a priority response.
            </p>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", color: "#34d399", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
                  Message Received!
                </h4>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
                  Thank you, <strong>{formData.name}</strong>. Your ticket has been assigned to our Alpha Menswear concierge team.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Kabir Malhotra"
                    className="input-dark"
                    required
                  />
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
                      onChange={handleChange}
                      placeholder="e.g. name@example.com"
                      className="input-dark"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 98765 43210"
                      className="input-dark"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Subject Category
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-dark"
                  >
                    <option value="Order & Sizing Inquiry">Sizing & Fit Advice</option>
                    <option value="Track Shipment">Tracking Order Status</option>
                    <option value="Exchange or Return">Exchange / Return Request</option>
                    <option value="Bulk B2B Collaboration">Collaborations / Drops</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                    Message Details *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can our stylist or fulfillment team help you today?"
                    className="input-dark"
                    style={{ resize: "vertical" }}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full" style={{ padding: "16px" }}>
                  <Send size={16} /> Send Support Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
