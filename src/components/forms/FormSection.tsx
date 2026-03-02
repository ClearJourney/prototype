"use client";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  description,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <section className={`rounded-xl border border-[#e8e4de] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className}`}>
      <h2 className="text-base font-semibold text-[#2c2a26]">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-[#5c5a57]">{description}</p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
