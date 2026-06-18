import type { ReactNode } from "react";

import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  // Minimal root layout — providers and locale handling live in [locale]/layout.tsx
  return children;
}
