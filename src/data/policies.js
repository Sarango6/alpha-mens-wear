export const LEGAL_METADATA = {
  brandName: "Alpha Mens",
  legalEntity: "[Alpha Menswear Apparel LLP / Private Limited]",
  cin: "[U18101DL2026PTC000000 / Pending Registration]",
  gstin: "[07AAAAA0000A1Z5 - State GST Placeholder]",
  registeredOffice: "[Plot No. 42, Okhla Industrial Area Phase-III, New Delhi, 110020, India]",
  warehouseAddress: "[Alpha Mens Logistics Hub, Sector 37, Pace City II, Gurugram, Haryana 122001, India]",
  supportEmail: "[support@alphamenswear.demo]",
  grievanceOfficer: "[Grievance Officer Name: Mr. Rahul Kapoor]",
  grievanceEmail: "[grievance@alphamenswear.demo]",
  supportPhone: "[+91 98765 XXXXX]",
  hours: "Monday to Saturday, 10:00 AM – 6:30 PM IST",
  effectiveDate: "Drafted October 2026 — Version 1.0 (PROTOTYPE SAMPLE)",
  legalNotice: "DRAFT — SUBJECT TO BUSINESS CONFIRMATION AND LEGAL COUNSEL REVIEW. NOT A BINDING REAL-WORLD COMMERCIAL CONTRACT."
};

