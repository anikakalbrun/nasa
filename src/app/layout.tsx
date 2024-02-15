import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ReactQueryProvider from "@/app/utils/react-query-provider";
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
        <ReactQueryProvider>
          <div className="flex flex-col">
            <Header />
            {children}
          </div>
          <ReactQueryDevtools />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
