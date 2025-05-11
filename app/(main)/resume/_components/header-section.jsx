"use client";

import { motion } from "@/lib/motion-wrapper";

export default function HeaderSection() {
  return (
    <div className="max-w-4xl mx-auto mb-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-900 mb-3">
          Professional Resume Builder
        </h1>
        <p className="text-blue-700/80 text-lg max-w-2xl mx-auto">
          Create a standout resume that highlights your skills and experience.
          Our intuitive builder makes it easy to craft a professional document
          that will impress employers.
        </p>
      </motion.div>
    </div>
  );
}
