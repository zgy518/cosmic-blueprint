"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeSwitch } from "@/components/layout/theme-switch";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("tools"), href: "/tools" },
    { label: t("pricing"), href: "/#pricing" },
    { label: t("about"), href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/55 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold text-foreground" aria-label="Cosmic Blueprint home">
          <span className="grid size-9 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary">☯</span>
          <span>Cosmic Blueprint</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === `/${locale}${item.href}` || (item.href !== "/" && pathname.startsWith(`/${locale}${item.href}`));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active && "text-foreground",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeSwitch />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">
              {t("login")}
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/tools">
              {t("startFree")}
            </Link>
          </Button>
          <Button
            aria-label={open ? t("closeMenu") : t("openMenu")}
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-border bg-background/92 px-4 py-3 backdrop-blur-2xl md:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
