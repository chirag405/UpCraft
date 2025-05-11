import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";

export default async function OnboardingPage() {
  // Check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <div className="container mx-auto py-8">
        <OnboardingForm industries={industries} />
      </div>
    </main>
  );
}
