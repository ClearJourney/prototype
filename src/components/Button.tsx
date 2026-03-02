import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  disabled,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-navy/30 disabled:opacity-50";
  const variants = {
    primary:
      "bg-navy text-white hover:bg-navy-dark px-5 py-2.5",
    secondary:
      "bg-white border border-border-light text-charcoal hover:bg-sand-warm px-5 py-2.5",
    ghost: "text-charcoal hover:bg-black/5 px-5 py-2.5",
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
