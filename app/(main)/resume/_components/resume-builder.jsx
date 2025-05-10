"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import { ThreeDCard } from "@/components/aceternity/3d-card";
import { SpotlightEffect } from "@/components/aceternity/spotlight";
import { motion } from "framer-motion";
import { GradientText } from "@/components/aceternity/text-effect";
import { FloatingLabelInput } from "@/components/aceternity/floating-input";
import { Card, CardContent } from "@/components/ui/card";

const TYPES = {
  EXPERIENCE: "Experience",
  EDUCATION: "Education",
  PROJECTS: "Projects",
  SKILLS: "Skills",
};

export default function ResumeBuilder({ initialData = null }) {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("builder");
  const [savingResume, setSavingResume] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [editorHeight, setEditorHeight] = useState("700px");
  const [alertShown, setAlertShown] = useState(false);

  const defaultValues = initialData || {
    headline: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    education: [],
    experience: [],
    projects: [],
    skills: [],
    additionalInfo: "",
  };

  useEffect(() => {
    if (user && !defaultValues.name) {
      setValue("name", user.fullName || "");
      setValue("email", user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user]);

  const { loading: savingData, fn: saveResumeData } = useFetch(saveResume);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues,
  });

  const formValues = watch();

  const generateMarkdown = () => {
    let markdown = `# ${formValues.name}\n\n`;

    if (formValues.headline) {
      markdown += `## ${formValues.headline}\n\n`;
    }

    // Contact details
    const contactDetails = [];
    if (formValues.email) contactDetails.push(`Email: ${formValues.email}`);
    if (formValues.phone) contactDetails.push(`Phone: ${formValues.phone}`);
    if (formValues.location)
      contactDetails.push(`Location: ${formValues.location}`);
    if (formValues.website)
      contactDetails.push(
        `Website: [${formValues.website}](${formValues.website})`
      );

    if (contactDetails.length > 0) {
      markdown += contactDetails.join(" | ") + "\n\n";
    }

    // Experience
    if (formValues.experience.length > 0) {
      markdown += `## Experience\n\n`;
      markdown += entriesToMarkdown(formValues.experience);
    }

    // Education
    if (formValues.education.length > 0) {
      markdown += `## Education\n\n`;
      markdown += entriesToMarkdown(formValues.education);
    }

    // Projects
    if (formValues.projects.length > 0) {
      markdown += `## Projects\n\n`;
      markdown += entriesToMarkdown(formValues.projects);
    }

    // Skills
    if (formValues.skills.length > 0) {
      markdown += `## Skills\n\n`;
      markdown += entriesToMarkdown(formValues.skills);
    }

    // Additional
    if (formValues.additionalInfo) {
      markdown += `## Additional Information\n\n${formValues.additionalInfo}\n`;
    }

    return markdown;
  };

  // Generate preview markdown
  const previewMarkdown = generateMarkdown();

  const onSubmit = async (data) => {
    try {
      setSavingResume(true);
      // Prepare the data for saving
      const saveData = {
        ...data,
        content: previewMarkdown,
      };

      await saveResumeData(saveData);
      toast.success("Resume saved successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to save resume");
    } finally {
      setSavingResume(false);
    }
  };

  const exportToPDF = async () => {
    try {
      setExportingPdf(true);
      const element = document.getElementById("resume-preview-content");
      if (!element) {
        toast.error("Preview content not found");
        return;
      }

      const opt = {
        margin: [10, 10],
        filename: `${formValues.name || "Resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF exported successfully!");
    } catch (error) {
      toast.error("Failed to export PDF: " + error.message);
    } finally {
      setExportingPdf(false);
    }
  };

  // Show alert if navigating to preview with no data
  const handleTabChange = (value) => {
    if (
      value === "preview" &&
      !alertShown &&
      !(
        formValues.education.length ||
        formValues.experience.length ||
        formValues.projects.length ||
        formValues.skills.length
      )
    ) {
      toast.warning("Add some sections to see a preview");
      setAlertShown(true);
      return;
    }
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <ThreeDCard containerClassName="max-w-5xl mx-auto">
        <SpotlightEffect className="w-full p-1 rounded-xl">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-0 shadow-xl">
            <CardContent className="p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Tabs
                  defaultValue="builder"
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                      <GradientText from="from-blue-400" to="to-purple-500">
                        Resume Builder
                      </GradientText>
                    </h1>
                    <TabsList className="bg-slate-800/40 border border-slate-700/40">
                      <TabsTrigger
                        value="builder"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Builder
                      </TabsTrigger>
                      <TabsTrigger
                        value="preview"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                      >
                        <Monitor className="h-4 w-4 mr-2" />
                        Preview
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="builder" className="space-y-6">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Personal Information */}
                      <div className="rounded-xl bg-slate-800/20 p-6 border border-slate-700/30">
                        <h2 className="text-xl font-semibold mb-4 text-slate-200">
                          Personal Information
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <FloatingLabelInput
                              id="name"
                              label="Full Name"
                              error={!!errors.name}
                              {...register("name")}
                            />
                            {errors.name && (
                              <p className="text-sm text-red-500 mt-1">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <FloatingLabelInput
                              id="headline"
                              label="Headline (e.g. Senior Developer)"
                              error={!!errors.headline}
                              {...register("headline")}
                            />
                            {errors.headline && (
                              <p className="text-sm text-red-500 mt-1">
                                {errors.headline.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <FloatingLabelInput
                              id="email"
                              label="Email"
                              type="email"
                              error={!!errors.email}
                              {...register("email")}
                            />
                            {errors.email && (
                              <p className="text-sm text-red-500 mt-1">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <FloatingLabelInput
                              id="phone"
                              label="Phone"
                              error={!!errors.phone}
                              {...register("phone")}
                            />
                            {errors.phone && (
                              <p className="text-sm text-red-500 mt-1">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <FloatingLabelInput
                              id="location"
                              label="Location"
                              error={!!errors.location}
                              {...register("location")}
                            />
                            {errors.location && (
                              <p className="text-sm text-red-500 mt-1">
                                {errors.location.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <FloatingLabelInput
                              id="website"
                              label="Website"
                              error={!!errors.website}
                              {...register("website")}
                            />
                            {errors.website && (
                              <p className="text-sm text-red-500 mt-1">
                                {errors.website.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="rounded-xl bg-slate-800/20 p-6 border border-slate-700/30">
                        <h2 className="text-xl font-semibold mb-4 text-slate-200">
                          {TYPES.EXPERIENCE}
                        </h2>
                        <EntryForm
                          type={TYPES.EXPERIENCE}
                          entries={formValues.experience}
                          onChange={(newEntries) =>
                            setValue("experience", newEntries)
                          }
                        />
                      </div>

                      {/* Education */}
                      <div className="rounded-xl bg-slate-800/20 p-6 border border-slate-700/30">
                        <h2 className="text-xl font-semibold mb-4 text-slate-200">
                          {TYPES.EDUCATION}
                        </h2>
                        <EntryForm
                          type={TYPES.EDUCATION}
                          entries={formValues.education}
                          onChange={(newEntries) =>
                            setValue("education", newEntries)
                          }
                        />
                      </div>

                      {/* Projects */}
                      <div className="rounded-xl bg-slate-800/20 p-6 border border-slate-700/30">
                        <h2 className="text-xl font-semibold mb-4 text-slate-200">
                          {TYPES.PROJECTS}
                        </h2>
                        <EntryForm
                          type={TYPES.PROJECTS}
                          entries={formValues.projects}
                          onChange={(newEntries) =>
                            setValue("projects", newEntries)
                          }
                        />
                      </div>

                      {/* Skills */}
                      <div className="rounded-xl bg-slate-800/20 p-6 border border-slate-700/30">
                        <h2 className="text-xl font-semibold mb-4 text-slate-200">
                          {TYPES.SKILLS}
                        </h2>
                        <EntryForm
                          type={TYPES.SKILLS}
                          entries={formValues.skills}
                          onChange={(newEntries) =>
                            setValue("skills", newEntries)
                          }
                        />
                      </div>

                      {/* Additional Info */}
                      <div className="rounded-xl bg-slate-800/20 p-6 border border-slate-700/30">
                        <h2 className="text-xl font-semibold mb-4 text-slate-200">
                          Additional Information
                        </h2>
                        <div>
                          <Controller
                            name="additionalInfo"
                            control={control}
                            render={({ field }) => (
                              <MDEditor
                                {...field}
                                height={200}
                                textareaProps={{
                                  placeholder:
                                    "Add additional information such as certifications, languages, etc. (optional)",
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end space-x-4">
                        <Button
                          type="submit"
                          disabled={savingData}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-900/20"
                        >
                          {savingData ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save Resume
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="preview">
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <Button
                          onClick={exportToPDF}
                          disabled={exportingPdf}
                          className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg"
                        >
                          {exportingPdf ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Exporting...
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Export PDF
                            </>
                          )}
                        </Button>
                      </div>
                      <div
                        id="resume-preview-content"
                        className="bg-white rounded-lg p-8 text-gray-800 shadow-2xl"
                      >
                        <MDEditor.Markdown
                          source={previewMarkdown}
                          style={{ backgroundColor: "white", color: "#333" }}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </CardContent>
          </Card>
        </SpotlightEffect>
      </ThreeDCard>
    </div>
  );
}
