"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedTitle({
  text,
  className,
  once = true,
  repeatDelay = 0,
  staggerChildren = 0.05,
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        ...(repeatDelay > 0 && {
          repeat: Infinity,
          repeatDelay,
        }),
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.455, 0.03, 0.515, 0.955],
        duration: 0.5,
      },
    },
  };

  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {words.map((word, index) => (
        <div key={index} className="pr-2 overflow-hidden">
          <motion.span className="inline-block" variants={child}>
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}

export function GradientText({
  children,
  className,
  from = "from-blue-600",
  to = "to-purple-600",
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        from,
        to,
        className
      )}
    >
      {children}
    </span>
  );
}
