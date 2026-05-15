import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-5">
      <section className="card w-full max-w-lg" role="alert" aria-live="assertive">
        <div className="card-body">
          <h1 className="text-xl font-semibold">404 — Page Not Found</h1>
          <p className="text-sm text-black/60 mt-1">
            The page you’re looking for doesn’t exist.
          </p>

          <div className="mt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] text-white px-4 py-2 text-sm font-medium hover:opacity-95"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
