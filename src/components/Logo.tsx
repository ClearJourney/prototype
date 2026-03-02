import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`font-medium text-inherit no-underline ${className}`}>
      Clear Journey
    </Link>
  );
}

export function LogoLight({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`font-medium text-white no-underline ${className}`}>
      Clear Journey
    </Link>
  );
}
