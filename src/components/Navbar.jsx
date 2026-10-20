import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { SearchModal } from "./SearchModal";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <>
      <header className="navbar">
        <div className="container nav-container">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="mobile-menu-btn nav-icon-btn"
            aria-label="Open mobile menu"
          >
            <Menu size={22} />
          </button>

          {/* Brand Logo */}
          <Link to="/" className="nav-logo" aria-label="Alpha Mens Home">
            <span className="nav-logo-mark">▲</span>
            <span>ALPHA MENS</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links" aria-label="Main Navigation">
            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              Shop All
            </NavLink>
            <NavLink
              to="/category/oversized-tshirts"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Oversized Tees
            </NavLink>
            <NavLink
              to="/category/printed-tshirts"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Graphic Tees
            </NavLink>
            <NavLink
              to="/category/hoodies"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Hoodies
            </NavLink>
            <NavLink
              to="/category/bottomwear"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Bottomwear
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              About
            </NavLink>
          </nav>

          {/* Utility Icons */}
          <div className="nav-actions">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="nav-icon-btn"
              aria-label="Search catalog"
              title="Search products"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="nav-icon-btn"
              aria-label="View Wishlist"
              title="Saved items"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="nav-badge-count">{wishlistCount}</span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              className="nav-icon-btn"
              aria-label="Account Profile"
              title="Demo Account"
            >
              <User size={20} />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="nav-icon-btn"
              aria-label="Shopping Bag"
              title="View Cart"
            >
              <ShoppingBag size={20} />
              {totalItemsCount > 0 && (
                <span className="nav-badge-count">{totalItemsCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="mobile-drawer-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="nav-logo"
                style={{ fontSize: "1.2rem" }}
              >
                <span className="nav-logo-mark">▲</span>
                <span>ALPHA MENS</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="prototype-close-btn"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-links">
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
              >
                <span>Shop All Drops</span>
                <ArrowRight size={16} style={{ color: "var(--accent-orange)" }} />
              </Link>
              <Link
                to="/category/oversized-tshirts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
              >
                <span>Oversized T-Shirts</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>240 GSM</span>
              </Link>
              <Link
                to="/category/printed-tshirts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
              >
                <span>Graphic & Printed Tees</span>
              </Link>
              <Link
                to="/category/plain-tshirts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
              >
                <span>Plain Heavyweight Blanks</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>260 GSM</span>
              </Link>
              <Link
                to="/category/hoodies"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
              >
                <span>Heavyweight Hoodies</span>
              </Link>
              <Link
                to="/category/bottomwear"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
              >
                <span>Parachute Cargos & Shorts</span>
              </Link>
              <Link
                to="/category/casual-shirts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
              >
                <span>Textured Waffle Shirts</span>
              </Link>

              <div style={{ margin: "16px 0", borderTop: "1px solid var(--border-light)" }} />

              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
                style={{ fontSize: "0.95rem" }}
              >
                <span>About Alpha Mens</span>
              </Link>
              <Link
                to="/size-guide"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
                style={{ fontSize: "0.95rem" }}
              >
                <span>Official Sizing Guide</span>
              </Link>
              <Link
                to="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
                style={{ fontSize: "0.95rem" }}
              >
                <span>Track Demo Order</span>
              </Link>
              <Link
                to="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
                style={{ fontSize: "0.95rem" }}
              >
                <span>FAQs & Help</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-drawer-link"
                style={{ fontSize: "0.95rem" }}
              >
                <span>Contact Us</span>
              </Link>
            </div>

            <div style={{ padding: "20px", borderTop: "1px solid var(--border-light)", background: "rgba(0,0,0,0.3)" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                ALPHA MENS • CLIENT PREVIEW PROTOTYPE
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
