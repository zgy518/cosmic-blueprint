"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutPreview() {
  const t = useTranslations("aboutPreview");

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <GlassCard interactive={false} className="mx-auto max-w-4xl p-7 sm:p-10">
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            <div className="grid aspect-square place-items-center rounded-[24px] border border-primary/20 bg-primary/10 font-serif text-8xl text-primary">
              ☯
            </div>
            <div>
              <p className="text-pretty text-base leading-8 text-muted-foreground">
                {t("body1")}
              </p>
              <p className="mt-4 text-pretty text-base leading-8 text-muted-foreground">
                {t("body2")}
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href="/about">
                  {t("cta")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
