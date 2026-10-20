import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { DEMO_COUPONS } from "../data/products";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);
const STORAGE_KEY = "alpha_mens_cart_v1";
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  const addToCart = (product, size, color, quantity = 1, openDrawer = true) => {
    if (!size) {
      showToast("Please choose a size first", "error");
      return false;
    }
    const colorObj = color || (product.colors && product.colors[0]) || { name: "Standard", hex: "#000" };
    const cartId = `${product.id}-${size}-${colorObj.name}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartId,
            productId: product.id,
            product,
            size,
            color: colorObj,
            quantity,
            price: product.price
          }
        ];
      }
    });

    showToast(`Added "${product.name}" (${size}) to your cart`, "success");
    if (openDrawer) {
      setIsCartOpen(true);
    }
    return true;
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast("Item removed from cart", "info");
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    if (!code || !code.trim()) {
      showToast("Please enter a valid coupon code", "error");
      return false;
    }
    const normalized = code.trim().toUpperCase();
    const found = DEMO_COUPONS.find((c) => c.code === normalized);
    if (!found) {
      showToast(`Coupon "${normalized}" is invalid. Try ALPHA10 or DROP200`, "error");
      return false;
    }
    if (found.minOrder && subtotal < found.minOrder) {
      showToast(`Code "${found.code}" requires minimum order of ₹${found.minOrder}`, "error");
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied successfully!`, "success");
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed", "info");
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    if (appliedCoupon.type === "percent") {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    if (appliedCoupon.type === "flat") {
      return Math.min(appliedCoupon.value, subtotal);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const rawShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const shippingAmount = appliedCoupon && appliedCoupon.code === "FREESHIP" ? 0 : rawShipping;

  const total = Math.max(0, subtotal - discountAmount + shippingAmount);

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingAmount,
        total,
        totalItemsCount,
        amountNeededForFreeShipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
