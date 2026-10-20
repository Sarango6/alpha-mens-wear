import React from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";

export const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "500px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.04)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--accent-orange)" }}>
            <Heart size={36} />
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "12px" }}>
            Your Wishlist is Empty
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: "32px", lineHeight: 1.6 }}>
            Tap the heart icon on any oversized t-shirt or hoodie to save your favorite streetwear drops for later.
          </p>
          <Link to="/shop" className="btn-primary">
            Explore All Drops <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container">
        {/* Header Breadcrumbs */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
            Home / Wishlist
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase" }}>
            SAVED SILHOUETTES ({wishlistItems.length})
          </h1>
        </div>

        <div className="product-grid">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
