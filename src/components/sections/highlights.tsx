"use client";

import { useTranslations } from "next-intl";
import { Brain, Globe, Shield, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [Brain, Globe, Shield, Sparkles];

export function Highlights() {
  const t = useTranslations("highlights");

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((index) => {
            const Icon = icons[index];
            return (
              <GlassCard
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="min-h-[220px]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-foreground">
                      {t(`cards.${index}.stat`)}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {t(`cards.${index}.unit`)}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {t(`cards.${index}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {t(`cards.${index}.body`)}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
