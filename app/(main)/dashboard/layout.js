"use client";

import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Industry Insights
            </h1>
            <p className="mt-2 text-blue-600 dark:text-blue-400 font-medium text-lg">
              Explore career trends and opportunities
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all">
              Data Explorer
            </button>
            <button className="bg-white dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 font-medium px-6 py-2.5 rounded-full shadow-sm hover:shadow border border-blue-100 dark:border-blue-900/30">
              About
            </button>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-20">
              <BarLoader width={"40%"} color="#3b82f6" />
              <p className="mt-4 text-blue-500 font-medium">
                Loading insights...
              </p>
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}
