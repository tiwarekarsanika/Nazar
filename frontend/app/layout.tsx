// "use client"

import type { Metadata } from "next";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { UserProvider } from "@/context/userContext";
import ReactQueryProvider from "@/utils/providers/queryProvider";
import { Suspense } from "react";
import Loading from "./loading";
import { GlobalLoader } from "@/components/ui/global-loader";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopEZ",
  description: "Your one-stop shop for all gadget needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Suspense fallback={<Loading />}>
            <ReactQueryProvider>
              <UserProvider>
                <LayoutWrapper>
                  <GlobalLoader />
                  {children}
                </LayoutWrapper>
              </UserProvider>
            </ReactQueryProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
