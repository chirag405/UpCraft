"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "@/lib/motion-wrapper";
import { Rocket, Sparkles } from "lucide-react";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.documentElement.classList.add("bg-slate-900");
    return () => document.documentElement.classList.remove("bg-slate-900");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Simplified Animated Elements */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-20"
      >
        <Rocket className="w-32 h-32 text-purple-400/10" />
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-40 right-40"
      >
        <Sparkles className="w-24 h-24 text-blue-400/10" />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[calc(100vh-128px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Clean Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Start Your Journey
            </h1>
            <p className="text-xl text-slate-300 font-light">
              Create your account to unlock personalized career guidance,
              AI-powered coaching, and professional growth tools.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "AI-Powered Career Coach",
                "Personalized Learning Paths",
                "Industry Expert Sessions",
                "Progress Tracking",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Clean Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative bg-slate-800/50 rounded-xl border border-slate-700/50 p-8 backdrop-blur-sm"
          >
            <SignUp
              appearance={{
                variables: {
                  colorPrimary: "#3b82f6",
                  colorText: "#e2e8f0",
                  colorTextOnPrimaryBackground: "#0f172a",
                  colorBackground: "transparent",
                  colorInputBackground: "transparent",
                  colorInputText: "#f8fafc",
                  borderRadius: "0.5rem",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                },
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none bg-transparent",
                  headerTitle: "text-3xl font-bold text-blue-400 mb-2",
                  headerSubtitle: "text-slate-400 mb-6",
                  formFieldInput:
                    "bg-slate-700/50 border border-slate-600/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 rounded-lg py-3 px-4 text-slate-100 transition-all",
                  formFieldLabel: "text-slate-300 mb-1.5",
                  formButtonPrimary:
                    "bg-blue-600 hover:bg-blue-700 text-slate-100 font-semibold py-3 rounded-lg transition-all",
                  footerActionLink: "text-blue-400 hover:text-blue-300",
                  socialButtons: "gap-3",
                  socialButton:
                    "bg-slate-700/50 border border-slate-600/50 hover:bg-slate-700/70 text-slate-100 rounded-lg",
                  dividerLine: "bg-slate-600/50",
                  dividerText: "text-slate-400",
                },
                layout: {
                  logoPlacement: "none",
                  socialButtonsPlacement: "bottom",
                  socialButtonsVariant: "blockButton",
                },
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
