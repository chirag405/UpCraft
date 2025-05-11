import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";
import HeaderSection from "./_components/header-section";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <HeaderSection />

        <ResumeBuilder initialData={resume} />

        <div className="max-w-4xl mx-auto mt-16 bg-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-start gap-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Resume Building Tips
              </h3>
              <ul className="text-blue-700/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    Tailor your resume to each job application by highlighting
                    relevant skills
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    Use action verbs and quantify your achievements with metrics
                    when possible
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>
                    Keep your resume concise and focused on the most relevant
                    experience
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
