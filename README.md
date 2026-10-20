# ALPHA MENS — E-Commerce Website Prototype

> **Engineered Heavyweight Streetwear // Client Prototype & Interactive Proof-of-Concept**

Welcome to the official frontend prototype for **Alpha Mens**, a modern, masculine, premium streetwear D2C startup brand specializing in 240+ GSM heavyweight oversized t-shirts, boxy essentials, French Terry hoodies, and parachute bottomwear.

---

## ⚡ Prototype Preview & Mandatory Watermark

This project has been built strictly adhering to client evaluation and demonstration safety requirements:

1. **Mandatory Fullscreen Watermark**:
   - A subtle, repeating diagonal pattern (`ALPHA MENS • PROTOTYPE • DEMO ONLY`) is layered across the entire viewport at ~18% opacity.
   - Fixed with an ultra-high z-index (`99998`) and `pointer-events: none` to keep all buttons, links, inputs, and scrolling 100% interactive.
   - Visible across all routes, modals, drawers, and light/dark theme sections.

2. **Persistent "PROTOTYPE PREVIEW" Badge**:
   - Fixed floating status pill in the bottom-right corner with a live pulsing indicator.
   - Clicking opens an interactive **Prototype Specifications Modal** detailing simulated checkout mechanics and safety disclaimers.

3. **Zero Financial Charges & Safe Mock Sandbox**:
   - No real payment gateways or real banking credentials collected.
   - Mock UPI, card, and COD selections with instant simulated order generation and confetti celebration.

---

## 🚀 Key Features Built & Implemented

### 1. Homepage Experience
- **Announcement Bar**: Dynamic cycling promotional banner (Free Shipping on ₹999+, 10% First Drop discount `ALPHA10`).
- **Responsive Navigation**: Brand logotype (`▲ ALPHA MENS`), categories dropdown, live search modal, wishlist counter, account shortcut, and cart drawer count.
- **Streetwear Hero Banner**: High-impact editorial imagery, bold typography, and direct Call-to-Actions.
- **Trust Badges**: Free Shipping, 240+ GSM Combed Cotton, 7-Day Exchange, and Cash on Delivery.
- **Product Grids**: New Arrivals (Drop 04) and Best Sellers with image swap on hover, quick-add size selector, and wishlist bookmarking.
- **Category Showcase**: Interactive tiles for Oversized Tees, Graphic Tees, Blanks, Hoodies, Cargos, and Resort Shirts.
- **Brand Story Section**: The Alpha Mens philosophy — 240+ GSM weight, anti-sag Lycra collars, and dropped shoulders.
- **Customer Reviews**: Testimonials with verified buyer badges, star breakdowns, and fit feedback.
- **Newsletter Subscription**: Interactive email capture with instant discount code reveal (`WELCOME15`).
- **Footer**: Full navigation, legal entity placeholders, and demo disclaimers.

### 2. Product Catalogue (`/shop` & `/category/:slug`)
- 14 realistically spec'd streetwear products with authentic INR pricing and high-definition photography.
- Filter by Category, Size (S, M, L, XL, XXL), Fabric GSM (240 GSM, 260 GSM, 380-400 GSM).
- Dynamic sorting by: Featured Drops, Price Low to High, Price High to Low, Highest Customer Rating.
- Search query matching and active filter tag chips with 1-click reset.

