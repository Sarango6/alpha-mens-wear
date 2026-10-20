import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured"); // featured, price-asc, price-desc, rating
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedGsm, setSelectedGsm] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Size filter
      if (selectedSize !== "all" && !item.sizes.includes(selectedSize)) {
        return false;
      }
      // GSM filter
      if (selectedGsm !== "all" && !item.gsm.includes(selectedGsm)) {
        return false;
      }
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.categoryName.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedSize, selectedGsm, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSize("all");
    setSelectedGsm("all");
    setSearchQuery("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSize !== "all" ||
    selectedGsm !== "all" ||
    searchQuery !== "";

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">
        {/* Header Breadcrumbs & Title */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / Shop All Drops
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
            ALL STREETWEAR DROPS
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
            Engineered heavyweight streetwear. Showing {filteredProducts.length} silhouettes.
          </p>
        </div>

        {/* Filter & Sorting Control Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-md)",
            padding: "16px 20px",
            marginBottom: "36px"
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", maxWidth: "100%", paddingBottom: "4px" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  background: selectedCategory === cat.id ? "var(--text-white)" : "rgba(255, 255, 255, 0.04)",
                  color: selectedCategory === cat.id ? "var(--bg-dark)" : "var(--text-secondary)",
                  border: "1px solid",
                  borderColor: selectedCategory === cat.id ? "var(--text-white)" : "var(--border-light)",
                  transition: "all var(--transition-fast)"
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & Quick Filter Dropdowns */}
          <div className="flex items-center gap-3" style={{ flexWrap: "wrap" }}>
            {/* Size Filter */}
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="input-dark"
              style={{ width: "auto", padding: "6px 12px", fontSize: "0.8rem" }}
              aria-label="Filter by Size"
            >
              <option value="all">All Sizes</option>
              <option value="S">Size S</option>
              <option value="M">Size M</option>
              <option value="L">Size L</option>
              <option value="XL">Size XL</option>
              <option value="XXL">Size XXL</option>
            </select>

            {/* GSM Filter */}
            <select
              value={selectedGsm}
              onChange={(e) => setSelectedGsm(e.target.value)}
              className="input-dark"
              style={{ width: "auto", padding: "6px 12px", fontSize: "0.8rem" }}
              aria-label="Filter by GSM Weight"
            >
              <option value="all">All Weights</option>
              <option value="240 GSM">240 GSM</option>
              <option value="260 GSM">260 GSM</option>
              <option value="380 GSM">380 GSM</option>
              <option value="400 GSM">400 GSM</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-dark"
              style={{ width: "auto", padding: "6px 12px", fontSize: "0.8rem" }}
              aria-label="Sort products"
            >
              <option value="featured">Featured Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                style={{
                  fontSize: "0.78rem",
                  color: "var(--accent-orange)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  border: "1px dashed rgba(249, 115, 22, 0.4)"
                }}
              >
                <X size={14} /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", marginBottom: "8px" }}>
              No Streetwear Drops Match Your Filter
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "20px" }}>
              Try adjusting your size or category selection.
            </p>
            <button onClick={resetFilters} className="btn-primary">
              Reset All Filters
            </button>
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
