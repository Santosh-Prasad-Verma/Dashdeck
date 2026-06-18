import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">
        <div className="relative order-2 hidden h-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 lg:flex">
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(255,255,255) 1px, transparent 1px), linear-gradient(to bottom, rgb(255,255,255) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Spotlight Glow */}
          <div
            className="absolute inset-0 animate-pulse opacity-40"
            style={{
              backgroundImage: "radial-gradient(circle 450px at 50% 50%, rgba(139, 92, 246, 0.15), transparent 100%)",
              animationDuration: "10s",
            }}
          />
          <div className="absolute top-10 z-10 space-y-1 px-10 text-zinc-50">
            <div className="relative mb-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/5 p-1 shadow-lg">
              <img
                src="/Dashdeck-logo.svg"
                alt="Dashdeck Logo"
                className="h-full w-full object-contain brightness-0 invert"
              />
            </div>
            <h1 className="font-semibold text-2xl tracking-tight">Dashdeck</h1>
            <p className="font-medium text-sm text-zinc-400">Design. Build. Launch. Repeat.</p>
          </div>

          <div className="absolute bottom-10 z-10 flex w-full justify-between px-10">
            <div className="flex-1 space-y-1 text-zinc-300">
              <h2 className="font-semibold text-zinc-100">Ready to launch?</h2>
              <p className="text-xs text-zinc-400">
                Clone the repo, install dependencies, and your dashboard is live in minutes.
              </p>
            </div>
            <Separator orientation="vertical" className="mx-3 h-auto! bg-zinc-800" />
            <div className="flex-1 space-y-1 text-zinc-300">
              <h2 className="font-semibold text-zinc-100">Need help?</h2>
              <p className="text-xs text-zinc-400">
                Check out the docs or open an issue on GitHub, community support is just a click away.
              </p>
            </div>
          </div>
        </div>
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}
