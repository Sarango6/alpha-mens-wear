import React, { useState } from "react";
import { AlertCircle, X, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

export const WatermarkOverlay = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  // SVG tile with repeating diagonal watermark: "ALPHA MENS • PROTOTYPE • DEMO ONLY"
  // Svg pattern encoded as data URI for maximum performance and seamless infinite tiling
  const watermarkSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'><text x='50%' y='50%' text-anchor='middle' transform='rotate(-22 160 80)' fill='%23888888' fill-opacity='0.18' font-family='system-ui, -apple-system, sans-serif' font-size='12' font-weight='800' letter-spacing='2.5'>ALPHA MENS • PROTOTYPE • DEMO ONLY</text></svg>`;

  return (
    <>
      {/* Fixed Fullscreen Diagonal Watermark Layer */}
      <div
        className="fixed-watermark-overlay"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url("${watermarkSvg}")`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center center",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 1
        }}
      />

      {/* Persistent "PROTOTYPE PREVIEW" corner pill badge */}
      <aside
        className="fixed-prototype-badge-wrap"
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 99999,
          pointerEvents: "auto"
        }}
        aria-label="Prototype Preview Status"
      >
        <button
          onClick={() => setShowInfoModal(true)}
          className="prototype-badge-pill"
          title="Click to view prototype specifications & demo notice"
        >
          <span className="prototype-pulse-dot" />
          <span className="prototype-badge-text">PROTOTYPE PREVIEW</span>
          <span className="prototype-info-icon">?</span>
        </button>
      </aside>

      {/* Interactive Prototype Details Modal */}
      {showInfoModal && (
        <div
          className="prototype-modal-backdrop"
          onClick={() => setShowInfoModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="prototype-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="prototype-modal-header">
              <div className="prototype-modal-title">
                <ShieldAlert className="prototype-alert-icon" size={20} />
                <h3>Alpha Mens — Prototype Notice</h3>
              </div>
              <button
                className="prototype-close-btn"
                onClick={() => setShowInfoModal(false)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="prototype-modal-body">
              <div className="prototype-alert-banner">
                <strong>CLIENT PREVIEW MODE ACTIVE:</strong> This interactive web prototype demonstrates the design language, product architecture, cart mechanics, and simulated checkout flow for the Alpha Menswear startup.
              </div>

              <div className="prototype-spec-list">
                <div className="prototype-spec-item">
                  <CheckCircle2 size={16} className="spec-check" />
                  <div>
                    <strong>Simulated Shopping:</strong> You can add items, select sizes, apply coupons (<code>ALPHA10</code>, <code>DROP200</code>), and complete mock checkout.
                  </div>
                </div>

                <div className="prototype-spec-item">
                  <CheckCircle2 size={16} className="spec-check" />
                  <div>
                    <strong>Zero Real Charges:</strong> No real payments are collected, no OTPs or cards are charged, and no real physical shipments are initiated.
                  </div>
                </div>

                <div className="prototype-spec-item">
                  <CheckCircle2 size={16} className="spec-check" />
                  <div>
                    <strong>Mandatory Watermark:</strong> The full-screen repeating watermark <code>ALPHA MENS • PROTOTYPE • DEMO ONLY</code> is active across all viewports per client review requirements.
                  </div>
                </div>
              </div>

              <div className="prototype-actions">
                <button
                  className="btn-primary w-full"
                  onClick={() => setShowInfoModal(false)}
                >
                  Continue Exploring Prototype
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
