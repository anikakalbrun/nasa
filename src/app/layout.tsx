import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

import ReactQueryProvider from "@/app/utils/react-query-provider";
import ReactNextUIProvider from "@/app/utils/next-ui-provider";
import "./globals.css";
import Header from "@/app/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NASA blog",
  description: "Astronomy Picture of the Day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ReactQueryProvider>
            <ReactNextUIProvider>
              <div className="flex flex-col">
                <Header />
                {children}
              </div>
            </ReactNextUIProvider>
            <ReactQueryDevtools />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
