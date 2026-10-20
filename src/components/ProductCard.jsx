import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState(null);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isFavorited = isInWishlist(product.id);
  const hasSecondaryImage = product.images && product.images.length > 1;

  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors ? product.colors[0] : null;
    addToCart(product, size, defaultColor, 1, true);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="product-image-box" aria-label={`View ${product.name}`}>
        <img
          src={isHovered && hasSecondaryImage ? product.images[1] : product.images[0]}
          alt={product.name}
          className="product-main-img"
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-badge-group">
          {product.badge && (
            <span className={`badge ${product.badge === "BESTSELLER" || product.badge === "HOT" ? "badge-orange" : "badge-dark"}`}>
              {product.badge}
            </span>
          )}
          {product.gsm && (
            <span className="badge badge-dark" style={{ letterSpacing: "0.04em" }}>
              {product.gsm}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`product-wishlist-btn ${isFavorited ? "active" : ""}`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
        </button>

        {/* Quick Add Sizes overlay on hover */}
        <div className="product-quick-add-bar" onClick={(e) => e.preventDefault()}>
          <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginRight: "4px" }}>
            QUICK ADD:
          </span>
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => handleQuickAdd(e, size)}
              className="quick-size-btn"
              title={`Add size ${size}`}
            >
              {size}
            </button>
          ))}
        </div>
      </Link>

      <div className="product-info">
        <div className="product-meta-row">
          <span>{product.categoryName}</span>
          <span>{product.fit}</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>
        </Link>

        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="color-swatches-row">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="color-swatch-dot"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "4px" }}>
              {product.colors.length} {product.colors.length === 1 ? "color" : "colors"}
            </span>
          </div>
        )}

        <div className="product-pricing">
          <span className="product-price">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="product-original-price">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
          {product.discount && (
            <span className="product-discount">{product.discount}</span>
          )}
        </div>
      </div>
    </article>
  );
};
