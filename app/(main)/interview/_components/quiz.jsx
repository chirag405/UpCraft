"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveQuizResult } from "@/actions/interview";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Brain,
  Clock,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import QuizResult from "./quiz-result";
import { motion, AnimatePresence } from "@/lib/motion-wrapper";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Generate random quiz ID
    setQuizId(`quiz_${Date.now()}`);

    // Fetch sample questions (this would typically come from an API)
    const sampleQuestions = [
      {
        id: 1,
        question: "What is the primary purpose of React's virtual DOM?",
        options: [
          "To create 3D user interfaces",
          "To optimize performance by minimizing direct DOM manipulations",
          "To enable server-side rendering",
          "To manage component lifecycle methods",
        ],
        correctAnswer:
          "To optimize performance by minimizing direct DOM manipulations",
        explanation:
          "React uses a virtual DOM to optimize performance by minimizing costly direct DOM manipulations. It creates a lightweight copy of the DOM, makes changes to this copy, then efficiently updates only the necessary parts of the actual DOM.",
      },
      {
        id: 2,
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Object"],
        correctAnswer: "Float",
        explanation:
          "JavaScript does not have a specific 'Float' data type. It uses a single 'Number' type for all numeric values, including integers and floating-point numbers.",
      },
      {
        id: 3,
        question: "What does CSS stand for?",
        options: [
          "Computer Style Sheets",
          "Creative Style System",
          "Cascading Style Sheets",
          "Colorful Style Sheets",
        ],
        correctAnswer: "Cascading Style Sheets",
        explanation:
          "CSS stands for Cascading Style Sheets, which is a style sheet language used for describing the presentation of a document written in HTML or XML.",
      },
      {
        id: 4,
        question:
          "In SQL, which statement is used to retrieve data from a database?",
        options: ["GET", "OPEN", "EXTRACT", "SELECT"],
        correctAnswer: "SELECT",
        explanation:
          "The SELECT statement is used in SQL to retrieve data from a database. It's one of the most fundamental commands in SQL.",
      },
      {
        id: 5,
        question:
          "What is the time complexity of searching in a balanced binary search tree?",
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
        correctAnswer: "O(log n)",
        explanation:
          "The time complexity of searching in a balanced binary search tree is O(log n), where n is the number of nodes. This is because with each comparison, we eliminate half of the remaining tree.",
      },
    ];

    setQuestions(sampleQuestions);
    setUserAnswers(new Array(sampleQuestions.length).fill(""));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Timer logic
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    // Save current answer
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer || "";
    setUserAnswers(newAnswers);

    // Check if answer is correct and update score
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Reset for next question
    setSelectedAnswer(null);
    setTimeLeft(30);

    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score as percentage
      const finalScore = Math.round((score / questions.length) * 100);

      // Create result object
      const resultData = {
        id: quizId,
        score: finalScore,
        totalQuestions: questions.length,
        correctAnswers: score,
        createdAt: new Date().toISOString(),
        duration: 5, // Mock duration in minutes
      };

      setResult(resultData);
      setIsSaving(true);

      try {
        // Save assessment to database using the correct function
        await saveQuizResult(questions, newAnswers, finalScore);
        setShowResult(true);
        toast.success("Assessment saved successfully!");
      } catch (error) {
        toast.error("Failed to save assessment");
        console.error(error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 text-sky-500 animate-spin mb-4" />
        <p className="text-slate-600">Loading questions...</p>
      </div>
    );
  }

  if (showResult) {
    return <QuizResult result={result} />;
  }

  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
  const timeLeftPercent = (timeLeft / 30) * 100;

  return (
    <div>
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-white" />
            <h2 className="text-lg font-medium text-white">
              Technical Interview Questions
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <Clock className="h-3.5 w-3.5 text-white" />
            <span className="text-sm text-white font-medium">
              Question {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/90 mb-1.5">
            <span>Progress</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <Progress
            value={progressPercent}
            className="h-1.5 bg-white/30"
            indicatorClassName="bg-white"
          />
        </div>
      </div>

      <CardContent className="pt-6 pb-4 px-6">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">
                {questions[currentQuestion].question}
              </h3>

              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Time remaining</span>
                <span>{timeLeft} seconds</span>
              </div>
              <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
                    timeLeft < 10
                      ? "bg-red-500"
                      : timeLeft < 20
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${timeLeftPercent}%` }}
                />
              </div>

              {timeLeft <= 5 && (
                <div className="flex items-center gap-1.5 mt-2 text-red-500 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Hurry up!</span>
                </div>
              )}
            </div>

            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 rounded-xl border p-4 transition-all ${
                    selectedAnswer === option
                      ? "border-sky-500 bg-sky-50"
                      : "border-slate-200 hover:border-sky-300"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    className="text-sky-600"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="w-full cursor-pointer text-base font-medium text-slate-700"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </motion.div>
      </CardContent>

      <CardFooter className="flex justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
        <div className="text-sm text-slate-500">
          <span className="font-medium">{currentQuestion + 1}</span> of{" "}
          <span className="font-medium">{questions.length}</span> questions
        </div>
        <Button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer && timeLeft > 0}
          className={`bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-0 ${
            !selectedAnswer && timeLeft > 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {currentQuestion < questions.length - 1 ? (
            <>
              Next Question <ArrowRight className="ml-1 h-4 w-4" />
            </>
          ) : (
            "Finish Quiz"
          )}
        </Button>
      </CardFooter>
    </div>
  );
}
