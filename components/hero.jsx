"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, fadeIn, slideUp } from "@/lib/motion-wrapper";

const HeroSection = () => {
  const constraintsRef = useRef(null);

  return (
    <section className="w-full pt-32 pb-20 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 space-y-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="px-4 py-1.5 bg-blue-100 rounded-full">
                <span className="text-sm font-medium text-blue-600">
                  ✨ AI-Powered Career Platform
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
              Transform Your
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h1>

            <p className="text-lg text-blue-700/80 max-w-xl leading-relaxed">
              Harness intelligent career coaching, real-time interview
              simulations, and personalized roadmap planning to accelerate your
              professional growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link href="/dashboard" className="flex-none">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium text-lg px-8 py-7 rounded-full shadow-lg shadow-blue-300/30 transition-all hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <div className="flex items-center gap-3 sm:pl-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-blue-300 to-blue-400 flex items-center justify-center overflow-hidden"
                    >
                      <span className="text-xs font-semibold text-white">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-blue-700">
                  <span className="font-semibold">50,000+</span> professionals
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            ref={constraintsRef}
            className="md:w-1/2 relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/20 to-blue-400/20 rounded-3xl blur-2xl" />
              <div className="absolute -inset-1 bg-white/80 rounded-3xl blur" />

              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-200/50 border border-blue-100"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo_upcraft.png"
                  width={1280}
                  height={720}
                  alt="Dashboard Preview"
                  className="rounded-3xl"
                  priority
                />

                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-blue-500/20 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="px-5 py-2.5 bg-white rounded-full border border-blue-100 shadow-lg shadow-blue-100/50">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="text-sm font-medium text-blue-800">
                      Live AI coaching available
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-10 top-1/4"
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-3xl">🚀</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
