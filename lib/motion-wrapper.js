"use client";

// Import only what we need from framer-motion - avoiding "export *"
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

// Re-export the components and hooks we need
export {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
};

// Export common animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const slideDown = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
