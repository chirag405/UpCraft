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
  Plus,
  FileText,
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
import { motion } from "@/lib/motion-wrapper";
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
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto">
          <Card className="bg-white border-blue-100 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-5 border-b border-blue-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-blue-900">
                      Resume Builder
                    </h1>
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} className="w-full">
                <div className="bg-white px-6 py-2 border-b border-blue-100 flex justify-end">
                  <TabsList className="bg-white border border-blue-100 p-1 rounded-lg shadow-sm">
                    <TabsTrigger
                      value="builder"
                      onClick={() => handleTabChange("builder")}
                      className={`rounded-md px-4 py-2 ${
                        activeTab === "builder"
                          ? "bg-blue-500 text-white"
                          : "text-blue-700"
                      }`}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Builder
                    </TabsTrigger>
                    <TabsTrigger
                      value="preview"
                      onClick={() => handleTabChange("preview")}
                      className={`rounded-md px-4 py-2 ${
                        activeTab === "preview"
                          ? "bg-blue-500 text-white"
                          : "text-blue-700"
                      }`}
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="builder" className="p-6 pt-8 space-y-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Personal Information */}
                    <div className="rounded-xl bg-blue-50 p-6 border border-blue-100">
                      <h2 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-md mr-2">
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
                            className="text-blue-600"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="relative">
                          <Input
                            id="name"
                            placeholder="Full Name"
                            className="border border-blue-200 focus:border-blue-400 h-12 rounded-lg bg-white pl-4 shadow-sm"
                            error={!!errors.name}
                            {...register("name")}
                          />
                          {errors.name && (
                            <p className="text-sm text-red-500 mt-1 pl-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <Input
                            id="headline"
                            placeholder="Headline (e.g. Senior Developer)"
                            className="border border-blue-200 focus:border-blue-400 h-12 rounded-lg bg-white pl-4 shadow-sm"
                            error={!!errors.headline}
                            {...register("headline")}
                          />
                          {errors.headline && (
                            <p className="text-sm text-red-500 mt-1 pl-1">
                              {errors.headline.message}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <Input
                            id="email"
                            placeholder="Email"
                            type="email"
                            className="border border-blue-200 focus:border-blue-400 h-12 rounded-lg bg-white pl-4 shadow-sm"
                            error={!!errors.email}
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-sm text-red-500 mt-1 pl-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <Input
                            id="phone"
                            placeholder="Phone"
                            className="border border-blue-200 focus:border-blue-400 h-12 rounded-lg bg-white pl-4 shadow-sm"
                            error={!!errors.phone}
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-500 mt-1 pl-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <Input
                            id="location"
                            placeholder="Location"
                            className="border border-blue-200 focus:border-blue-400 h-12 rounded-lg bg-white pl-4 shadow-sm"
                            error={!!errors.location}
                            {...register("location")}
                          />
                          {errors.location && (
                            <p className="text-sm text-red-500 mt-1 pl-1">
                              {errors.location.message}
                            </p>
                          )}
                        </div>
                        <div className="relative">
                          <Input
                            id="website"
                            placeholder="Website"
                            className="border border-blue-200 focus:border-blue-400 h-12 rounded-lg bg-white pl-4 shadow-sm"
                            error={!!errors.website}
                            {...register("website")}
                          />
                          {errors.website && (
                            <p className="text-sm text-red-500 mt-1 pl-1">
                              {errors.website.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="rounded-xl bg-blue-50 p-6 border border-blue-100">
                      <h2 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-md mr-2">
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
                            className="text-blue-600"
                          >
                            <rect
                              width="20"
                              height="14"
                              x="2"
                              y="7"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                          </svg>
                        </div>
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
                    <div className="rounded-xl bg-blue-50 p-6 border border-blue-100">
                      <h2 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-md mr-2">
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
                            className="text-blue-600"
                          >
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                          </svg>
                        </div>
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
                    <div className="rounded-xl bg-blue-50 p-6 border border-blue-100">
                      <h2 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-md mr-2">
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
                            className="text-blue-600"
                          >
                            <path d="m12 14 4-4"></path>
                            <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                          </svg>
                        </div>
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
                    <div className="rounded-xl bg-blue-50 p-6 border border-blue-100">
                      <h2 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-md mr-2">
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
                            className="text-blue-600"
                          >
                            <path d="m12 14 4-4"></path>
                            <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                          </svg>
                        </div>
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
                    <div className="rounded-xl bg-blue-50 p-6 border border-blue-100">
                      <h2 className="text-xl font-semibold mb-4 text-blue-900 flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-md mr-2">
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
                            className="text-blue-600"
                          >
                            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                            <path d="M9 13h6"></path>
                            <path d="M9 17h6"></path>
                          </svg>
                        </div>
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
                              preview="edit"
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
                        className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white py-6 px-8 rounded-lg shadow-lg shadow-blue-200/50 font-medium"
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

                <TabsContent value="preview" className="p-6 space-y-6">
                  <div className="flex justify-end mb-4">
                    <Button
                      onClick={exportToPDF}
                      disabled={exportingPdf}
                      className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white py-6 px-6 rounded-lg shadow-lg shadow-blue-200/50 font-medium"
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
                    className="bg-white rounded-xl p-8 text-gray-800 shadow-xl border border-blue-100"
                  >
                    <MDEditor.Markdown
                      source={previewMarkdown}
                      style={{ backgroundColor: "white", color: "#333" }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
