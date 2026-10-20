import React, { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!query.trim()) return PRODUCTS;
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.gsm.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fit.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / Search Results
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase" }}>
            SEARCH: "{query}"
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
            Showing {results.length} results matching your search terms.
          </p>
        </div>

        {results.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--bg-card)", borderRadius: "var(--radius-md)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>
              No Streetwear Drops Found For "{query}"
            </h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
              Try searching for terms like "240 GSM", "Oversized", "Acid Wash", or "Hoodie".
            </p>
            <Link to="/shop" className="btn-primary">
              Browse All Drops <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
