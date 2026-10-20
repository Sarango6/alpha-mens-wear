import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  Truck,
  Shield,
  RefreshCw,
  Heart,
  Share2,
  Ruler,
  Check,
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react";
import { PRODUCTS, PINCODE_DATABASE } from "../data/products";
import { SAMPLE_REVIEWS, REVIEW_STATS } from "../data/reviews";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { SizeGuideModal } from "../components/SizeGuideModal";
import { ProductCard } from "../components/ProductCard";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState("fabric"); // 'fabric', 'fit', 'care', 'shipping'

  // Pincode Checker
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);

  // Validation shake
  const [shakeSize, setShakeSize] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setSelectedSize("");
    setSelectedColor(product.colors ? product.colors[0] : null);
    setQuantity(1);
    setPincodeResult(null);
  }, [id, product]);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShakeSize(true);
      showToast("Please choose a size first", "error");
      setTimeout(() => setShakeSize(false), 800);
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity, true);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShakeSize(true);
      showToast("Please choose a size first to proceed", "error");
      setTimeout(() => setShakeSize(false), 800);
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity, false);
    navigate("/checkout");
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      showToast("Please enter a valid 6-digit Indian PIN code", "error");
      return;
    }
    setIsCheckingPincode(true);
    setTimeout(() => {
      setIsCheckingPincode(false);
      const match = PINCODE_DATABASE[pincode];
      if (match) {
        setPincodeResult({
          valid: true,
          city: match.city,
          state: match.state,
          days: match.days,
          cod: match.cod
        });
      } else {
        setPincodeResult({
          valid: true,
          city: "Express Destination",
          state: "India",
          days: "3-5 Business Days",
          cod: true
        });
      }
    }, 450);
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? "" : name);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const fallbackRelated = relatedProducts.length > 0 ? relatedProducts : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div style={{ padding: "30px 0 80px" }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.78rem",
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            marginBottom: "24px"
          }}
        >
          <Link to="/" style={{ color: "var(--text-secondary)" }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: "var(--text-secondary)" }}>Shop</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} style={{ color: "var(--text-secondary)" }}>
            {product.categoryName}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--accent-orange)" }}>{product.name}</span>
        </nav>

        {/* Main PDP Grid */}
        <div className="pdp-grid">
          {/* LEFT: MULTI-IMAGE GALLERY */}
          <div className="pdp-gallery-wrap">
            {/* Vertical Thumbnails */}
            <div className="pdp-thumbnails">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`pdp-thumb-btn ${activeImageIndex === idx ? "active" : ""}`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>

            {/* Main Image Stage */}
            <div className="pdp-main-image-box">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="pdp-main-img"
              />

              {/* Badges */}
              <div className="product-badge-group">
                {product.badge && (
                  <span className="badge badge-orange">{product.badge}</span>
                )}
                <span className="badge badge-dark">{product.gsm}</span>
              </div>

              {/* Click to Zoom Trigger */}
              <button
                onClick={() => setIsZoomOpen(true)}
                className="pdp-zoom-btn"
                aria-label="Enlarge image preview"
              >
                <Maximize2 size={14} />
                <span>Enlarge</span>
              </button>
            </div>
          </div>

          {/* RIGHT: PRODUCT DETAILS & ACTIONS */}
          <div className="pdp-details-wrap">
            {/* Category & Fit */}
            <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--accent-orange)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {product.categoryName} // {product.fit}
              </span>
              <div className="flex items-center gap-1" style={{ fontSize: "0.82rem", color: "var(--accent-orange)" }}>
                <Star size={14} fill="currentColor" />
                <span style={{ fontWeight: 800, color: "#fff" }}>{product.rating}</span>
                <span style={{ color: "var(--text-muted)" }}>({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "14px", textTransform: "uppercase" }}>
              {product.name}
            </h1>

            {/* Pricing Section */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "1.85rem", fontWeight: 800, color: "#ffffff" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span style={{ fontSize: "1.1rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="badge badge-orange" style={{ fontSize: "0.78rem", padding: "4px 8px" }}>
                {product.discount}
              </span>
            </div>

            <p style={{ fontSize: "0.78rem", color: "#34d399", fontWeight: 600, marginBottom: "20px" }}>
              Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")} • Inclusive of all taxes • Free Shipping above ₹999
            </p>

            <div style={{ height: "1px", background: "var(--border-light)", margin: "16px 0" }} />

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: "22px" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "10px" }}>
                  Selected Color:{" "}
                  <strong style={{ color: "#fff" }}>{selectedColor?.name || product.colors[0].name}</strong>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`color-option-btn ${selectedColor?.name === c.name ? "active" : ""}`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select color ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector with Size Guide Link */}
            <div style={{ marginBottom: "24px" }}>
              <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Select Size:{" "}
                  {selectedSize ? (
                    <strong style={{ color: "var(--accent-orange)" }}>{selectedSize}</strong>
                  ) : (
                    <span style={{ color: "var(--accent-orange)" }}>(Please choose)</span>
                  )}
                </div>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--accent-orange)",
                    textDecoration: "underline"
                  }}
                >
                  <Ruler size={14} /> Size Guide
                </button>
              </div>

              {/* Size Buttons Grid */}
              <div
                className="flex gap-2"
                style={{
                  flexWrap: "wrap",
                  animation: shakeSize ? "shake 0.4s cubic-bezier(.36,.07,.19,.97) both" : "none"
                }}
              >
                {product.sizes.map((s) => {
                  const stockLeft = product.stock ? product.stock[s] : null;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`size-pill-btn ${selectedSize === s ? "active" : ""}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              {/* Real-time stock status indicator */}
              {selectedSize && product.stock && product.stock[selectedSize] !== undefined && (
                <div style={{ marginTop: "10px", fontSize: "0.76rem", display: "flex", alignItems: "center", gap: "6px" }}>
                  {product.stock[selectedSize] <= 3 ? (
                    <span style={{ color: "var(--accent-orange)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                      <AlertCircle size={14} /> Only {product.stock[selectedSize]} pieces left in {selectedSize} — selling fast!
                    </span>
                  ) : (
                    <span style={{ color: "#34d399", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Check size={14} /> In Stock ({product.stock[selectedSize]} units available in {selectedSize})
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4" style={{ marginBottom: "24px" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                Quantity:
              </span>
              <div className="cart-qty-control" style={{ padding: "4px" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="cart-qty-btn"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="cart-qty-val">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="cart-qty-btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs: Add to Bag & Buy Now */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <button onClick={handleAddToCart} className="btn-secondary w-full" style={{ padding: "16px" }}>
                Add to Bag
              </button>
              <button onClick={handleBuyNow} className="btn-primary w-full" style={{ padding: "16px" }}>
                Buy Now
              </button>
            </div>

            {/* Wishlist and Share */}
            <div className="flex items-center gap-4" style={{ marginBottom: "28px" }}>
              <button
                onClick={() => toggleWishlist(product)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.82rem",
                  color: isFavorited ? "var(--accent-orange)" : "var(--text-secondary)",
                  fontWeight: 600
                }}
              >
                <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
                <span>{isFavorited ? "Saved in Wishlist" : "Save to Wishlist"}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast("Product link copied to clipboard", "success");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                  fontWeight: 600
                }}
              >
                <Share2 size={15} />
                <span>Share Silhouette</span>
              </button>
            </div>

            {/* PINCODE DELIVERY CHECKER */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "18px",
                marginBottom: "28px"
              }}
            >
              <div className="flex items-center gap-2" style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>
                <Truck size={16} style={{ color: "var(--accent-orange)" }} />
                <span>Delivery & COD Availability Checker</span>
              </div>

              <form onSubmit={handlePincodeCheck} style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit Indian PIN code (e.g. 110001)"
                  className="input-dark"
                  style={{ fontSize: "0.85rem" }}
                />
                <button
                  type="submit"
                  disabled={isCheckingPincode}
                  className="btn-secondary"
                  style={{ padding: "0 18px", fontSize: "0.82rem", whiteSpace: "nowrap" }}
                >
                  {isCheckingPincode ? "Checking..." : "Check"}
                </button>
              </form>

              {pincodeResult && (
                <div style={{ marginTop: "12px", fontSize: "0.82rem", color: "#34d399", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div className="flex items-center gap-2">
                    <Check size={14} />
                    <span>
                      Delivery available to <strong>{pincodeResult.city}, {pincodeResult.state}</strong>
                    </span>
                  </div>
                  <div style={{ color: "var(--text-secondary)", paddingLeft: "22px", fontSize: "0.78rem" }}>
                    • Estimated delivery: <strong>{pincodeResult.days}</strong>
                    <br />
                    • Cash on Delivery (COD) supported
                    <br />
                    • Free express shipping on this order
                  </div>
                </div>
              )}
            </div>

            {/* PRODUCT ACCORDIONS (Pronk-style Fabric, Fit, Care, Shipping) */}
            <div style={{ borderTop: "1px solid var(--border-light)" }}>
              {/* Accordion 1: Fabric & Technical Specs */}
              <div className="pdp-accordion-item">
                <button
                  onClick={() => toggleAccordion("fabric")}
                  className="pdp-accordion-header"
                >
                  <span>Fabric & Engineering</span>
                  {openAccordion === "fabric" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === "fabric" && (
                  <div className="pdp-accordion-content">
                    <p style={{ marginBottom: "12px" }}>{product.description}</p>
                    <ul style={{ paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {product.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fit & Model Dimensions */}
              <div className="pdp-accordion-item">
                <button
                  onClick={() => toggleAccordion("fit")}
                  className="pdp-accordion-header"
                >
                  <span>Fit & Model Reference</span>
                  {openAccordion === "fit" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === "fit" && (
                  <div className="pdp-accordion-content">
                    <p style={{ marginBottom: "8px" }}>
                      <strong>Fit Architecture:</strong> {product.fit} with dropped shoulders, wide sleeves, and a boxy trunk cut.
                    </p>
                    <p style={{ color: "var(--text-muted)" }}>
                      {product.modelInfo}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Wash & Garment Care */}
              <div className="pdp-accordion-item">
                <button
                  onClick={() => toggleAccordion("care")}
                  className="pdp-accordion-header"
                >
                  <span>Wash & Care Guidelines</span>
                  {openAccordion === "care" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === "care" && (
                  <div className="pdp-accordion-content">
                    <ul style={{ paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <li>Machine wash cold with like colors (inside-out recommended).</li>
                      <li>Do not iron directly over high-density screen or 3D puff prints.</li>
                      <li>Tumble dry low or dry flat in shade to maintain silicone finish.</li>
                      <li>Avoid chlorine bleaches or harsh spot detergents.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 4: Shipping, Returns & Exchanges */}
              <div className="pdp-accordion-item">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="pdp-accordion-header"
                >
                  <span>Shipping & Hassle-Free Returns</span>
                  {openAccordion === "shipping" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === "shipping" && (
                  <div className="pdp-accordion-content">
                    <p style={{ marginBottom: "8px" }}>
                      • <strong>Express Delivery:</strong> Metro destinations in 2-3 business days.
                    </p>
                    <p style={{ marginBottom: "8px" }}>
                      • <strong>7-Day Doorstep Exchange:</strong> Free reverse pickup if you need a different size or fit.
                    </p>
                    <p>
                      • <strong>Prepaid & COD:</strong> Secure checkout with UPI, Cards, NetBanking, and Cash on Delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOMER REVIEWS & BREAKDOWN SECTION */}
        <section style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid var(--border-light)" }}>
          <div className="section-header">
            <div>
              <span className="section-label">Verified Feedback</span>
              <h2 className="section-title">Customer Reviews ({product.reviewsCount})</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "var(--accent-orange)" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>
                {product.rating} / 5.0
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {SAMPLE_REVIEWS.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px"
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
                  <div className="flex" style={{ color: "var(--accent-orange)" }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>{rev.date}</span>
                </div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                  "{rev.title}"
                </h4>
                <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "14px" }}>
                  {rev.comment}
                </p>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  <strong style={{ color: "#fff" }}>{rev.author}</strong> ({rev.city}) • {rev.sizePurchased}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section style={{ marginTop: "80px" }}>
          <div className="section-header">
            <div>
              <span className="section-label">Complete The Fit</span>
              <h2 className="section-title">Related Silhouettes</h2>
            </div>
            <Link to="/shop" className="view-all-link">
              View All <ChevronDown size={14} style={{ transform: "rotate(-90deg)" }} />
            </Link>
          </div>

          <div className="product-grid">
            {fallbackRelated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* SIZE GUIDE MODAL */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

      {/* ENLARGED IMAGE ZOOM MODAL */}
      {isZoomOpen && (
        <div
          className="prototype-modal-backdrop"
          onClick={() => setIsZoomOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            style={{
              position: "relative",
              maxWidth: "900px",
              width: "95%",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#000",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "1px solid var(--border-medium)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomOpen(false)}
              className="prototype-close-btn"
              style={{ position: "absolute", top: "16px", right: "16px", zIndex: 10, background: "rgba(0,0,0,0.7)" }}
              aria-label="Close zoom preview"
            >
              <X size={24} />
            </button>
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              style={{ width: "100%", maxHeight: "85vh", objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
