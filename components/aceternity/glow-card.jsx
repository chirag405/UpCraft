"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlowingCard({
  children,
  className,
  glowClassName,
  hoverScale = 1.05,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl bg-slate-900/50 border border-slate-800/50",
        className
      )}
      whileHover={{ scale: hoverScale }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute inset-0 opacity-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-xl transition-opacity duration-500",
          glowClassName
        )}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
