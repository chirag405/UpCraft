// QuizList.jsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Clock,
  Target,
  Trophy,
  XCircle,
  Search,
  Filter,
} from "lucide-react";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  if (!assessments?.length) {
    return (
      <Card className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md rounded-xl mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Interview History
          </CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">
            No interview assessments yet
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 pb-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/20 p-4 border border-indigo-100 dark:border-indigo-800/30">
              <Target className="h-10 w-10 text-indigo-500" />
            </div>
            <div className="text-center space-y-2 max-w-sm">
              <h3 className="text-lg font-medium">
                Start your first interview
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Take a mock interview to practice your skills and track your
                progress
              </p>
            </div>
            <Button
              onClick={() => router.push("/interview/mock")}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 border-0"
            >
              Start Mock Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getScoreColorClass = (score) => {
    if (score >= 80)
      return "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
    if (score >= 60)
      return "text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20";
    if (score >= 40)
      return "text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
    return "text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20";
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-1">
            Your Interview History
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Review past performance and track your progress
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search interviews"
              className="pl-9 h-10 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 focus:border-indigo-500"
            />
          </div>
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 border-zinc-200 dark:border-zinc-800"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((assessment, index) => (
          <motion.div
            key={assessment.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-sm hover:shadow-md rounded-xl">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Interview #{assessments.length - index}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1 gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      <span>
                        {format(new Date(assessment.createdAt), "MMM d, yyyy")}
                      </span>
                    </CardDescription>
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${getScoreColorClass(
                      assessment.score
                    )}`}
                  >
                    {assessment.score >= 70 ? (
                      <Trophy className="h-3.5 w-3.5" />
                    ) : (
                      <Target className="h-3.5 w-3.5" />
                    )}
                    {assessment.score}% Score
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-sm">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-zinc-400" />
                        <span className="text-zinc-600 dark:text-zinc-300">
                          Duration:
                        </span>
                      </div>
                      <div className="font-medium pl-5.5">
                        {assessment.duration} minutes
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-zinc-600 dark:text-zinc-300">
                          Correct:
                        </span>
                      </div>
                      <div className="font-medium pl-5.5">
                        {assessment.correctAnswers} questions
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="h-4 w-4 text-rose-500" />
                        <span className="text-zinc-600 dark:text-zinc-300">
                          Incorrect:
                        </span>
                      </div>
                      <div className="font-medium pl-5.5">
                        {assessment.totalQuestions - assessment.correctAnswers}{" "}
                        questions
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      variant="outline"
                      className="border-zinc-200 dark:border-zinc-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400"
                      size="sm"
                      onClick={() => setSelectedQuiz(assessment)}
                    >
                      View Details
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 text-white hover:from-indigo-600 hover:to-purple-700"
                      size="sm"
                      onClick={() => router.push("/interview/mock")}
                    >
                      New Interview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog
        open={Boolean(selectedQuiz)}
        onOpenChange={(open) => !open && setSelectedQuiz(null)}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Interview Results
            </DialogTitle>
          </DialogHeader>
          {selectedQuiz && <QuizResult result={selectedQuiz} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
