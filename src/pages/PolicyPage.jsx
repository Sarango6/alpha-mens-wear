import React from "react";
import { useParams, Link } from "react-router-dom";
import { ShieldAlert, FileText, ChevronRight, CheckCircle2 } from "lucide-react";
import { POLICIES, LEGAL_METADATA } from "../data/policies";

export const PolicyPage = ({ policyKey: propPolicyKey }) => {
  const { policyType } = useParams();
  const activeKey = propPolicyKey || policyType || "shipping";

  const policy = POLICIES[activeKey] || POLICIES.shipping;

  const policyLinks = [
    { key: "shipping", label: "Shipping & Delivery", to: "/policies/shipping" },
    { key: "returns", label: "Returns & Exchanges", to: "/policies/returns" },
    { key: "terms", label: "Terms of Use & Sale", to: "/policies/terms" },
    { key: "privacy", label: "Privacy Policy", to: "/policies/privacy" },
    { key: "cancellation", label: "Cancellation Policy", to: "/policies/cancellation" }
  ];

  return (
    <div style={{ padding: "40px 0 100px" }}>
      <div className="container" style={{ maxWidth: "1020px" }}>
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / Business Policies / {policy.title}
          </div>
          <span className="section-label">Legal Framework & Policies</span>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase" }}>
            {policy.title}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
            {policy.summary}
          </p>
        </div>

        {/* MANDATORY LEGAL DRAFT NOTICE */}
        <div
          style={{
            background: "rgba(249, 115, 22, 0.08)",
            border: "1px dashed rgba(249, 115, 22, 0.4)",
            borderRadius: "var(--radius-md)",
            padding: "18px 22px",
            marginBottom: "36px",
            fontSize: "0.82rem",
            color: "#fed7aa",
            display: "flex",
            alignItems: "flex-start",
            gap: "14px"
          }}
        >
          <ShieldAlert size={22} style={{ color: "var(--accent-orange)", flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>
              {LEGAL_METADATA.legalNotice}
            </strong>
            This policy document is prepared as a reference draft for the client demonstration of Alpha Mens ({LEGAL_METADATA.legalEntity}). All company registrations, GSTIN numbers, and operational timelines contained herein are illustrative placeholders that must be finalized and reviewed by competent legal counsel prior to commercial store deployment.
          </div>
        </div>

        {/* Layout: Sidebar with Policy Navigation + Main Text */}
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px", alignItems: "flex-start" }}>
          {/* Policy Navigation Sidebar */}
          <aside style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", padding: "16px", position: "sticky", top: "100px" }}>
            <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", display: "block", padding: "8px 12px 12px" }}>
              All Startup Policies
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {policyLinks.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.84rem",
                    fontWeight: activeKey === item.key ? 700 : 500,
                    background: activeKey === item.key ? "rgba(249, 115, 22, 0.15)" : "transparent",
                    color: activeKey === item.key ? "var(--accent-orange)" : "var(--text-secondary)",
                    border: `1px solid ${activeKey === item.key ? "rgba(249, 115, 22, 0.3)" : "transparent"}`
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={14} />
                </Link>
              ))}
            </div>

            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border-light)", fontSize: "0.74rem", color: "var(--text-muted)", paddingLeft: "8px" }}>
              Version: {LEGAL_METADATA.effectiveDate}
            </div>
          </aside>

          {/* Main Policy Content Card */}
          <article
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-medium)",
              borderRadius: "var(--radius-lg)",
              padding: "36px"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {policy.sections.map((sec, idx) => (
                <div key={idx}>
                  <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "8px" }}>
                    {sec.heading}
                  </h2>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                    {sec.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Legal Placeholder Details Table */}
            <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--border-light)", background: "rgba(0,0,0,0.2)", padding: "20px", borderRadius: "var(--radius-sm)" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, textTransform: "uppercase", color: "#fff", marginBottom: "12px" }}>
                Configurable Business Entity Details (Placeholder)
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                <div>Legal Entity: <strong style={{ color: "#fff" }}>{LEGAL_METADATA.legalEntity}</strong></div>
                <div>GSTIN Placeholder: <strong style={{ color: "#fff" }}>{LEGAL_METADATA.gstin}</strong></div>
                <div>CIN / Registration: <strong style={{ color: "#fff" }}>{LEGAL_METADATA.cin}</strong></div>
                <div>Grievance Officer: <strong style={{ color: "#fff" }}>{LEGAL_METADATA.grievanceOfficer}</strong></div>
                <div>Support Email: <strong style={{ color: "#fff" }}>{LEGAL_METADATA.supportEmail}</strong></div>
                <div>Support Phone: <strong style={{ color: "#fff" }}>{LEGAL_METADATA.supportPhone}</strong></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
