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
      <Card className="max-w-4xl mx-auto bg-white border border-sky-100 shadow-lg rounded-2xl mt-6 overflow-hidden">
        <CardHeader className="pb-0 bg-gradient-to-r from-sky-400 to-blue-500 text-white">
          <CardTitle className="text-xl font-bold">Interview History</CardTitle>
          <CardDescription className="text-sky-100 mb-2">
            No interview assessments yet
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col items-center justify-center space-y-6 py-6">
            <div className="rounded-full bg-sky-50 p-6 border-4 border-sky-100">
              <Target className="h-12 w-12 text-sky-500" />
            </div>
            <div className="text-center space-y-2 max-w-sm">
              <h3 className="text-xl font-bold text-gray-800">
                Start your first interview
              </h3>
              <p className="text-gray-600">
                Take a mock interview to practice your skills and track your
                progress
              </p>
            </div>
            <Button
              onClick={() => router.push("/interview/mock")}
              className="bg-gradient-to-r from-sky-400 to-blue-500 text-white hover:shadow-lg transition-all duration-300 px-6 py-2 text-lg font-medium rounded-xl border-0"
            >
              Start Mock Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getScoreColorClass = (score) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-sky-600 bg-sky-50 border-sky-200";
    if (score >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 mb-2">
            Your Interview History
          </h2>
          <p className="text-gray-600">
            Review past performance and track your progress
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search interviews"
              className="pl-10 h-12 w-full md:w-64 rounded-xl border border-sky-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
            />
          </div>
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-xl border-sky-100 hover:bg-sky-50 hover:border-sky-200"
          >
            <Filter className="h-5 w-5 text-sky-500" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assessments.map((assessment, index) => (
          <motion.div
            key={assessment.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden bg-white border border-sky-100 hover:border-sky-300 transition-all duration-300 shadow-md hover:shadow-xl rounded-2xl">
              <CardHeader className="pb-2 bg-gradient-to-r from-sky-50 to-blue-50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-800">
                      Interview #{assessments.length - index}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1 gap-1.5 text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {format(new Date(assessment.createdAt), "MMM d, yyyy")}
                      </span>
                    </CardDescription>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border ${getScoreColorClass(
                      assessment.score
                    )}`}
                  >
                    {assessment.score >= 70 ? (
                      <Trophy className="h-4 w-4" />
                    ) : (
                      <Target className="h-4 w-4" />
                    )}
                    {assessment.score}% Score
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Clock className="h-4 w-4 text-sky-500" />
                        <span className="text-sm">Duration</span>
                      </div>
                      <div className="font-semibold text-gray-800">
                        {assessment.duration} min
                      </div>
                    </div>
                    <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Correct</span>
                      </div>
                      <div className="font-semibold text-gray-800">
                        {assessment.correctAnswers}
                      </div>
                    </div>
                    <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <XCircle className="h-4 w-4 text-rose-500" />
                        <span className="text-sm">Incorrect</span>
                      </div>
                      <div className="font-semibold text-gray-800">
                        {assessment.totalQuestions - assessment.correctAnswers}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <Button
                      variant="outline"
                      className="border-sky-200 hover:bg-sky-50 hover:text-sky-700 text-sky-600"
                      size="sm"
                      onClick={() => setSelectedQuiz(assessment)}
                    >
                      View Details
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-sky-400 to-blue-500 border-0 text-white hover:shadow-md transition-all duration-300"
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
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white border-sky-100 rounded-2xl">
          <DialogHeader className="bg-gradient-to-r from-sky-400 to-blue-500 -mx-6 -mt-6 px-6 py-4 rounded-t-2xl mb-4">
            <DialogTitle className="text-xl font-bold text-white">
              Interview Results
            </DialogTitle>
          </DialogHeader>
          {selectedQuiz && <QuizResult result={selectedQuiz} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
