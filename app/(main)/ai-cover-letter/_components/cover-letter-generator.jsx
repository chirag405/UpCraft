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
import { motion } from "framer-motion";
import { FloatingLabelInput } from "@/components/aceternity/floating-input";
import { SpotlightEffect } from "@/components/aceternity/spotlight";
import { ThreeDCard } from "@/components/aceternity/3d-card";
import { GradientText } from "@/components/aceternity/text-effect";

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
      <ThreeDCard
        containerClassName="max-w-4xl mx-auto"
        className="bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl border border-slate-800/50 rounded-2xl"
      >
        <SpotlightEffect className="p-1 rounded-2xl">
          <Card className="border-0 bg-transparent">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold">
                <GradientText from="from-blue-400" to="to-purple-500">
                  Job Details
                </GradientText>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Provide information about the job you're applying for to
                generate a tailored cover letter
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <FloatingLabelInput
                      label="Company Name"
                      id="companyName"
                      name="companyName"
                      value={formValues.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full"
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
                      className="w-full"
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
                        className="resize-none w-full bg-slate-800/50 border-slate-700/50 focus:border-blue-500/50 transition-all"
                      />
                      <label
                        htmlFor="jobDescription"
                        className="absolute left-3 top-2 text-sm text-slate-400 pointer-events-none"
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
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 shadow-lg shadow-blue-900/20"
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
        </SpotlightEffect>
      </ThreeDCard>
    </div>
  );
}
