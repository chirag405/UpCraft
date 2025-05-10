"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Edit2, Eye, Trash2, Clock, Briefcase } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";
import { motion } from "framer-motion";
import { SpotlightEffect } from "@/components/aceternity/spotlight";
import { GlowingCard } from "@/components/aceternity/glow-card";
import { GradientText } from "@/components/aceternity/text-effect";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <GlowingCard className="bg-slate-900 border-slate-800 p-6 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl">
            <GradientText>No Cover Letters Yet</GradientText>
          </CardTitle>
          <CardDescription className="text-slate-400">
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-4">
          <Button
            onClick={() => router.push("/ai-cover-letter/new")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-blue-900/20"
          >
            Create Your First Cover Letter
          </Button>
        </CardFooter>
      </GlowingCard>
    );
  }

  return (
    <div className="space-y-6">
      {coverLetters.map((letter, index) => (
        <motion.div
          key={letter.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <SpotlightEffect className="rounded-xl">
            <Card className="group relative overflow-hidden bg-slate-900/50 border border-slate-800/50 hover:border-blue-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">
                      <GradientText from="from-blue-400" to="to-purple-500">
                        {letter.jobTitle} at {letter.companyName}
                      </GradientText>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <span>
                        Created {format(new Date(letter.createdAt), "PPP")}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-slate-800/50 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                      onClick={() =>
                        router.push(`/ai-cover-letter/${letter.id}`)
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-slate-800/50 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-900 border-slate-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-slate-100">
                            Delete Cover Letter?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-slate-400">
                            This action cannot be undone. This will permanently
                            delete your cover letter for{" "}
                            <span className="text-slate-300 font-medium">
                              {letter.jobTitle}
                            </span>{" "}
                            at{" "}
                            <span className="text-slate-300 font-medium">
                              {letter.companyName}
                            </span>
                            .
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-100">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(letter.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="flex items-start gap-2 text-slate-300 text-sm line-clamp-3 bg-slate-800/30 p-3 rounded-md border border-slate-700/30">
                  <Briefcase className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-400">{letter.jobDescription}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="ghost"
                  className="text-sm text-slate-400 hover:text-blue-400 p-0 h-auto font-normal"
                  onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                >
                  View Cover Letter
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          </SpotlightEffect>
        </motion.div>
      ))}
    </div>
  );
}
