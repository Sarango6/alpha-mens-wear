import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from "lucide-react";
import { FAQS, FAQ_CATEGORIES } from "../data/faqs";

export const FAQPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState("faq-1");

  const filteredFaqs =
    selectedCategory === "all"
      ? FAQS
      : FAQS.filter((f) => f.category === selectedCategory);

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div style={{ padding: "40px 0 100px" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / Frequently Asked Questions
          </div>
          <span className="section-label">Assistance Center</span>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase" }}>
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
            Find immediate answers on 240+ GSM heavyweight fabrics, sizing, shipping across India, and our 7-day exchange window.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px", marginBottom: "32px" }}>
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "0.82rem",
                fontWeight: 700,
                whiteSpace: "nowrap",
                background: selectedCategory === cat.id ? "var(--text-white)" : "rgba(255, 255, 255, 0.04)",
                color: selectedCategory === cat.id ? "#000" : "var(--text-secondary)",
                border: "1px solid",
                borderColor: selectedCategory === cat.id ? "var(--text-white)" : "var(--border-light)",
                transition: "all var(--transition-fast)"
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "48px" }}>
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${isExpanded ? "var(--border-medium)" : "var(--border-light)"}`,
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  transition: "all var(--transition-fast)"
                }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 24px",
                    textAlign: "left",
                    color: isExpanded ? "var(--accent-orange)" : "#ffffff",
                    fontSize: "0.95rem",
                    fontWeight: 700
                  }}
                >
                  <span>{faq.question}</span>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isExpanded && (
                  <div
                    style={{
                      padding: "0 24px 20px",
                      color: "var(--text-secondary)",
                      fontSize: "0.88rem",
                      lineHeight: 1.7,
                      borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                      paddingTop: "14px"
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-md)",
            padding: "28px",
            textAlign: "center"
          }}
        >
          <HelpCircle size={32} style={{ color: "var(--accent-orange)", margin: "0 auto 12px" }} />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>
            Still Need Sizing Or Delivery Clarification?
          </h3>
          <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", marginBottom: "20px" }}>
            Our Alpha Menswear customer concierge is on standby to help you pick the right fit.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Support Concierge <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
