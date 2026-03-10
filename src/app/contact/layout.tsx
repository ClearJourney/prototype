import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Clear Journey",
  description:
    "Get in touch with the Clear Journey team — questions, feedback, or report an issue.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
