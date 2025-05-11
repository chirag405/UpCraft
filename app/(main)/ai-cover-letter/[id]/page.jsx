"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { deleteCoverLetter, getCoverLetter } from "@/actions/cover-letter";
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
import CoverLetterPreview from "../_components/cover-letter-preview";
import { motion } from "@/lib/motion-wrapper";

export default function CoverLetterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [coverLetter, setCoverLetter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch cover letter data
  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        const data = await getCoverLetter(params.id);
        setCoverLetter(data);
      } catch (error) {
        toast.error("Failed to load cover letter");
        console.error("Error fetching cover letter:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCoverLetter();
    }
  }, [params.id]);

  // Handle cover letter deletion
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCoverLetter(params.id);
      toast.success("Cover letter deleted successfully");
      router.push("/ai-cover-letter");
    } catch (error) {
      toast.error("Failed to delete cover letter");
      console.error("Error deleting cover letter:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-8">
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-10 w-96 mb-6" />
        </div>
        <div className="flex justify-between mb-6">
          <Skeleton className="h-8 w-60" />
          <div className="space-x-2">
            <Skeleton className="h-10 w-24 inline-block" />
            <Skeleton className="h-10 w-24 inline-block" />
          </div>
        </div>
        <Skeleton className="h-[800px] w-full" />
      </div>
    );
  }

  if (!coverLetter) {
    return (
      <div className="container mx-auto py-6">
        <Link href="/ai-cover-letter">
          <Button
            variant="link"
            className="gap-2 pl-0 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <FileText className="h-16 w-16 text-blue-300 mb-4" />
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            Cover letter not found
          </h2>
          <p className="text-slate-600 max-w-md mb-6">
            The cover letter you're looking for doesn't exist or may have been
            deleted.
          </p>
          <Link href="/ai-cover-letter/new">
            <Button className="bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white shadow-md">
              Create a new cover letter
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-6"
    >
      <div className="flex flex-col space-y-2">
        <Link href="/ai-cover-letter">
          <Button
            variant="link"
            className="gap-2 pl-0 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <div className="pb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
            {coverLetter.jobTitle}
          </h1>
          <p className="text-slate-600 mt-1">
            {coverLetter.companyName} • Created{" "}
            {new Date(coverLetter.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mb-6">
        <Link href={`/ai-cover-letter/${params.id}/edit`}>
          <Button
            variant="outline"
            className="gap-2 border-blue-200 hover:border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="gap-2 bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border-blue-100">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-blue-900">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600">
                This action cannot be undone. This will permanently delete this
                cover letter from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 text-white hover:bg-red-600"
                disabled={isDeleting}
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <CoverLetterPreview content={coverLetter.content} />
    </motion.div>
  );
}