### 3. Flagship Product Details Page (PDP) (`/product/:id`)
- **Multi-Image Gallery**: Vertical thumbnails and main stage with click-to-enlarge lightbox modal.
- **Pricing & Savings**: Real-time discount calculation (`Save ₹1,000 (45% OFF)`).
- **Size Selector**: Dynamic size pill buttons with low-stock alerts (*"Only 2 left in XL!"*) and validation shake if skipped.
- **Color Swatches**: Visual color swatches with active outline indicators.
- **Interactive Size Guide Modal**: Switch between **Inches (")** and **Centimeters (cm)** with measurement tables and model specs.
- **Delivery PIN Code Checker**: Live lookup for 6-digit Indian PIN codes with estimated transit times and COD confirmation.
- **Garment Technical Accordions**: Fabric & Engineering, Fit & Silhouette, Wash & Care, and Shipping & Returns.
- **Customer Reviews**: Star distribution ratings and verified owner reviews.
- **Related Products**: Smart recommendations to complete the streetwear look.

### 4. Shopping Bag & Checkout Flow
- **Slide-Out Cart Drawer**: Accessible from any route with real-time totals, quantity controls, and item removal.
- **Free Shipping Progress Meter**: Dynamic calculation showing exact amount needed to unlock free shipping (`Threshold: ₹999`).
- **Demo Coupon Codes**:
  - `ALPHA10`: 10% off entire order.
  - `DROP200`: ₹200 off orders above ₹1,499.
  - `FREESHIP`: Free express delivery on any order.
- **Dedicated Cart Page (`/cart`)**: Full-page bag review with coupon entry.
- **Simulated Checkout (`/checkout`)**:
  - Contact details (Email, 10-digit mobile).
  - Shipping address with auto-lookup for City & State based on Indian PIN codes.
  - Payment method simulation: UPI (GPay, PhonePe, Paytm), Demo Cards, NetBanking, Cash on Delivery.
  - Prominent demo warnings.
- **Order Confirmation (`/order-confirmation/:orderId`)**:
  - Unique simulated order number (e.g. `AM-2026-892144`).
  - Confetti burst animation on completion.
  - Shipment schedule and BlueDart mock tracking link.
  - Simulated downloadable invoice.

### 5. Indian D2C Legal Policies & Business Foundations
- Formatted specifically for an Indian apparel startup with bracketed legal placeholders:
  - **Shipping & Delivery Policy** (`/policies/shipping`)
  - **7-Day Return, Refund & Exchange Policy** (`/policies/returns`)
  - **Privacy Policy & Data Handling** (`/policies/privacy`)
  - **Terms of Use & Sale** (`/policies/terms`)
  - **Cancellation Policy** (`/policies/cancellation`)
- All marked with: `DRAFT — SUBJECT TO BUSINESS CONFIRMATION AND LEGAL REVIEW`.

### 6. Utility & Customer Support Pages
- **Track Demo Order** (`/track-order`): Enter order number and phone to view a step-by-step dispatch timeline.
- **Size Guide Page** (`/size-guide`): Comprehensive imperial and metric measurements.
- **FAQs** (`/faq`): Categorized accordions for sizing, fabric GSM, shipping, and returns.
- **Contact Us** (`/contact`): Form with client-side validation and support response simulation.
- **My Account** (`/account`): Member profile, mock order history, and saved addresses.
- **WhatsApp Quick Chat**: Floating stylist consultation widget.

---

## 📁 Project Directory Structure

```
alpha-mens-wear/
├── public/
│   ├── favicon.svg              # Alpha Mens geometric brand mark
│   └── _redirects               # SPA routing rewrite for static hosts
├── src/
│   ├── components/
│   │   ├── AnnouncementBar.jsx  # Cycling promotional header
│   │   ├── CartDrawer.jsx       # Slide-out interactive cart drawer
│   │   ├── Footer.jsx           # Global footer with policies & newsletter
│   │   ├── Navbar.jsx           # Responsive header with mobile drawer
│   │   ├── ProductCard.jsx      # Card with image swap, quick-add & wishlist
│   │   ├── ScrollToTop.jsx      # Route transition scroll reset
│   │   ├── SearchModal.jsx      # Live product search modal
│   │   ├── SizeGuideModal.jsx   # Interactive modal with cm/inches charts
│   │   ├── WatermarkOverlay.jsx # Mandatory full-screen diagonal watermark
│   │   └── WhatsAppButton.jsx   # Floating WhatsApp stylist assistance
│   ├── context/
│   │   ├── CartContext.jsx      # Cart items, coupons, totals, and persistence
│   │   ├── ToastContext.jsx     # Global notification alerts
│   │   └── WishlistContext.jsx  # Wishlist state with localStorage
│   ├── data/
│   │   ├── faqs.js              # Categorized FAQ questions
│   │   ├── policies.js          # Draft Indian D2C legal policies
│   │   ├── products.js          # 14 sample products & coupon definitions
│   │   └── reviews.js           # Verified customer reviews
│   ├── pages/
│   │   ├── AboutPage.jsx        # Brand story & fabric engineering
│   │   ├── AccountPage.jsx      # Demo profile & order history
│   │   ├── CartPage.jsx         # Full-width shopping bag review
│   │   ├── CategoryPage.jsx     # Filtered collection view (/category/:slug)
│   │   ├── CheckoutPage.jsx     # Simulated address & payment checkout
│   │   ├── ContactPage.jsx      # Support form & company info
│   │   ├── FAQPage.jsx          # Frequently asked questions
│   │   ├── HomePage.jsx         # Flagship homepage
│   │   ├── NotFoundPage.jsx     # 404 error page
│   │   ├── OrderConfirmationPage.jsx # Success screen with tracking
│   │   ├── PolicyPage.jsx       # Reusable legal policy viewer
│   │   ├── ProductDetailPage.jsx# Flagship PDP with gallery & PIN checker
│   │   ├── SearchPage.jsx       # Search results page
│   │   ├── ShopPage.jsx         # Complete catalogue with filters & sort
│   │   ├── SizeGuidePage.jsx    # Standalone sizing guide
│   │   └── TrackOrderPage.jsx   # Shipment tracking timeline
│   ├── styles/
│   ├── App.jsx                  # Main router and layout composition
│   ├── index.css                # Luxury streetwear design system tokens
│   └── main.jsx                 # React root bootstrap
├── vercel.json                  # Vercel SPA routing rewrite rules
├── package.json                 # Project dependencies & scripts
└── README.md                    # Project documentation & launch guide
```

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: Vanilla CSS Design System with CSS variables (no bloated third-party styling dependencies)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **State & Storage**: React Context API + Browser `localStorage` for cart & wishlist persistence

---

## 💻 Local Setup & Development Instructions

### Prerequisites
- Node.js version **18.0.0 or higher** (tested on Node v22.15.0)
- npm version **9.0.0 or higher**

### Installation
1. Clone or extract the repository:
   ```bash
   cd alpha-mens-wear
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

### Production Build Verification
To test and create the optimized production bundle:
```bash
npm run build
```
The compiled assets will be placed in the `dist/` directory. You can preview the production bundle locally using:
```bash
npm run preview
```

---

## 🌐 Deployment Instructions

### Option 1: Deploying to Vercel (Recommended)
1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Sign in to your [Vercel Dashboard](https://vercel.com/) and click **"Add New Project"**.
3. Import the `alpha-mens-wear` repository.
4. Framework preset will automatically detect **Vite**.
5. Build Command: `npm run build` | Output Directory: `dist`.
6. Click **Deploy**.
7. The included `vercel.json` will automatically configure URL rewrites so refreshing nested routes (e.g., `/product/alpha-shadow-resolve-tee` or `/policies/shipping`) does not return a 404 error.

Alternatively, deploy directly using the Vercel CLI:
```bash
npx vercel
```

### Option 2: Deploying to Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Build command: `npm run build` | Publish directory: `dist`.
3. The included `public/_redirects` file guarantees seamless client-side SPA routing across all sub-pages.

---

## 🔍 Prototype-Only Features vs. Production Launch Requirements

| Feature Area | Implemented in This Prototype | Required Before Production Launch |
| :--- | :--- | :--- |
| **Watermark** | Fullscreen repeating watermark & preview pill | Toggle off via environment flag (`VITE_SHOW_WATERMARK=false`) |
| **Payment Gateway** | Simulated UPI, Card, NetBanking, and COD selectors | Integrate real PG (Razorpay, Cashfree, or PayU with webhook callbacks) |
| **Catalog Data** | 14 curated local demo products in `products.js` | Connect to backend headless CMS or database (MongoDB Atlas / Strapi / Shopify Storefront API) |
| **Order Processing** | LocalStorage simulated order records (`alpha_mens_orders`) | Implement Node.js / Express backend with transactional database & inventory locking |
| **Logistics & PIN Checker** | Instant simulated estimate for Indian PIN codes | Integrate Shiprocket, Delhivery, or BlueDart API for live rates & automatic AWB generation |
| **Customer Authentication** | Demo profile drawer & pre-filled contact coordinates | Real OTP login via SMS gateway (Fast2SMS / MSG91) or Firebase Auth |
| **Transactional Alerts** | Toast notification feedback | Automated SMS, WhatsApp Business API (Interakt / Wati), and Email (SendGrid / Postmark) |

---

## 📋 Business Details the Client Must Supply

Before migrating this prototype into a live commercial store, the client must supply the following real-world business coordinates:

1. **Legal Business Entity**: Registered Private Limited company, LLP, or Proprietorship name.
2. **Tax Compliance**: Valid 15-digit Indian GSTIN and state registration.
3. **Physical Premises**: Registered corporate office address and fulfillment warehouse dispatch address.
4. **Merchant Accounts**: Approved KYC credentials with Razorpay / Cashfree / PayU.
5. **Logistics Contracts**: Shipping aggregator account (Shiprocket, NimbusPost, or direct courier SLA).
6. **Domain & Brand Assets**: Custom domain (e.g., `alphamens.in`), vector SVG brand marks, and high-resolution studio lookbook photography.
7. **Legal Vetting**: Formal sign-off on the draft Terms of Sale, Privacy Policy, and Return Policy by an Indian commercial attorney.
8. **Contact Coordinates**: Working customer care email (`support@alphamens.in`) and dedicated helpline / WhatsApp Business phone number.

---

## ✅ Quality & Testing Checklist

- [x] Fullscreen repeating diagonal watermark active across all routes, modals, and drawers
- [x] Persistent "PROTOTYPE PREVIEW" badge and informative specification modal
- [x] Responsive layout tested for Desktop, Tablet, and Mobile viewport screens
- [x] Working navigation bar, mobile menu drawer, and live catalog search
- [x] Rich product cards with image hover swap, wishlist toggle, and quick-add size selector
- [x] Pronk-inspired Product Details Page (PDP) with multi-image gallery and modal zoom
- [x] Interactive Unit-Toggle Size Guide Modal (Inches vs. Centimeters)
- [x] Indian PIN Code delivery checker with instant demo validation
- [x] Size selection validation preventing empty additions
- [x] Slide-out Cart Drawer and dedicated full Cart Page (`/cart`)
- [x] Free shipping progress bar dynamic calculation (threshold ₹999)
- [x] Interactive coupon codes (`ALPHA10`, `DROP200`, `FREESHIP`)
- [x] Front-end checkout flow with address auto-lookup and payment simulation
- [x] Order Confirmation screen with unique order number, receipt, and mock tracking link
- [x] Dedicated demo pages: Wishlist, Track Order, About, Contact, FAQs, Size Guide, and Account
- [x] 5 Comprehensive Indian D2C legal policies with draft notices and bracketed placeholders
- [x] `vercel.json` and `public/_redirects` included to prevent 404s on nested route refresh
- [x] Production bundle verified: `npm run build` completed with 0 errors
