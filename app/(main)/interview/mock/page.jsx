"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";
import { motion } from "framer-motion";

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/interview">
            <Button
              variant="ghost"
              className="mb-8 gap-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Interview Preparation
            </Button>
          </Link>

          <div className="mb-6 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Mock Technical Interview
            </h1>
            <p className="text-slate-600 mt-2">
              Test your knowledge with industry-specific questions and track
              your progress
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-sky-100">
            <Quiz />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
