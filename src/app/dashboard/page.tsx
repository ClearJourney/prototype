import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-charcoal">Dashboard</h1>
      <p className="mt-1 text-charcoal-light">
        Welcome back. Manage your clients and follow-ups from here.
      </p>
      <Link
        href="/dashboard/clients"
        className="mt-6 inline-block rounded-lg bg-navy px-4 py-2 text-white hover:bg-navy-dark"
      >
        View Clients
      </Link>
    </div>
  );
}
