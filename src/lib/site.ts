// GitHub Pages serves this site under /suanle-me/, so asset paths and metadata
// URLs need the basePath prefix in static mode. Empty otherwise.
export const basePath = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1" ? "/cosmic-blueprint" : "";

/** Prefix an absolute path with the static basePath (no-op in normal mode). */
export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}

export const siteConfig = {
  name: "Cosmic Blueprint",
  nameZh: "算了么",
  title: "Cosmic Blueprint — Discover Your Place in the Universe",
  description:
    "Explore ancient Chinese metaphysics through a modern lens. Birth charts, daily fortune, I Ching divination, and AI-powered personal readings. Your cosmic blueprint, decoded.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmicblueprint.com",
  author: "Cosmic Blueprint",
};

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
];
