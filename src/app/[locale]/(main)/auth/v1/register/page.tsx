import Link from "next/link";

import { RegisterForm } from "../../_components/register-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export default function RegisterV1() {
  return (
    <div className="flex h-dvh">
      <div className="relative flex w-full items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 p-8 lg:w-2/3 overflow-hidden">
        {/* Decorative Grid & Glow */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-md space-y-8 bg-white/75 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 p-8 sm:p-10 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 transition-all duration-300 hover:shadow-2xl hover:border-zinc-300 dark:hover:border-zinc-700">
          <div className="space-y-2 text-center">
            <h2 className="font-semibold text-3xl tracking-tight text-zinc-900 dark:text-zinc-50">
              Create your account
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Please enter your details to register.</p>
          </div>
          <div className="space-y-4">
            <RegisterForm />
            <GoogleButton
              className="w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
              variant="outline"
            />
            <p className="text-center text-zinc-500 dark:text-zinc-400 text-xs">
              Already have an account?{" "}
              <Link
                prefetch={false}
                href="login"
                className="text-zinc-950 dark:text-zinc-50 hover:underline font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden bg-zinc-950 border-l border-zinc-800 lg:block lg:w-1/3 overflow-hidden">
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
          className="absolute inset-0 opacity-40 animate-pulse"
          style={{
            backgroundImage: "radial-gradient(circle 350px at 50% 50%, rgba(99, 102, 241, 0.15), transparent 100%)",
            animationDuration: "8s",
          }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-2 overflow-hidden shadow-2xl">
              <img
                src="/Dashdeck-logo.svg"
                alt="Dashdeck Logo"
                className="h-full w-full object-contain brightness-0 invert"
              />
            </div>
            <div className="space-y-2">
              <h1 className="font-semibold text-2xl text-zinc-50 tracking-tight">Dashdeck</h1>
              <p className="text-zinc-400 text-sm font-medium">Design. Build. Launch. Repeat.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
