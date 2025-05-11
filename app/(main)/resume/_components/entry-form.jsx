"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { motion } from "@/lib/motion-wrapper";
import {
  FloatingLabelInput,
  FloatingLabelTextarea,
} from "@/components/aceternity/floating-input";
import { SpotlightEffect } from "@/components/aceternity/spotlight";
import { GradientText } from "@/components/aceternity/text-effect";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [enhancingDescription, setEnhancingDescription] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  });

  const watchCurrent = watch("current");
  const watchDescription = watch("description");

  const { loading: improvingDescription, fn: improveDescription } =
    useFetch(improveWithAI);

  useEffect(() => {
    if (watchCurrent) {
      setValue("endDate", "");
    }
  }, [watchCurrent, setValue]);

  const onSubmit = (data) => {
    const newEntries = [...entries];
    if (editIndex >= 0) {
      newEntries[editIndex] = data;
    } else {
      newEntries.push(data);
    }
    onChange(newEntries);
    setIsAdding(false);
    setEditIndex(-1);
    reset();
  };

  const removeEntry = (index) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    onChange(newEntries);
  };

  const editEntry = (index) => {
    setEditIndex(index);
    const entry = entries[index];
    Object.entries(entry).forEach(([key, value]) => {
      setValue(key, value);
    });
    setIsAdding(true);
  };

  const handleEnhance = async () => {
    if (!watchDescription.trim()) {
      toast.error("Please enter a description first");
      return;
    }

    setEnhancingDescription(true);
    try {
      const enhancedDescription = await improveDescription(watchDescription);
      if (enhancedDescription) {
        setValue("description", enhancedDescription);
        toast.success("Description enhanced successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to enhance description");
    } finally {
      setEnhancingDescription(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {entries.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <SpotlightEffect>
              <Card className="bg-white border border-sky-100 shadow-sm hover:shadow-md transition-all rounded-xl">
                <CardHeader className="flex flex-row items-start justify-between pb-3">
                  <div className="space-y-1">
                    <CardTitle className="text-xl text-sky-950">
                      {item.title}
                    </CardTitle>
                    <div className="text-sky-700">{item.organization}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => editEntry(index)}
                      className="h-8 w-8 p-0 bg-sky-50 hover:bg-sky-100 hover:text-sky-600 text-sky-500 rounded-full"
                    >
                      <span className="sr-only">Edit</span>
                      <Sparkles className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeEntry(index)}
                      className="h-8 w-8 p-0 bg-sky-50 hover:bg-red-50 hover:text-red-500 text-sky-500 rounded-full"
                    >
                      <span className="sr-only">Remove</span>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-sky-600 font-medium">
                    {item.current
                      ? `${formatDisplayDate(item.startDate)} - Present`
                      : `${formatDisplayDate(
                          item.startDate
                        )} - ${formatDisplayDate(item.endDate)}`}
                  </p>
                  <div className="mt-2 text-sm text-sky-800 whitespace-pre-wrap bg-sky-50 p-4 rounded-lg border border-sky-100">
                    {item.description}
                  </div>
                </CardContent>
              </Card>
            </SpotlightEffect>
          </motion.div>
        ))}
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <SpotlightEffect>
            <Card className="bg-white border border-sky-100 shadow-md rounded-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>
                    <GradientText from="from-sky-500" to="to-blue-600">
                      {editIndex >= 0 ? `Edit ${type}` : `Add ${type}`}
                    </GradientText>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <FloatingLabelInput
                        id="title"
                        label="Title/Position"
                        error={!!errors.title}
                        {...register("title")}
                        required
                        className="border-sky-200 focus:border-sky-500"
                      />
                      {errors.title && (
                        <p className="text-sm text-red-500">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <FloatingLabelInput
                        id="organization"
                        label="Organization/Company"
                        error={!!errors.organization}
                        {...register("organization")}
                        required
                        className="border-sky-200 focus:border-sky-500"
                      />
                      {errors.organization && (
                        <p className="text-sm text-red-500">
                          {errors.organization.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <FloatingLabelInput
                        type="month"
                        id="startDate"
                        label="Start Date"
                        error={!!errors.startDate}
                        {...register("startDate")}
                        required
                        className="pt-6 pb-2 border-sky-200 focus:border-sky-500"
                      />
                      {errors.startDate && (
                        <p className="text-sm text-red-500">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="relative">
                        <FloatingLabelInput
                          type="month"
                          id="endDate"
                          label="End Date"
                          disabled={watchCurrent}
                          error={!!errors.endDate && !watchCurrent}
                          {...register("endDate")}
                          required={!watchCurrent}
                          className={`border-sky-200 focus:border-sky-500 ${
                            watchCurrent ? "opacity-50" : ""
                          }`}
                        />
                        {errors.endDate && !watchCurrent && (
                          <p className="text-sm text-red-500">
                            {errors.endDate.message}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id="current"
                          {...register("current")}
                          className="h-4 w-4 rounded border-sky-300 bg-white text-sky-600 focus:ring-sky-500"
                        />
                        <label
                          htmlFor="current"
                          className="ml-2 text-sm text-sky-700"
                        >
                          Currently working here
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <FloatingLabelTextarea
                        id="description"
                        label="Description"
                        error={!!errors.description}
                        {...register("description")}
                        required
                        className="min-h-32 border-sky-200 focus:border-sky-500"
                      />
                      {errors.description && (
                        <p className="text-sm text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end mt-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleEnhance}
                        disabled={
                          enhancingDescription || !watchDescription.trim()
                        }
                        className="flex items-center gap-1.5 bg-sky-50 border-sky-200 text-sky-600 hover:bg-sky-100 hover:text-sky-700 hover:border-sky-300"
                      >
                        {enhancingDescription ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Enhancing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            <span>Enhance with AI</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      setEditIndex(-1);
                      reset();
                    }}
                    className="border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sm"
                  >
                    {editIndex >= 0 ? "Save Changes" : `Add ${type}`}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </SpotlightEffect>
        </motion.div>
      )}

      {!isAdding && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            className="w-full bg-white border border-sky-200 text-sky-600 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 transition-all rounded-lg"
            variant="outline"
            onClick={() => setIsAdding(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add {type}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
