import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clear Journey — Client Management for Luxury Travel Advisors",
  description:
    "Streamline your client management and follow-up process. Built for independent and boutique luxury travel advisors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
