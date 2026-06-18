import Link from "next/link";

import { RegisterForm } from "../../_components/register-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export default function RegisterV1() {
  return (
    <div className="flex h-dvh">
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-zinc-50/50 p-8 lg:w-2/3 dark:bg-zinc-950/20">
        {/* Decorative Grid & Glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[130px] dark:bg-indigo-500/10" />

        <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-zinc-200/80 bg-white/75 p-8 shadow-xl shadow-zinc-200/50 backdrop-blur-xl transition-all duration-300 hover:border-zinc-300 hover:shadow-2xl sm:p-10 dark:border-zinc-800/80 dark:bg-zinc-900/70 dark:shadow-black/50 dark:hover:border-zinc-700">
          <div className="space-y-2 text-center">
            <h2 className="font-semibold text-3xl text-zinc-900 tracking-tight dark:text-zinc-50">
              Create your account
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Please enter your details to register.</p>
          </div>
          <div className="space-y-4">
            <RegisterForm />
            <GoogleButton
              className="w-full border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/80"
              variant="outline"
            />
            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                prefetch={false}
                href="login"
                className="font-semibold text-zinc-950 hover:underline dark:text-zinc-50"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden border-zinc-800 border-l bg-zinc-950 lg:block lg:w-1/3">
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
            backgroundImage: "radial-gradient(circle 350px at 50% 50%, rgba(99, 102, 241, 0.15), transparent 100%)",
            animationDuration: "8s",
          }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <div className="mx-auto flex size-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl">
              <img
                src="/Dashdeck-logo.svg"
                alt="Dashdeck Logo"
                className="h-full w-full object-contain brightness-0 invert"
              />
            </div>
            <div className="space-y-2">
              <h1 className="font-semibold text-2xl text-zinc-50 tracking-tight">Dashdeck</h1>
              <p className="font-medium text-sm text-zinc-400">Design. Build. Launch. Repeat.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
