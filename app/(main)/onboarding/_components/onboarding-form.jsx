"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-3xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Complete Your Profile
          </h1>
          <p className="text-blue-500 mt-2">
            Tell us about yourself so we can personalize your experience
          </p>
        </div>

        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="industry"
                    className="text-blue-600 font-medium"
                  >
                    Industry
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("industry", value);
                      setSelectedIndustry(
                        industries.find((ind) => ind.id === value)
                      );
                      setValue("subIndustry", "");
                    }}
                  >
                    <SelectTrigger
                      id="industry"
                      className="border-blue-200 focus:ring-blue-300"
                    >
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-blue-200">
                      <SelectGroup>
                        <SelectLabel>Industries</SelectLabel>
                        {industries.map((ind) => (
                          <SelectItem key={ind.id} value={ind.id}>
                            {ind.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.industry.message}
                    </p>
                  )}
                </div>

                {watchIndustry && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="subIndustry"
                      className="text-blue-600 font-medium"
                    >
                      Specialization
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("subIndustry", value)}
                    >
                      <SelectTrigger
                        id="subIndustry"
                        className="border-blue-200 focus:ring-blue-300"
                      >
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-blue-200">
                        <SelectGroup>
                          <SelectLabel>Specializations</SelectLabel>
                          {selectedIndustry?.subIndustries.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.subIndustry && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.subIndustry.message}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="experience"
                    className="text-blue-600 font-medium"
                  >
                    Years of Experience
                  </Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="Enter years of experience"
                    className="border-blue-200 focus:ring-blue-300"
                    {...register("experience")}
                  />
                  {errors.experience && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-blue-600 font-medium">
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    placeholder="e.g., Python, JavaScript, Project Management"
                    className="border-blue-200 focus:ring-blue-300"
                    {...register("skills")}
                  />
                  <p className="text-xs text-blue-400">
                    Separate multiple skills with commas
                  </p>
                  {errors.skills && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.skills.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-blue-600 font-medium">
                  Professional Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your professional background..."
                  className="h-32 border-blue-200 focus:ring-blue-300"
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg transition-all"
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving your profile...
                  </>
                ) : (
                  "Complete Your Profile"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="text-center mt-6 text-blue-400 text-sm">
          This information helps us tailor our recommendations to your career
          path
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
