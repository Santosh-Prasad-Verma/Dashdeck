import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <span className="font-bold text-4xl text-white">404</span>
      </div>
      <h2 className="mb-2 font-bold text-white text-xl">Page Not Found</h2>
      <p className="mb-6 max-w-md text-gray-400 text-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-white px-6 py-2.5 font-semibold text-black text-sm transition-all hover:bg-gray-100"
      >
        Back to Home
      </Link>
    </div>
  );
}
