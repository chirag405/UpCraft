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
      <Card className="bg-white border border-blue-100 p-8 shadow-md rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl text-blue-700">
            No Cover Letters Yet
          </CardTitle>
          <CardDescription className="text-slate-600">
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-4">
          <Button
            onClick={() => router.push("/ai-cover-letter/new")}
            className="bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white font-medium shadow-md"
          >
            Create Your First Cover Letter
          </Button>
        </CardFooter>
      </Card>
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
          <Card className="group relative overflow-hidden bg-white border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 rounded-xl">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-sky-400"></div>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-blue-700">
                    {letter.jobTitle} at {letter.companyName}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-blue-400" />
                    <span>
                      Created {format(new Date(letter.createdAt), "PPP")}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-blue-50 hover:bg-blue-100 text-blue-500 hover:text-blue-700 transition-colors rounded-full"
                    onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 transition-colors rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white border-blue-100">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-blue-900">
                          Delete Cover Letter?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-600">
                          This action cannot be undone. This will permanently
                          delete your cover letter for{" "}
                          <span className="text-blue-700 font-medium">
                            {letter.jobTitle}
                          </span>{" "}
                          at{" "}
                          <span className="text-blue-700 font-medium">
                            {letter.companyName}
                          </span>
                          .
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(letter.id)}
                          className="bg-red-500 text-white hover:bg-red-600"
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
              <div className="flex items-start gap-2 text-slate-700 text-sm line-clamp-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <Briefcase className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{letter.jobDescription}</p>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                variant="ghost"
                className="text-sm text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
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
        </motion.div>
      ))}
    </div>
  );
}
