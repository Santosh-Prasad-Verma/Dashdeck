import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DashboardSkeleton } from "@/app/[locale]/(main)/dashboard/_components/dashboard-skeleton";

describe("DashboardSkeleton", () => {
  it("renders skeleton cards", () => {
    render(<DashboardSkeleton />);
    const skeletons = screen.getAllByRole("generic");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders without crashing", () => {
    const { container } = render(<DashboardSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });
});
