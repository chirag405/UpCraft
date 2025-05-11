import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
          My Cover Letters
        </h1>
        <Link href="/ai-cover-letter/new">
          <Button className="bg-gradient-to-r from-blue-500 to-sky-400 text-white hover:from-blue-600 hover:to-sky-500 shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
