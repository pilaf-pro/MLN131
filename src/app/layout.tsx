import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { PageTransition } from "@/components/page-transition";
import { ConfuciusChatbot } from "@/components/confucius-chatbot";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chủ Nghĩa Xã Hội",
  description:
    "Tìm hiểu về chủ nghĩa xã hội qua các bài viết, phân tích và tài nguyên đa dạng. Khám phá lịch sử, lý thuyết và ứng dụng của chủ nghĩa xã hội trong thế giới hiện đại.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.className} font-sans`}
        suppressHydrationWarning={true}
      >
        <PageTransition>
          <Suspense fallback={null}>{children}</Suspense>
        </PageTransition>
        {/* <ConfuciusChatbot /> */}
        <Analytics />
      </body>
    </html>
  );
}
