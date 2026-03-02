import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clear Journey",
  description:
    "Supercharge your business with real-time analytics and data-driven insights.",
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
