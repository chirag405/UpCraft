"use client";

import { Brain, Target, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatsCards({ assessments }) {
  // Skip if no assessments
  if (!assessments?.length) {
    return null;
  }

  // Calculate stats
  const totalTests = assessments.length;

  const averageScore =
    assessments.reduce((sum, test) => sum + test.score, 0) / totalTests;

  const highestScore = Math.max(...assessments.map((test) => test.score));

  const improvingTrend = assessments
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(-3)
    .every((test, index, arr) => {
      if (index === 0) return true;
      return test.score >= arr[index - 1].score;
    });

  const stats = [
    {
      title: "Total Interviews",
      value: totalTests,
      description: "Mock interviews completed",
      icon: <Brain className="h-6 w-6 text-sky-50" />,
      gradient: "from-sky-400 to-blue-500",
      iconBg: "bg-blue-500",
    },
    {
      title: "Average Score",
      value: `${Math.round(averageScore)}%`,
      description: "Average performance",
      icon: <Target className="h-6 w-6 text-sky-50" />,
      gradient: "from-sky-400 to-blue-600",
      iconBg: "bg-blue-600",
    },
    {
      title: "Top Score",
      value: `${highestScore}%`,
      description: "Your best performance",
      icon: <Trophy className="h-6 w-6 text-sky-50" />,
      gradient: "from-blue-400 to-indigo-500",
      iconBg: "bg-indigo-500",
    },
    {
      title: "Trend",
      value: improvingTrend ? "Improving" : "Steady",
      description: "Based on recent tests",
      icon: <TrendingUp className="h-6 w-6 text-sky-50" />,
      gradient: "from-blue-500 to-indigo-600",
      iconBg: "bg-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden border-0 rounded-2xl shadow-lg bg-white h-full">
            <CardHeader
              className={`p-0 h-3 bg-gradient-to-r ${stat.gradient}`}
            />
            <CardContent className="pt-6 pb-5 px-5">
              <div className="flex items-start gap-4">
                <div
                  className={`${stat.iconBg} p-3 rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {stat.title}
                  </p>
                  <div className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
