import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, RefreshCw, Feather, Star, CheckCircle, Flame, Sparkles } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { SAMPLE_REVIEWS, REVIEW_STATS } from "../data/reviews";
import { ProductCard } from "../components/ProductCard";

export const HomePage = () => {
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const oversizedTees = PRODUCTS.filter((p) => p.category === "oversized-tshirts").slice(0, 4);

  return (
    <div className="homepage-wrapper">
      {/* 1. HERO BANNER */}
      <section className="hero-section">
        <div className="hero-bg-wrapper">
          <img
            src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1920&q=85"
            alt="Alpha Mens Heavyweight Streetwear"
            className="hero-bg-image"
          />
          <div className="hero-overlay-gradient" />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <div className="hero-content">
            <div className="hero-tag">
              <Sparkles size={14} />
              <span>DROP 04 // ENGINEERED STREETWEAR</span>
            </div>

            <h1 className="hero-title">
              HEAVYWEIGHT <span>BOXY</span> ESSENTIALS.
            </h1>

            <p className="hero-subtitle">
              Crafted from 240+ GSM bio-washed French Terry cotton. Built with structural drop-shoulder silhouettes and zero collar sag.
            </p>

            <div className="hero-actions">
              <Link to="/category/oversized-tshirts" className="btn-primary">
                Shop Oversized Tees <ArrowRight size={16} />
              </Link>
              <Link to="/shop" className="btn-secondary">
                Explore All Drops
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES BAR */}
      <section className="hero-trust-bar">
        <div className="container">
          <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            <div className="trust-item">
              <div className="trust-icon">
                <Truck size={20} />
              </div>
              <div className="trust-text">
                <h4>Free Shipping Over ₹999</h4>
                <p>Express air courier across 19,000+ PIN codes</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <Feather size={20} />
              </div>
              <div className="trust-text">
                <h4>240–260 GSM Heavyweight</h4>
                <p>100% Super combed ringspun cotton</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <RefreshCw size={20} />
              </div>
              <div className="trust-text">
                <h4>7-Day Easy Exchange</h4>
                <p>Hassle-free doorstep reverse pickup</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <Shield size={20} />
              </div>
              <div className="trust-text">
                <h4>Cash on Delivery Available</h4>
                <p>Verify parcel at your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-label">Fresh Off The Loom</span>
              <h2 className="section-title">New Arrivals // Drop 04</h2>
              <p className="section-subtitle">
                The latest heavyweight additions featuring mineral acid washes and 3D tactile puff printing.
              </p>
            </div>
            <Link to="/shop" className="view-all-link">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CATEGORY TILES SHOWCASE */}
      <section style={{ padding: "40px 0 80px", background: "#0c0d10" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-label">Curated Silhouettes</span>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">
                Explore dedicated drops engineered for supreme drape and daily durability.
              </p>
            </div>
          </div>

          <div className="category-grid">
            {CATEGORIES.filter((c) => c.id !== "all").slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="category-tile">
                <img src={cat.image} alt={cat.name} className="category-tile-bg" />
                <div className="category-tile-gradient" />
                <div className="category-tile-content">
                  <div className="category-tile-count">{cat.count} Products Available</div>
                  <h3 className="category-tile-title">{cat.name}</h3>
                  <div className="category-tile-link">
                    Explore Drop <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-label">Most Wanted Streetwear</span>
              <h2 className="section-title">Best Sellers</h2>
              <p className="section-subtitle">
                Proven silhouettes backed by over 800+ five-star verified customer ratings.
              </p>
            </div>
            <Link to="/shop" className="view-all-link">
              Explore All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROMOTIONAL BANNER (The Heavyweight Revolution) */}
      <section className="container">
        <div className="promo-banner">
          <div className="promo-banner-glow" />
          <div className="promo-grid">
            <div>
              <span className="badge badge-orange" style={{ marginBottom: "16px" }}>
                SIGNATURE FABRIC TECH
              </span>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "16px" }}>
                THE HEAVYWEIGHT REVOLUTION: <span style={{ color: "var(--accent-orange)" }}>260 GSM</span>
              </h2>
              <p style={{ color: "#d4d4d8", fontSize: "1rem", lineHeight: 1.7, marginBottom: "28px" }}>
                Fast-fashion t-shirts weigh 150 GSM. They cling, turn transparent, and deform in the collar.
                Alpha Mens designs in heavyweight 240–260 GSM interlock fabric with lycra-reinforced necklines.
                Zero see-through, sculptural drape, and permanent shape retention.
              </p>
              <div className="flex gap-4" style={{ flexWrap: "wrap" }}>
                <Link to="/category/plain-tshirts" className="btn-primary">
                  Shop Heavyweight Blanks <ArrowRight size={16} />
                </Link>
                <Link to="/size-guide" className="btn-secondary">
                  Check Sizing Guide
                </Link>
              </div>
            </div>

            <div style={{ position: "relative", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-medium)" }}>
              <img
                src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
                alt="260 GSM Heavyweight T-Shirt drape"
                style={{ width: "100%", height: "360px", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", bottom: "16px", left: "16px", background: "rgba(10, 10, 12, 0.9)", padding: "8px 14px", borderRadius: "4px", fontSize: "0.75rem", fontFamily: "var(--font-mono)", border: "1px solid var(--border-light)" }}>
                OBSIDIAN 260 GSM // BOXY CUT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BRAND STORY SECTION */}
      <section style={{ padding: "60px 0 80px", background: "#0a0b0e" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
            <div>
              <span className="section-label">The Alpha Mens Ethos</span>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.2, marginBottom: "20px" }}>
                REJECT MEDIOCRE FAST FASHION.
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "18px" }}>
                Alpha Mens was founded with one clear obsession: engineering the ultimate heavyweight streetwear silhouettes for Indian men. We refused to compromise on flimsy fabrics, peeling graphic prints, or bacon-necked collars.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "28px" }}>
                Every single garment is crafted from 100% super-combed cotton, bio-washed with natural silicone enzymes for extraordinary softness, and tailored with dropped shoulders to complement an athletic, masculine frame.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ borderLeft: "2px solid var(--accent-orange)", paddingLeft: "16px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", fontFamily: "var(--font-mono)" }}>
                    240+ GSM
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Minimum Cotton Density
                  </div>
                </div>

                <div style={{ borderLeft: "2px solid var(--accent-orange)", paddingLeft: "16px" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", fontFamily: "var(--font-mono)" }}>
                    50+ WASH
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Collar Shape Guarantee
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <img
                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"
                alt="Alpha Mens Detail"
                style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "var(--radius-sm)" }}
              />
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
                alt="Alpha Mens Streetwear"
                style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "var(--radius-sm)", marginTop: "24px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS (SAMPLE CONTENT) */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", justifyContent: "center" }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <span className="section-label">Verified Brotherhood</span>
              <h2 className="section-title">Customer Reviews</h2>
              <div className="flex items-center justify-center gap-2" style={{ marginTop: "8px" }}>
                <div className="flex" style={{ color: "var(--accent-orange)" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <span style={{ fontWeight: 800, color: "#fff" }}>4.88 / 5.0</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  ({REVIEW_STATS.totalReviews} Verified Demo Ratings)
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "36px" }}>
            {SAMPLE_REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "12px" }}>
                  <div className="flex" style={{ color: "var(--accent-orange)" }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {review.date}
                  </span>
                </div>

                <h4 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                  "{review.title}"
                </h4>

                <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px", flex: 1 }}>
                  {review.comment}
                </p>

                <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div className="flex items-center gap-1" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff" }}>
                      <span>{review.author}</span>
                      <CheckCircle size={14} style={{ color: "#34d399" }} title="Verified Buyer" />
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {review.city} • {review.sizePurchased}
                    </div>
                  </div>
                  <span className="badge badge-dark" style={{ fontSize: "0.65rem" }}>
                    VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "32px", fontSize: "0.76rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            SAMPLE CUSTOMER REVIEWS DISPLAYED FOR PROTOTYPE DEMONSTRATION
          </div>
        </div>
      </section>
    </div>
  );
};
