import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_components/cover-letter-generator";

export default function NewCoverLetterPage() {
  return (
    <div className="container mx-auto py-6">
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

        <div className="pb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
            Create Cover Letter
          </h1>
          <p className="text-slate-600 mt-2">
            Generate a tailored cover letter for your job application
          </p>
        </div>
      </div>

      <CoverLetterGenerator />
    </div>
  );
}
