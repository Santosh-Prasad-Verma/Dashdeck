"use client";

import { useEffect } from "react";

export function SuppressPerformanceErrors() {
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      if (event.message?.includes("Performance.measure")) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };
    window.addEventListener("error", errorHandler, true);
    return () => window.removeEventListener("error", errorHandler, true);
  }, []);

  return null;
}
