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
import { motion } from "@/lib/motion-wrapper";

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
      <Card className="bg-white shadow-lg border border-sky-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">
                Performance Trend
              </CardTitle>
              <CardDescription className="text-sky-100 mt-1">
                Your interview scores over time
              </CardDescription>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/30">
              <span className="text-sm text-white/80 block mb-1">
                Average Score
              </span>
              <span className="text-2xl font-bold">{averageScore}%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 pb-4 px-4">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fill: "#64748b" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#64748b"
                  tick={{ fill: "#64748b" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#cbd5e1",
                    borderRadius: "0.75rem",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border border-sky-100 p-4 rounded-xl shadow-lg">
                          <p className="text-sm font-medium text-gray-800 mb-1">
                            {payload[0].payload.fullDate}
                          </p>
                          <p className="text-sm text-sky-600 font-medium">
                            Topic: {payload[0].payload.topic}
                          </p>
                          <p className="text-sm font-bold text-sky-600 mt-2">
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
                    fill: "#ffffff",
                    stroke: "#3b82f6",
                    strokeWidth: 2,
                    r: 5,
                  }}
                  activeDot={{
                    r: 8,
                    fill: "#3b82f6",
                    stroke: "#ffffff",
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
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
