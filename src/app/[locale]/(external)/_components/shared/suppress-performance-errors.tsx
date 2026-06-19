"use client";

import { useEffect } from "react";

export function SuppressPerformanceErrors() {
  useEffect(() => {
    const originalMeasure = performance.measure.bind(performance);
    performance.measure = function measure(name, startOrOptions?: string | PerformanceMeasureOptions, end?: string | number, duration?: number) {
      try {
        if (typeof startOrOptions === "object" && startOrOptions !== null && "end" in startOrOptions) {
          const opts = startOrOptions as PerformanceMeasureOptions;
          if (typeof opts.end === "number" && opts.end < 0) {
            return undefined as PerformanceEntry;
          }
        }
        if (typeof end === "number" && end < 0) {
          return undefined as PerformanceEntry;
        }
        return originalMeasure(name, startOrOptions as string, end as string, duration);
      } catch {
        return undefined as PerformanceEntry;
      }
    };
  }, []);

  return null;
}
