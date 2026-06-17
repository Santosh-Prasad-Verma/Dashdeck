import Link from "next/link";

import { RegisterForm } from "../../_components/register-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

export default function RegisterV1() {
  return (
    <div className="flex h-dvh">
      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="font-semibold text-2xl tracking-tight">Create your account</h2>
            <p className="text-muted-foreground text-sm">
              Please enter your details to register.
            </p>
          </div>
          <div className="space-y-4">
            <RegisterForm />
            <GoogleButton className="w-full border border-border" variant="outline" />
            <p className="text-center text-muted-foreground text-xs">
              Already have an account?{" "}
              <Link prefetch={false} href="login" className="text-zinc-950 dark:text-zinc-50 hover:underline font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden bg-zinc-950 border-l border-zinc-800 lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
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
