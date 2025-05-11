"use client";

import React from "react";

export function LoadingSpinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent animate-spin`}
      />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <LoadingSpinner size="lg" />
    </div>
  );
}
