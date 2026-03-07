import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LA Dashboard Annotation Sheet",
  description: "Learning Analytics Dashboard Annotation Sheet for Interview Study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
