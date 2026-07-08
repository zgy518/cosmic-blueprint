"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export function PlaceholderPage({ namespace }: { namespace: "login" | "terms" | "contact" }) {
  const t = useTranslations(namespace);

  return (
    <main className="grid min-h-[70vh] place-items-center px-4 py-16">
      <GlassCard interactive={false} className="max-w-xl p-8 text-center">
        <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-primary/10 text-3xl text-primary">☯</div>
        <h1 className="text-2xl font-semibold text-foreground">{t("title")}</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{t("description")}</p>
        <Button asChild className="mt-6">
          <Link href="/">{t("cta")}</Link>
        </Button>
      </GlassCard>
    </main>
  );
}
