import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import NotFound from "@/app/[locale]/(external)/not-found";

describe("NotFound", () => {
  it("renders 404 text", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeTruthy();
  });

  it("renders page not found message", () => {
    render(<NotFound />);
    expect(screen.getByText("Page Not Found")).toBeTruthy();
  });

  it("renders back to home link", () => {
    render(<NotFound />);
    const link = screen.getByText("Back to Home");
    expect(link).toBeTruthy();
  });
});

describe("External Error Boundary", () => {
  it("renders error state", async () => {
    const { default: ErrorPage } = await import("@/app/[locale]/(external)/error");
    const reset = vi.fn();
    render(<ErrorPage error={new Error("Test error")} reset={reset} />);
    expect(screen.getByText("Something went wrong")).toBeTruthy();
  });
});
