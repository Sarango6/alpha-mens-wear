import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export const CategoryPage = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("featured");
  const [selectedSize, setSelectedSize] = useState("all");

  const categoryInfo = CATEGORIES.find((c) => c.slug === slug) || {
    id: slug,
    name: slug.replace(/-/g, " ").toUpperCase(),
    description: "Engineered streetwear collection."
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (item.category !== slug && item.category !== categoryInfo.id) {
        return false;
      }
      if (selectedSize !== "all" && !item.sizes.includes(selectedSize)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [slug, categoryInfo.id, selectedSize, sortBy]);

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "16px" }}>
          <Link to="/" style={{ color: "var(--text-secondary)" }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: "var(--text-secondary)" }}>Shop</Link>
          <span>/</span>
          <span style={{ color: "var(--accent-orange)" }}>{categoryInfo.name}</span>
        </div>

        {/* Category Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", marginBottom: "36px", borderBottom: "1px solid var(--border-light)", paddingBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase" }}>
              {categoryInfo.name}
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px", maxWidth: "600px" }}>
              {categoryInfo.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="input-dark"
              style={{ width: "auto", padding: "8px 14px", fontSize: "0.82rem" }}
              aria-label="Filter by Size"
            >
              <option value="all">All Sizes</option>
              <option value="S">Size S</option>
              <option value="M">Size M</option>
              <option value="L">Size L</option>
              <option value="XL">Size XL</option>
              <option value="XXL">Size XXL</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-dark"
              style={{ width: "auto", padding: "8px 14px", fontSize: "0.82rem" }}
              aria-label="Sort category items"
            >
              <option value="featured">Featured Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "var(--bg-card)", borderRadius: "var(--radius-md)" }}>
            <p style={{ color: "var(--text-muted)" }}>No products found in this category.</p>
            <Link to="/shop" className="btn-primary" style={{ marginTop: "16px" }}>
              Browse All Drops
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
