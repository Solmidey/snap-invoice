import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnapInvoice — Free Professional Invoice & Quote Generator",
  description: "Create clean, professional invoices and quotes in seconds. Free, no signup required. Download as PDF instantly.",
  keywords: ["invoice generator", "free invoice", "quote generator", "PDF invoice", "freelancer invoice"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}