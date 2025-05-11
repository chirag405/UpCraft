"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "@/lib/motion-wrapper";

const CoverLetterPreview = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4"
      data-color-mode="light"
    >
      <Card className="max-w-4xl mx-auto overflow-hidden bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100 rounded-xl">
        <CardContent className="p-0">
          <div className="md-preview p-6 rounded-xl" data-color-mode="light">
            <MDEditor
              value={content}
              preview="preview"
              height={700}
              previewOptions={{
                className: "prose max-w-none",
              }}
              className="custom-editor !bg-transparent !border-0 !shadow-none"
              hideToolbar={true}
              visibleDragbar={false}
            />
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        /* Force light mode for the markdown editor */
        .w-md-editor {
          background-color: transparent !important;
        }

        .md-preview .w-md-editor-preview {
          background-color: white !important;
          color: #334155 !important;
          box-shadow: none !important;
        }

        .custom-editor {
          border: none !important;
          box-shadow: none !important;
          background-color: white !important;
        }

        .custom-editor .w-md-editor-toolbar {
          display: none;
        }

        .w-md-editor-content {
          background-color: white !important;
        }

        .w-md-editor-text-pre,
        .w-md-editor-text-input,
        .w-md-editor-text {
          display: none !important;
        }

        .w-md-editor-preview {
          padding: 1rem !important;
          background-color: white !important;
        }

        .w-md-editor-preview h1 {
          color: #0369a1;
          font-size: 1.5rem !important;
          margin-bottom: 1rem;
        }

        .w-md-editor-preview h2 {
          color: #0284c7;
          font-size: 1.25rem !important;
          margin-bottom: 0.75rem;
        }

        .w-md-editor-preview p {
          color: #334155;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        /* Ensure links are visible */
        .w-md-editor-preview a {
          color: #2563eb;
          text-decoration: underline;
        }

        /* Make blockquotes stand out */
        .w-md-editor-preview blockquote {
          border-left: 4px solid #e2e8f0;
          padding-left: 1rem;
          font-style: italic;
          color: #475569;
        }
      `}</style>
    </motion.div>
  );
};

export default CoverLetterPreview;
