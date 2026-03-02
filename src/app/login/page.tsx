import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand">
      <div className="w-full max-w-sm rounded-xl border border-border-light bg-white p-8 shadow-sm">
        <Link href="/" className="text-xl font-medium text-charcoal">
          clear journey
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-charcoal">Sign in</h1>
        <p className="mt-2 text-sm text-charcoal-light">
          Enter your credentials to access your account.
        </p>
        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">
              Email
            </label>
            <input
              type="email"
              placeholder="Work email"
              className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-navy py-3 font-medium text-white hover:bg-navy-dark"
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-charcoal-light">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-charcoal underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
