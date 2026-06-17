import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/config/app-config";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">
        <div className="relative order-2 hidden h-full rounded-3xl bg-zinc-950 border border-zinc-800 lg:flex">
          <div className="absolute top-10 space-y-1 px-10 text-zinc-50">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/5 border border-white/10 p-1 shadow-lg mb-2">
              <img
                src="/Dashdeck-logo.svg"
                alt="Dashdeck Logo"
                className="h-full w-full object-contain brightness-0 invert"
              />
            </div>
            <h1 className="font-semibold text-2xl tracking-tight">Dashdeck</h1>
            <p className="text-sm text-zinc-400 font-medium">Design. Build. Launch. Repeat.</p>
          </div>

          <div className="absolute bottom-10 flex w-full justify-between px-10">
            <div className="flex-1 space-y-1 text-zinc-300">
              <h2 className="font-semibold text-zinc-100">Ready to launch?</h2>
              <p className="text-xs text-zinc-400">Clone the repo, install dependencies, and your dashboard is live in minutes.</p>
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
