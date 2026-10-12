import { defineRouting } from "next-intl/routing";

// Static export cannot run middleware, so every route needs an explicit locale
// prefix. In normal (Vercel/Node) mode the default locale is served at "/".
const localePrefix = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1"
  ? ("always" as const)
  : ("as-needed" as const);

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  localePrefix,
});
