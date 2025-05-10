// StatsCards.jsx
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
      icon: <Brain className="h-5 w-5 text-white" />,
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Average Score",
      value: `${Math.round(averageScore)}%`,
      description: "Average performance",
      icon: <Target className="h-5 w-5 text-white" />,
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      title: "Top Score",
      value: `${highestScore}%`,
      description: "Your best performance",
      icon: <Trophy className="h-5 w-5 text-white" />,
      gradient: "from-amber-400 to-orange-500",
    },
    {
      title: "Trend",
      value: improvingTrend ? "Improving" : "Steady",
      description: "Based on recent tests",
      icon: <TrendingUp className="h-5 w-5 text-white" />,
      gradient: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden border-0 rounded-xl shadow-lg bg-white dark:bg-zinc-900">
            <div className={`bg-gradient-to-r ${stat.gradient} p-4`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white">
                  {stat.title}
                </CardTitle>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  {stat.icon}
                </div>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
