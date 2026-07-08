"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function DisclaimerContent() {
  const t = useTranslations("disclaimer");

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("heading")} />
        <GlassCard interactive={false} className="space-y-5 p-7 text-sm leading-7 text-muted-foreground sm:p-10">
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
          <p>{t("body3")}</p>
          <div className="pt-2">
            <Button asChild>
              <Link href="/">{t("cta")}</Link>
            </Button>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
