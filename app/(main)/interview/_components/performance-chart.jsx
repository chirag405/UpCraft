// PerformanceChart.jsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { GradientText } from "@/components/aceternity/text-effect";
import { SpotlightEffect } from "@/components/aceternity/spotlight";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    if (assessments?.length) {
      // Format data for chart
      const data = assessments
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((assessment) => ({
          name: format(new Date(assessment.createdAt), "MMM d"),
          score: assessment.score,
          fullDate: format(new Date(assessment.createdAt), "MMMM d, yyyy"),
          topic: assessment.topic,
        }));

      setChartData(data);

      // Calculate average score
      const sum = assessments.reduce((acc, curr) => acc + curr.score, 0);
      setAverageScore((sum / assessments.length).toFixed(1));
    }
  }, [assessments]);

  if (!assessments?.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <SpotlightEffect className="rounded-xl">
        <Card className="bg-slate-900/50 border-slate-800/50 shadow-xl hover:border-blue-500/30 transition-all">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  <GradientText from="from-blue-400" to="to-purple-500">
                    Performance Trend
                  </GradientText>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Your interview scores over time
                </CardDescription>
              </div>
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-3 py-2 rounded-lg border border-blue-500/20">
                <span className="text-sm text-slate-400 block mb-1">
                  Average Score
                </span>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {averageScore}%
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tick={{ fill: "#94a3b8" }}
                    axisLine={{ stroke: "#475569" }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="#94a3b8"
                    tick={{ fill: "#94a3b8" }}
                    axisLine={{ stroke: "#475569" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "0.5rem",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
                    }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
                            <p className="text-sm font-medium text-slate-200 mb-1">
                              {payload[0].payload.fullDate}
                            </p>
                            <p className="text-sm text-blue-400 font-medium">
                              Topic: {payload[0].payload.topic}
                            </p>
                            <p className="text-sm text-blue-400 font-medium mt-2">
                              Score: {payload[0].value}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="url(#colorGradient)"
                    strokeWidth={3}
                    dot={{
                      fill: "#3b82f6",
                      stroke: "#1d4ed8",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#60a5fa",
                      stroke: "#2563eb",
                      strokeWidth: 2,
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </SpotlightEffect>
    </motion.div>
  );
}
