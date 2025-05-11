"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  BrainCircuit,
  Rocket,
  FileEdit,
  Home,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="rounded-full bg-gradient-to-r from-blue-400 to-blue-500 p-2">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
              UpCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-blue-900 hover:text-blue-600 hover:bg-blue-50 rounded-full font-medium px-5"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-blue-900 hover:text-blue-600 hover:bg-blue-50 rounded-full font-medium px-5"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Tools
                    <ChevronDown className="h-3.5 w-3.5 ml-1.5 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white rounded-2xl p-2 shadow-xl border border-blue-100">
                  <Link href="/resume">
                    <DropdownMenuItem className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 cursor-pointer p-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2.5 rounded-xl">
                          <FileText className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-blue-900">
                            Resume Builder
                          </p>
                          <p className="text-xs text-blue-600/80">
                            Create professional resumes
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/ai-cover-letter">
                    <DropdownMenuItem className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 cursor-pointer p-3 mt-1">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2.5 rounded-xl">
                          <FileEdit className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-blue-900">
                            AI Cover Letter
                          </p>
                          <p className="text-xs text-blue-600/80">
                            Generate tailored cover letters
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/interview">
                    <DropdownMenuItem className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 cursor-pointer p-3 mt-1">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2.5 rounded-xl">
                          <BrainCircuit className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-blue-900">
                            Interview Prep
                          </p>
                          <p className="text-xs text-blue-600/80">
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
                className="text-blue-900 hover:text-blue-600 hover:bg-blue-50 rounded-full font-medium px-5"
              >
                <Link href="/interview">Practice Interviews</Link>
              </Button>
            </SignedIn>
          </div>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <Button className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-6 py-6 rounded-full shadow-lg shadow-blue-400/20">
                  Get Started
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button
                variant="outline"
                className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium hidden md:flex"
              >
                <Rocket className="h-4 w-4 mr-2" />
                <span>Upgrade</span>
              </Button>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                    userButtonPopoverCard:
                      "bg-white border border-blue-100 shadow-xl rounded-2xl",
                    userPreviewMainIdentifier: "text-blue-900 font-medium",
                    userButtonPopoverActionButton:
                      "text-blue-800 hover:bg-blue-50",
                    userButtonPopoverActionButtonText: "font-medium",
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
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white border border-blue-100 rounded-2xl p-2 mt-2 shadow-xl md:hidden">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-blue-600/80">
                      Navigation
                    </p>
                  </div>

                  <Link href="/dashboard">
                    <DropdownMenuItem className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 cursor-pointer p-3">
                      <div className="flex items-center gap-3">
                        <Home className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-900 font-medium">
                          Dashboard
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/interview">
                    <DropdownMenuItem className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 cursor-pointer p-3">
                      <div className="flex items-center gap-3">
                        <BrainCircuit className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-900 font-medium">
                          Interview Prep
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator className="my-1 bg-blue-100" />

                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-blue-600/80">
                      Tools
                    </p>
                  </div>

                  <Link href="/resume">
                    <DropdownMenuItem className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 cursor-pointer p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-900 font-medium">
                          Resume Builder
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/ai-cover-letter">
                    <DropdownMenuItem className="rounded-xl hover:bg-blue-50 focus:bg-blue-50 cursor-pointer p-3">
                      <div className="flex items-center gap-3">
                        <FileEdit className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-900 font-medium">
                          AI Cover Letter
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator className="my-1 bg-blue-100" />

                  <DropdownMenuItem className="rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white cursor-pointer p-3">
                    <div className="flex items-center gap-3 w-full">
                      <Rocket className="h-4 w-4" />
                      <span className="font-medium">Upgrade Account</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
