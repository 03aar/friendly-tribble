import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Engage - Your Intelligent Work Companion",
  description: "The intelligent workplace companion that helps you succeed at your job, get recognized for your work, and stay fulfilled — without burning out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
