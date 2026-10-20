import React, { useState, useEffect } from "react";
import { Sparkles, Truck, Tag } from "lucide-react";

export const AnnouncementBar = () => {
  const announcements = [
    { text: "FREE EXPRESS SHIPPING ON ALL ORDERS OVER ₹999", icon: Truck },
    { text: "USE CODE 'ALPHA10' FOR EXTRA 10% OFF YOUR FIRST DROP", icon: Tag },
    { text: "ENGINEERED 240+ GSM HEAVYWEIGHT STREETWEAR DROPS LIVE", icon: Sparkles }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const CurrentIcon = announcements[currentIndex].icon;

  return (
    <div className="announcement-bar" role="region" aria-label="Special Offers">
      <div className="container flex items-center justify-center gap-2">
        <CurrentIcon size={14} style={{ color: "var(--accent-orange)" }} />
        <span>{announcements[currentIndex].text}</span>
      </div>
    </div>
  );
};
