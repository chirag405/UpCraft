// QuizResult.jsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  Medal,
  Share2,
  XCircle,
  TrendingUp,
  Download,
} from "lucide-react";
import PerformanceChart from "./performance-chart";

export default function QuizResult({ result }) {
  const router = useRouter();

  const getScoreCategory = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "from-emerald-400 to-teal-500";
    if (score >= 60) return "from-cyan-400 to-blue-500";
    if (score >= 40) return "from-amber-400 to-orange-500";
    return "from-rose-400 to-red-500";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80)
      return "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
    if (score >= 60)
      return "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20";
    if (score >= 40)
      return "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
    return "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20";
  };

  const getStatColor = (stat) => {
    switch (stat) {
      case "correctAnswers":
        return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
      case "wrongAnswers":
        return "text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20";
      case "duration":
        return "text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20";
      default:
        return "text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
    }
  };

  const wrongAnswers = result.totalQuestions - result.correctAnswers;
  const scoreCategory = getScoreCategory(result.score);
  const scoreColor = getScoreColor(result.score);
  const scoreBgColor = getScoreBgColor(result.score);

  const stats = [
    {
      name: "Correct",
      value: `${result.correctAnswers}`,
      icon: <CheckCircle className="h-5 w-5" />,
      type: "correctAnswers",
    },
    {
      name: "Wrong",
      value: `${wrongAnswers}`,
      icon: <XCircle className="h-5 w-5" />,
      type: "wrongAnswers",
    },
    {
      name: "Duration",
      value: `${result.duration}min`,
      icon: <Clock className="h-5 w-5" />,
      type: "duration",
    },
    {
      name: "Score",
      value: `${result.score}%`,
      icon: <Award className="h-5 w-5" />,
      type: "score",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header with score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-4"
      >
        <div
          className={`inline-flex items-center px-4 py-1.5 rounded-full border ${scoreBgColor}`}
        >
          <Medal className="h-4 w-4 mr-2" />
          <span className="font-medium">{scoreCategory} Performance</span>
        </div>

        <h1 className="text-3xl font-bold">Your Interview Results</h1>

        <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
          Review your performance details below and see how you can improve for
          next time.
        </p>
      </motion.div>

      {/* Score card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg rounded-xl">
          <CardHeader className={`bg-gradient-to-r ${scoreColor} px-6 py-5`}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-white/80">
                  Overall Score
                </h2>
                <p className="text-4xl font-bold text-white flex items-baseline">
                  {result.score}%
                  <span className="text-sm text-white/70 ml-2">
                    ({result.correctAnswers} of {result.totalQuestions} correct)
                  </span>
                </p>
              </div>
              <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center">
                {result.score >= 80 ? (
                  <Award className="h-12 w-12 text-white" />
                ) : result.score >= 60 ? (
                  <Medal className="h-12 w-12 text-white" />
                ) : (
                  <TrendingUp className="h-12 w-12 text-white" />
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className={`flex items-center gap-3 p-3 rounded-lg border ${getStatColor(
                  stat.type
                )}`}
              >
                <div className="bg-white dark:bg-zinc-900 p-2 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {stat.name}
                  </p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md rounded-xl">
          <CardHeader className="px-6 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Performance Trend</CardTitle>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 border-zinc-200 dark:border-zinc-800"
              >
                <Download className="h-3.5 w-3.5" />
                Export Data
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-80">
              <PerformanceChart currentScore={result.score} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
      >
        <Button
          onClick={() => router.push("/interview")}
          variant="outline"
          className="border-zinc-200 dark:border-zinc-800"
          size="lg"
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          View All Results
        </Button>

        <Button
          onClick={() => router.push("/interview/mock")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0"
          size="lg"
        >
          Try Another Interview
        </Button>

        <Button
          variant="outline"
          className="border-zinc-200 dark:border-zinc-800"
          size="lg"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
      </motion.div>
    </div>
  );
}
