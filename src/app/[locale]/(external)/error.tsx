"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
        <svg className="size-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <h2 className="mb-2 font-bold text-xl text-white">Something went wrong</h2>
      <p className="mb-6 max-w-md text-gray-400 text-sm">
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-white px-6 py-2.5 font-semibold text-black text-sm transition-all hover:bg-gray-100"
      >
        Try again
      </button>
    </div>
  );
}
