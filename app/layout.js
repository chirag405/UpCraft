import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { light } from "@clerk/themes";
import { Rocket } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UpCraft",
  description: "",
  icons: {
    icon: "public/logo_upcraft.png", // Standard favicon
    shortcut: "/favicon-32x32.png", // Alternative icon
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: light,
        variables: {
          colorPrimary: "#0ea5e9",
          colorBackground: "#ffffff",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className} bg-white text-sky-950`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-gradient-to-r from-sky-50 to-blue-50 py-12 border-t border-sky-100">
              <div className="container mx-auto px-4 text-center text-sky-700"></div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
