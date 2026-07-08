import type { ReactNode } from "react";

/**
 * Root layout — passes through to the locale-aware layout at [locale]/layout.tsx.
 * The actual <html>, <body>, metadata, and providers live there so they can access locale.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
