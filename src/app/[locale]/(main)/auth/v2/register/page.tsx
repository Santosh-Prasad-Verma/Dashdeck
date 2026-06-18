import Link from "next/link";

import { APP_CONFIG } from "@/config/app-config";

import { RegisterForm } from "../../_components/register-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export default function RegisterV2() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-4 lg:p-8">
      {/* Decorative Grid & Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-[120px] dark:bg-violet-500/10" />

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-zinc-200/80 bg-white/75 p-8 shadow-xl shadow-zinc-200/50 backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 hover:shadow-2xl sm:p-10 dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:shadow-black/50 dark:hover:border-zinc-700">
        <div className="space-y-2 text-center">
          <h1 className="font-semibold text-3xl text-zinc-900 tracking-tight dark:text-zinc-50">Create your account</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Please enter your details to register.</p>
        </div>
        <div className="space-y-4">
          <GoogleButton className="w-full border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/80" />
          <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-zinc-200 after:border-t dark:border-zinc-800">
            <span className="relative z-10 bg-white px-2 font-semibold text-[10px] text-zinc-500 uppercase tracking-wider dark:bg-zinc-900 dark:text-zinc-400">
              Or continue with
            </span>
          </div>
          <RegisterForm />
        </div>
      </div>

      <div className="absolute top-5 right-5 z-20 lg:right-10">
        <div className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link prefetch={false} className="font-semibold text-zinc-950 hover:underline dark:text-zinc-50" href="login">
            Login
          </Link>
        </div>
      </div>

      <div className="absolute right-5 bottom-5 left-5 z-20 flex justify-between text-zinc-400 lg:right-10 lg:left-10 dark:text-zinc-500">
        <div className="text-xs">{APP_CONFIG.copyright}</div>
        <div className="flex items-center gap-1.5 text-xs">
          <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded border border-white/10 bg-white/5 p-0.5 shadow">
            <img
              src="/Dashdeck-logo.svg"
              alt="Dashdeck Logo"
              className="h-full w-full object-contain brightness-0 dark:invert"
            />
          </div>
          <span className="font-semibold text-foreground text-zinc-700 dark:text-zinc-300">Dashdeck</span>
        </div>
      </div>
    </div>
  );
}
