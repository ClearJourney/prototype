"use client";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SettingsPanel({ title, description, children }: Props) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-charcoal-light">{description}</p>
        )}
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  );
}
