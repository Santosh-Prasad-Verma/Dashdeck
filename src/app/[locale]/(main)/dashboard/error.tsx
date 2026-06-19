"use client";

import { useEffect } from "react";

import { AlertTriangle } from "lucide-react";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
        <AlertTriangle className="size-8 text-red-500" />
      </div>
      <h2 className="mb-2 font-bold text-white text-xl">Dashboard Error</h2>
      <p className="mb-6 max-w-md text-gray-400 text-sm">
        Something went wrong while loading the dashboard. Please try again.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-white px-6 py-2.5 font-semibold text-black text-sm transition-all hover:bg-gray-100"
        >
          Try again
        </button>
        <a
          href="/dashboard/default"
          className="rounded-lg border border-white/[0.1] bg-white/[0.03] px-6 py-2.5 font-medium text-sm text-white transition-all hover:bg-white/[0.06]"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
