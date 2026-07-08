"use client";

import { useTranslations } from "next-intl";
import { HeartHandshake, Lock, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  culturalDepth: Sparkles,
  private: HeartHandshake,
  design: Lock,
};

const valueKeys = ["culturalDepth", "private", "design"];

export function AboutContent() {
  const t = useTranslations("about");

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <GlassCard interactive={false} className="grid min-h-[360px] place-items-center p-8">
            <div className="text-center">
              <div className="mx-auto grid size-40 place-items-center rounded-full border border-primary/30 bg-primary/10 font-serif text-8xl text-primary">
                ☯
              </div>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                {t("quoteBody")}
              </p>
            </div>
          </GlassCard>
          <GlassCard interactive={false} className="p-7 sm:p-10">
            <div className="space-y-5 text-base leading-8 text-muted-foreground">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
              <p>{t("body3")}</p>
            </div>
          </GlassCard>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {valueKeys.map((key) => {
            const Icon = icons[key];
            const label = t(`values.${key}`);
            const body = t(`values.${key}Body`);
            return (
              <GlassCard key={key} className="p-6">
                <div className="mb-5 grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{label}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </main>
  );
}
