"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import { motion } from "@/lib/motion-wrapper";
import { FloatingLabelInput } from "@/components/aceternity/floating-input";

export default function CoverLetterGenerator() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: formValues,
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  // Update content when letter is generated
  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter, router, reset]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setValue(name, value);
  };

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-4xl mx-auto overflow-hidden bg-white shadow-lg border border-blue-100 rounded-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-sky-50 pb-6">
          <CardTitle className="text-2xl font-bold text-blue-700">
            Job Details
          </CardTitle>
          <CardDescription className="text-slate-600">
            Provide information about the job you're applying for to generate a
            tailored cover letter
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div>
                <FloatingLabelInput
                  label="Company Name"
                  id="companyName"
                  name="companyName"
                  value={formValues.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full border-blue-200 focus:border-blue-400 shadow-sm"
                  error={!!errors.companyName}
                />
                {errors.companyName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.companyName.message}
                  </motion.p>
                )}
              </div>

              <div>
                <FloatingLabelInput
                  label="Job Title"
                  id="jobTitle"
                  name="jobTitle"
                  value={formValues.jobTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full border-blue-200 focus:border-blue-400 shadow-sm"
                  error={!!errors.jobTitle}
                />
                {errors.jobTitle && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.jobTitle.message}
                  </motion.p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Textarea
                    placeholder="Enter job description here"
                    id="jobDescription"
                    {...register("jobDescription")}
                    rows={8}
                    className="resize-none w-full bg-white border-blue-200 focus:border-blue-400 shadow-sm transition-all pt-8"
                  />
                  <label
                    htmlFor="jobDescription"
                    className="absolute left-3 top-2 text-sm text-blue-500 font-medium pointer-events-none"
                  >
                    Job Description *
                  </label>
                </div>
                {errors.jobDescription && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.jobDescription.message}
                  </motion.p>
                )}
              </div>
            </div>

            <CardFooter className="px-0 pb-0">
              <Button
                type="submit"
                disabled={generating}
                className="w-full bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white font-medium py-2 shadow-md"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Cover Letter
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
