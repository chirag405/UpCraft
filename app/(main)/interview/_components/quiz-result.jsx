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
import { motion } from "@/lib/motion-wrapper";
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
    if (score >= 60) return "from-sky-400 to-blue-500";
    if (score >= 40) return "from-amber-400 to-orange-500";
    return "from-rose-400 to-red-500";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-emerald-50 border-emerald-100";
    if (score >= 60) return "bg-sky-50 border-sky-100";
    if (score >= 40) return "bg-amber-50 border-amber-100";
    return "bg-rose-50 border-rose-100";
  };

  const getStatColor = (stat) => {
    switch (stat) {
      case "correctAnswers":
        return "text-emerald-500 bg-emerald-50 border-emerald-100";
      case "wrongAnswers":
        return "text-rose-500 bg-rose-50 border-rose-100";
      case "duration":
        return "text-sky-500 bg-sky-50 border-sky-100";
      default:
        return "text-amber-500 bg-amber-50 border-amber-100";
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
    <div className="max-w-4xl mx-auto space-y-8 py-6">
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
          <Medal
            className={`h-4 w-4 mr-2 ${
              result.score >= 60 ? "text-sky-500" : "text-amber-500"
            }`}
          />
          <span className="font-medium text-slate-700">
            {scoreCategory} Performance
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-800">
          Your Interview Results
        </h1>

        <p className="text-slate-600 max-w-lg mx-auto">
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
        <Card className="overflow-hidden bg-white border border-slate-100 shadow-lg rounded-2xl">
          <CardHeader className={`bg-gradient-to-r ${scoreColor} px-6 py-5`}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-white/90">
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
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500">{stat.name}</p>
                  <p className="text-lg font-bold text-slate-700">
                    {stat.value}
                  </p>
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
        <Card className="bg-white border border-slate-100 shadow-md rounded-2xl">
          <CardHeader className="px-6 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl text-slate-800">
                Performance Trend
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-200"
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
          className="border-slate-200 text-slate-700 hover:border-sky-200 hover:text-sky-700"
          size="lg"
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          View All Results
        </Button>

        <Button
          onClick={() => router.push("/interview/mock")}
          className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-0"
          size="lg"
        >
          Try Another Interview
        </Button>

        <Button
          variant="outline"
          className="border-slate-200 text-slate-700 hover:border-sky-200 hover:text-sky-700"
          size="lg"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
      </motion.div>
    </div>
  );
}
