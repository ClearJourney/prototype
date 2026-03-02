"use client";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  danger?: boolean;
};

export function SettingsCard({
  title,
  description,
  children,
  className = "",
  danger = false,
}: Props) {
  return (
    <section
      className={`rounded-card bg-white p-6 shadow-soft ${
        danger ? "border border-error-muted/30" : "border border-border-light/60"
      } ${className}`}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-lg font-semibold text-charcoal">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-charcoal-light">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
