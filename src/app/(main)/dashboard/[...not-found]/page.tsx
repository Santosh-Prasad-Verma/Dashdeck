"use client";

import Link from "next/link";

import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <div className="text-8xl font-bold text-muted-foreground/20">404</div>
      <h1 className="font-semibold text-xl">Page not found</h1>
      <p className="text-muted-foreground max-w-md">
        This page doesn't exist or hasn't been added yet. Check the sidebar navigation for available pages.
      </p>
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/default">
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
