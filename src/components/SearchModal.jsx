import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS } from "../data/products";

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          p.gsm.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleQuickTagClick = (tag) => {
    setQuery(tag);
  };

  return (
    <div className="prototype-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="prototype-modal-card"
        style={{ maxWidth: "680px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="prototype-modal-header">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 w-full">
            <Search size={20} className="prototype-alert-icon" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search heavyweight tees, hoodies, cargos..."
              className="input-dark"
              style={{ fontSize: "1rem", border: "none", background: "transparent", padding: "8px 0" }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="prototype-close-btn"
              >
                <X size={16} />
              </button>
            )}
          </form>
          <button onClick={onClose} className="prototype-close-btn" aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        <div className="prototype-modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {/* Quick Search Tags */}
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase" }}>
              Popular Streetwear Searches:
            </span>
            <div className="flex gap-2" style={{ flexWrap: "wrap", marginTop: "8px" }}>
              {["240 GSM", "Oversized Tees", "Acid Wash", "Hoodies", "Cargos", "Boxy Blanks"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickTagClick(tag)}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--border-light)",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)"
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          {query.trim() && (
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {filtered.length} products found
                </span>
                {filtered.length > 0 && (
                  <button
                    onClick={handleSearchSubmit}
                    style={{ fontSize: "0.8rem", color: "var(--accent-orange)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    View all results <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
                  <p>No products matching "{query}".</p>
                  <p style={{ fontSize: "0.82rem", marginTop: "6px" }}>Try searching for "Oversized", "Hoodie", or "240 GSM"</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {filtered.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "10px",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid var(--border-light)",
                        transition: "all var(--transition-fast)"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-medium)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-light)")}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{ width: "54px", height: "68px", objectFit: "cover", borderRadius: "4px" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--accent-orange)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                          {product.categoryName} • {product.gsm}
                        </div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff", marginTop: "2px" }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff", marginTop: "4px" }}>
                          ₹{product.price.toLocaleString("en-IN")}{" "}
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textDecoration: "line-through", fontWeight: 400 }}>
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={16} style={{ color: "var(--text-muted)" }} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
