import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

// Components
import { WatermarkOverlay } from "./components/WatermarkOverlay";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

// Pages
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { WishlistPage } from "./pages/WishlistPage";
import { SearchPage } from "./pages/SearchPage";
import { TrackOrderPage } from "./pages/TrackOrderPage";
import { AccountPage } from "./pages/AccountPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { FAQPage } from "./pages/FAQPage";
import { SizeGuidePage } from "./pages/SizeGuidePage";
import { PolicyPage } from "./pages/PolicyPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            {/* MANDATORY FULLSCREEN WATERMARK & PERSISTENT PREVIEW BADGE */}
            <WatermarkOverlay />

            <div className="site-layout flex flex-col min-h-screen">
              <AnnouncementBar />
              <Navbar />
              <CartDrawer />
              <WhatsAppButton />

              <main className="site-main flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/size-guide" element={<SizeGuidePage />} />
                  <Route path="/track-order" element={<TrackOrderPage />} />
                  <Route path="/account" element={<AccountPage />} />

                  {/* Policies */}
                  <Route path="/policies/shipping" element={<PolicyPage policyKey="shipping" />} />
                  <Route path="/policies/returns" element={<PolicyPage policyKey="returns" />} />
                  <Route path="/policies/privacy" element={<PolicyPage policyKey="privacy" />} />
                  <Route path="/policies/terms" element={<PolicyPage policyKey="terms" />} />
                  <Route path="/policies/cancellation" element={<PolicyPage policyKey="cancellation" />} />
                  <Route path="/policies/:policyType" element={<PolicyPage />} />

                  {/* 404 Fallback */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
