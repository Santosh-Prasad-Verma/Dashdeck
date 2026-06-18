import Link from "next/link";

import { APP_CONFIG } from "@/config/app-config";

import { LoginForm } from "../../_components/login-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export default function LoginV2() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-4 lg:p-8 overflow-hidden">
      {/* Decorative Grid & Glow */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/5 dark:bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-8 bg-white/75 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 p-8 sm:p-10 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 transition-all duration-300 hover:shadow-2xl hover:border-zinc-300 dark:hover:border-zinc-700">
        <div className="space-y-2 text-center">
          <h1 className="font-semibold text-3xl tracking-tight text-zinc-900 dark:text-zinc-50">
            Login to your account
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Please enter your details to login.</p>
        </div>
        <div className="space-y-4">
          <GoogleButton className="w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80" />
          <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-zinc-200 dark:border-zinc-800 after:border-t">
            <span className="relative z-10 bg-white dark:bg-zinc-900 px-2 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold text-[10px]">
              Or continue with
            </span>
          </div>
          <LoginForm />
        </div>
      </div>

      <div className="absolute top-5 right-5 lg:right-10 z-20">
        <div className="text-muted-foreground text-sm">
          Don&apos;t have an account?{" "}
          <Link
            prefetch={false}
            className="text-zinc-950 dark:text-zinc-50 hover:underline font-semibold"
            href="register"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 lg:left-10 lg:right-10 flex justify-between text-zinc-400 dark:text-zinc-500 z-20">
        <div className="text-xs">{APP_CONFIG.copyright}</div>
        <div className="flex items-center gap-1.5 text-xs">
          <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded bg-white/5 border border-white/10 p-0.5 shadow">
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