export const POLICIES = {
  shipping: {
    title: "Shipping & Delivery Policy",
    slug: "shipping",
    summary: "Standard delivery within 2–6 business days across India. Free shipping on all prepaid orders above ₹999.",
    lastUpdated: "October 2026",
    sections: [
      {
        heading: "1. Order Processing & Fulfillment Timelines",
        content: `All orders placed on ${LEGAL_METADATA.brandName} are processed from our central warehouse facility located at ${LEGAL_METADATA.warehouseAddress}. Processing typically takes 24 to 36 business hours following payment confirmation for prepaid transactions or telephonic/SMS verification for Cash on Delivery (COD) orders.\n\nOrders placed on Sundays or gazetted public holidays in India will be processed on the following working business day.`
      },
      {
        heading: "2. Shipping Rates & Thresholds",
        content: `• Standard Prepaid Orders (UPI, NetBanking, Credit/Debit Cards): Orders with a net cart value of ₹999 or above qualify for FREE Standard Delivery.\n• Orders below ₹999: A flat delivery surcharge of ₹99 applies across all serviceable pin codes.\n• Cash on Delivery (COD): Available for orders up to ₹5,000 across supported pin codes. A non-refundable COD handling charge of ₹49 applies.\n• Express Air Dispatch: Delivered via tier-1 logistics partners (e.g., Blue Dart, Delhivery, Bluedart, Xpressbees).`
      },
      {
        heading: "3. Estimated Transit Times by Region",
        content: `• Metro Cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad): 2 to 3 business days.\n• Tier-2 Urban Centers & State Capitals: 3 to 5 business days.\n• North-East, Jammu & Kashmir, and Remote / ODA (Out of Delivery Area) Locations: 5 to 7 business days.\n\nPlease note that delivery timelines are indicative estimates and may experience delays due to adverse weather events, regional strikes, festive carrier congestion, or force majeure occurrences.`
      },
      {
        heading: "4. Real-Time Tracking & Proof of Delivery",
        content: `Upon handover to our courier partner, a tracking link with an Air Waybill (AWB) number will be sent via SMS and Email to the contact coordinates provided at checkout. Customers are requested to inspect the exterior tamper-evident courier polybag before sharing the delivery One-Time Password (OTP) with delivery personnel.`
      }
    ]
  },
  returns: {
    title: "Return, Refund & Exchange Policy",
    slug: "returns",
    summary: "7-day doorstep exchange and return window for unworn items with original tags.",
    lastUpdated: "October 2026",
    sections: [
      {
        heading: "1. 7-Day Exchange & Return Eligibility",
        content: `We want you to love your Alpha Mens gear. If you are not completely satisfied with the fit or style, you may initiate an exchange or return request within seven (7) calendar days from the date of confirmed delivery shown by our courier tracking logs.\n\nTo qualify for return or exchange:\n• The product must be unworn, unwashed, unaltered, and free of cologne, deodorants, or lint.\n• All original tags, silicone brand ribbons, and dust packaging must be intact.\n• Items purchased during special clearance or 'Final Archival Sale' promotions marked non-returnable are eligible for size exchange only.`
      },
      {
        heading: "2. Doorstep Reverse Pickup Process",
        content: `Our logistics partners will attempt doorstep reverse pickup within 24 to 48 hours of approval. Our delivery executive will conduct a brief physical inspection before receiving the package. Please ensure the garment is folded securely in its original packaging bag.`
      },
      {
        heading: "3. Refund Methods & Settlement Timelines",
        content: `• Prepaid Orders: Upon successful quality inspection at our warehouse (typically 2 business days after receipt), the refund will be credited directly to the original source account (UPI / Card / NetBanking) within 5 to 7 banking working days.\n• Cash on Delivery (COD) Orders: Refunds are disbursed via automated UPI transfer or direct NEFT bank transfer upon submission of verified bank account details through our secure portal.\n• Optional Alpha Mens Store Credit: Customers may opt for immediate 100% store credit with a bonus ₹100 shopping voucher valid for 12 months.`
      },
      {
        heading: "4. Defective, Damaged, or Incomplete Shipments",
        content: `In the unlikely event of manufacturing defect or receiving an incorrect item, notify us at ${LEGAL_METADATA.supportEmail} within 48 hours of delivery with photographic evidence. We will arrange priority expedited replacement with zero additional shipping charges.`
      }
    ]
  },
  terms: {
    title: "Terms of Use & Sale",
    slug: "terms",
    summary: "Terms governing website browsing, purchases, intellectual property, and acceptable use.",
    lastUpdated: "October 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms & Legal Structure",
        content: `This website is operated by ${LEGAL_METADATA.legalEntity} (doing business as '${LEGAL_METADATA.brandName}'). Throughout the site, the terms 'we', 'us', and 'our' refer to ${LEGAL_METADATA.brandName}. By accessing this website and/or purchasing merchandise, you engage in our 'Service' and agree to be bound by these Terms and Conditions.\n\n[DRAFT DISCLAIMER: This document serves as a demonstration prototype template and requires formal vetting by qualified legal counsel under the Indian Information Technology Act, 2000, and the Consumer Protection (E-Commerce) Rules, 2020 before commercial activation].`
      },
      {
        heading: "2. Product Accuracy, Sizing & Colors",
        content: `We make every effort to display garment colors, textures, and fabric weaves as accurately as possible. However, actual colors may vary slightly based on display monitor settings and ambient lighting. Sizing charts are provided for guidance; minor manufacturing tolerances of ±0.5 inches are standard within the textile industry.`
      },
      {
        heading: "3. Pricing, Offers & Billing",
        content: `All prices quoted on the website are in Indian Rupees (INR ₹) and are inclusive of Goods and Services Tax (GST) unless explicitly noted otherwise. We reserve the right to revise product prices, discontinue models, or correct typographical pricing errors without prior notification. In the event of a catalog pricing error, any order placed at an erroneous price may be cancelled with a full immediate refund.`
      },
      {
        heading: "4. Intellectual Property Rights",
        content: `All visual brand elements, the '${LEGAL_METADATA.brandName}' typography, stylized Alpha logos, original product descriptions, graphic screen designs, marketing photography, and user interface styling are the proprietary intellectual property of ${LEGAL_METADATA.legalEntity}. Unauthorized reproduction, scraping, redistribution, or commercial exploitation is strictly prohibited under Indian and international copyright and trademark conventions.`
      },
      {
        heading: "5. Limitation of Liability & Force Majeure",
        content: `To the maximum extent permitted by applicable Indian law, ${LEGAL_METADATA.legalEntity} shall not be liable for any indirect, incidental, or consequential damages resulting from website downtime, delay in logistics fulfillment, or server unavailability. Neither party shall be held liable for failure or delay in performance caused by circumstances beyond reasonable control, including natural disasters, governmental restrictions, pandemics, or carrier strikes.`
      },
      {
        heading: "6. Governing Law & Dispute Resolution",
        content: `These Terms of Sale and any separate agreements shall be governed by and construed in accordance with the laws of the Republic of India. Any legal disputes arising out of website transactions shall be subject to the exclusive jurisdiction of the competent courts in ${LEGAL_METADATA.registeredOffice}.`
      }
    ]
  },
  privacy: {
    title: "Privacy Policy & Data Handling",
    slug: "privacy",
    summary: "How we collect, use, store, and safeguard your personal details and checkout data.",
    lastUpdated: "October 2026",
    sections: [
      {
        heading: "1. Data We Collect",
        content: `When you visit our store or place an order, we collect:\n• Identity & Contact Information: Full name, delivery address, billing address, email address, and 10-digit mobile phone number.\n• Technical & Browsing Data: IP address, browser type, device identifiers, referring URLs, and page session telemetry.\n• Order & Transaction Records: Order history, items viewed, wishlist bookmarks, and coupon redemptions.`
      },
      {
        heading: "2. Secure Payment Processing (Zero Card Storage)",
        content: `Alpha Mens does not store, process, or transmit sensitive debit/credit card numbers, CVVs, net banking credentials, or UPI MPINs on our internal servers. All financial transactions are tokenized and processed through PCI-DSS Level 1 certified payment gateways (e.g. Razorpay, Cashfree, or PayU placeholders in production).`
      },
      {
        heading: "3. How We Use Your Information",
        content: `Your data is utilized strictly for:\n• Fulfilling, packing, and dispatching your orders with logistics carriers.\n• Sending automated transaction alerts, delivery status updates, and OTPs via SMS/WhatsApp.\n• Preventing transactional fraud and safeguarding website security.\n• Customer care support and grievance redressal.\n• Promotional newsletters (only with explicit opt-in, with one-click unsubscribe available at all times).`
      },
      {
        heading: "4. Cookies & Analytics",
        content: `We utilize essential cookies to retain cart contents across browser sessions, maintain user authentication states, and analyze aggregated conversion metrics via privacy-compliant analytics tools.`
      },
      {
        heading: "5. Consumer Data Rights & Grievance Redressal",
        content: `Under Indian data protection frameworks, you maintain the right to access, rectify, or request deletion of your stored customer profile. For any data protection inquiries, contact our designated Grievance Officer:\n\n${LEGAL_METADATA.grievanceOfficer}\nEmail: ${LEGAL_METADATA.grievanceEmail}\nAddress: ${LEGAL_METADATA.registeredOffice}`
      }
    ]
  },
  cancellation: {
    title: "Cancellation Policy",
    slug: "cancellation",
    summary: "Instant self-serve cancellation within 2 hours of order placement.",
    lastUpdated: "October 2026",
    sections: [
      {
        heading: "1. Cancellation Window Prior to Dispatch",
        content: `You may cancel your order at no charge within two (2) hours of placing it directly from the 'Track Order' or 'Order Confirmation' screen, or by emailing ${LEGAL_METADATA.supportEmail} with your Order ID.`
      },
      {
        heading: "2. Orders Already Dispatched",
        content: `Once an order has been picked, packaged, and handed over to our air/surface courier partner (with generated AWB tracking), the order cannot be cancelled mid-transit. In such cases, you may either decline delivery at your doorstep or accept the parcel and initiate a standard 7-day exchange or return.`
      },
      {
        heading: "3. Refund for Cancelled Orders",
        content: `For prepaid orders cancelled within the eligible window, 100% of the invoice amount is refunded automatically to your source payment method within 3 to 5 banking days.`
      }
    ]
  }
};
