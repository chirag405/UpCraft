import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Rocket,
  PenBox,
  StarIcon,
  BarChart,
  FileCode,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 z-50">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* <div className="p-2 rounded-lg">
            <Image src="/top_logo.png" width={100} height={40} />
          </div> */}
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent drop-shadow-md tracking-wide px-3">
            Up<span className="text-white">Craft</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:bg-slate-800/50 hover:text-white gap-2"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-700">
                <DropdownMenuItem className="hover:bg-slate-700/50 focus:bg-slate-700/50">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <BarChart className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-medium text-slate-100">Analytics</p>
                      <p className="text-sm text-slate-400">Career Insights</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="hover:bg-slate-700/50 focus:bg-slate-700/50">
                  <Link
                    href="/resume"
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <FileCode className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium text-slate-100">
                        Resume Builder
                      </p>
                      <p className="text-sm text-slate-400">
                        AI-Powered Editor
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="hover:bg-slate-700/50 focus:bg-slate-700/50">
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <FileCode className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium text-slate-100">
                        Ai Cover Letter
                      </p>
                      <p className="text-sm text-slate-400">
                        Professional cover letter builder
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              asChild
              variant="ghost"
              className="group relative overflow-hidden text-slate-300 hover:bg-slate-800/50 hover:text-white"
            >
              <Link href="/interview">
                <span className="relative z-10">Interview Prep</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                  userButtonPopoverCard: "bg-slate-800 border-slate-700",
                  userPreviewMainIdentifier: "text-slate-100",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};
export default Header;
