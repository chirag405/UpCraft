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
  Star,
  BarChart,
  FileCode,
  Menu,
  X,
  BrainCircuit,
  FileEdit,
  Home,
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
    <header className="fixed top-0 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 z-50 shadow-sm">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-1.5">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            UpCraft
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 gap-2"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 gap-2"
                >
                  <FileCode className="h-4 w-4" />
                  <span>Tools</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 shadow-lg">
                <Link href="/resume">
                  <DropdownMenuItem className="rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">
                    <div className="flex items-center gap-3 py-1">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-md">
                        <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium">Resume Builder</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Create professional resumes
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </Link>

                <Link href="/ai-cover-letter">
                  <DropdownMenuItem className="rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer mt-1">
                    <div className="flex items-center gap-3 py-1">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                        <FileEdit className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">AI Cover Letter</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Generate tailored cover letters
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </Link>

                <Link href="/interview">
                  <DropdownMenuItem className="rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer mt-1">
                    <div className="flex items-center gap-3 py-1">
                      <div className="bg-cyan-100 dark:bg-cyan-900/30 p-2 rounded-md">
                        <BrainCircuit className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-medium">Interview Prep</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Practice technical interviews
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              asChild
              variant="ghost"
              className="text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Link href="/interview">
                <span>Practice Interviews</span>
              </Link>
            </Button>
          </SignedIn>
        </div>

        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button
              variant="outline"
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 hidden md:flex"
            >
              <Rocket className="h-4 w-4 mr-2" />
              <span>Upgrade</span>
            </Button>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                  userButtonPopoverCard:
                    "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg",
                  userPreviewMainIdentifier:
                    "text-zinc-900 dark:text-zinc-100 font-medium",
                  userButtonPopoverActionButton:
                    "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  userButtonPopoverActionButtonText: "font-normal",
                },
              }}
              afterSignOutUrl="/"
            />

            {/* Mobile menu button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-700 dark:text-zinc-300"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 mt-2 shadow-lg md:hidden">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Navigation
                  </p>
                </div>

                <Link href="/dashboard">
                  <DropdownMenuItem className="rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">
                    <div className="flex items-center gap-3 py-1.5">
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </div>
                  </DropdownMenuItem>
                </Link>

                <Link href="/interview">
                  <DropdownMenuItem className="rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">
                    <div className="flex items-center gap-3 py-1.5">
                      <BrainCircuit className="h-4 w-4" />
                      <span>Interview Prep</span>
                    </div>
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator className="my-1 bg-zinc-200 dark:bg-zinc-800" />

                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Tools
                  </p>
                </div>

                <Link href="/resume">
                  <DropdownMenuItem className="rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">
                    <div className="flex items-center gap-3 py-1.5">
                      <FileText className="h-4 w-4" />
                      <span>Resume Builder</span>
                    </div>
                  </DropdownMenuItem>
                </Link>

                <Link href="/ai-cover-letter">
                  <DropdownMenuItem className="rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-zinc-100 dark:focus:bg-zinc-800 cursor-pointer">
                    <div className="flex items-center gap-3 py-1.5">
                      <FileEdit className="h-4 w-4" />
                      <span>AI Cover Letter</span>
                    </div>
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator className="my-1 bg-zinc-200 dark:bg-zinc-800" />

                <DropdownMenuItem className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white cursor-pointer">
                  <div className="flex items-center gap-3 py-1.5 w-full">
                    <Rocket className="h-4 w-4" />
                    <span>Upgrade Account</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
