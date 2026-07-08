"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  const footerLinks = [
    { label: t("disclaimer"), href: "/disclaimer" },
    { label: t("privacy"), href: "/privacy" },
    { label: t("terms"), href: "/terms" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-base font-semibold">
              <span className="text-primary">☯</span>
              <span>Cosmic Blueprint</span>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-border/70 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
