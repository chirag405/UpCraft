"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Card, CardContent } from "@/components/ui/card";
import { ThreeDCard } from "@/components/aceternity/3d-card";
import { SpotlightEffect } from "@/components/aceternity/spotlight";
import { motion } from "framer-motion";

const CoverLetterPreview = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4"
    >
      <ThreeDCard
        containerClassName="max-w-4xl mx-auto"
        className="bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl border border-slate-800/50 rounded-2xl overflow-hidden"
      >
        <SpotlightEffect>
          <Card className="border-0 bg-transparent">
            <CardContent className="p-0">
              <div className="md-preview p-6 rounded-xl">
                <MDEditor
                  value={content}
                  preview="preview"
                  height={700}
                  previewOptions={{
                    className: "prose prose-invert prose-slate max-w-none",
                  }}
                  className="custom-editor !bg-transparent !border-0 !shadow-none"
                  hideToolbar={true}
                />
              </div>
            </CardContent>
          </Card>
        </SpotlightEffect>
      </ThreeDCard>

      <style jsx global>{`
        .md-preview .w-md-editor-preview {
          background: transparent !important;
          color: #e2e8f0 !important;
          box-shadow: none !important;
        }
        .custom-editor {
          border: none !important;
          box-shadow: none !important;
        }
        .custom-editor .w-md-editor-toolbar {
          display: none;
        }
        .w-md-editor-text-pre,
        .w-md-editor-text-input,
        .w-md-editor-text {
          display: none !important;
        }
        .w-md-editor-preview {
          padding: 1rem !important;
        }
        .w-md-editor-preview h1 {
          color: #f1f5f9;
          font-size: 1.5rem !important;
          margin-bottom: 1rem;
        }
        .w-md-editor-preview h2 {
          color: #e2e8f0;
          font-size: 1.25rem !important;
          margin-bottom: 0.75rem;
        }
        .w-md-editor-preview p {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
      `}</style>
    </motion.div>
  );
};

export default CoverLetterPreview;
