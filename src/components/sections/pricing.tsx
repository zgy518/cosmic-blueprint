"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Loader2, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { usePaddle } from "@/hooks/use-paddle";
import { PADDLE_PRICE_IDS } from "@/lib/paddle";

type PlanKey = "free" | "perRead" | "premium";

const planDefs: Array<{
  key: PlanKey;
  icon: typeof Zap;
  accent: string;
  highlighted?: boolean;
  btnVariant: "outline" | "default";
  btnHref: string;
  priceIdKey: keyof typeof PADDLE_PRICE_IDS | null;
  featCount: number;
  missCount: number;
}> = [
  {
    key: "free",
    icon: Zap,
    accent: "border-emerald-500/30",
    btnVariant: "outline" as const,
    btnHref: "/tools",
    priceIdKey: null,
    featCount: 6,
    missCount: 3,
  },
  {
    key: "perRead",
    icon: Sparkles,
    accent: "border-primary/50",
    highlighted: true,
    btnVariant: "default" as const,
    btnHref: "/#",
    priceIdKey: "perRead",
    featCount: 6,
    missCount: 2,
  },
  {
    key: "premium",
    icon: Sparkles,
    accent: "border-amber-500/30",
    btnVariant: "outline" as const,
    btnHref: "/#",
    priceIdKey: "premium",
    featCount: 6,
    missCount: 0,
  },
];

export function Pricing() {
  const t = useTranslations("pricing");
  const { openCheckout } = usePaddle();
  const [loadingPlan, setLoadingPlan] = useState<PlanKey | null>(null);

  const handleBuy = async (plan: (typeof planDefs)[number]) => {
    if (!plan.priceIdKey) return;
    const priceId = PADDLE_PRICE_IDS[plan.priceIdKey];
    if (!priceId) return;
    setLoadingPlan(plan.key);
    await openCheckout(priceId);
    setLoadingPlan(null);
  };

  return (
    <section id="pricing" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {planDefs.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <GlassCard
                interactive={false}
                className={`relative flex h-full flex-col border p-6 sm:p-8 ${
                  plan.highlighted
                    ? "border-primary/40 shadow-gold ring-1 ring-primary/20"
                    : plan.accent
                }`}
              >
                {plan.highlighted ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-background">
                    {t("mostPopular")}
                  </div>
                ) : null}

                <div className="mb-6">
                  <div className="mb-3 grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <plan.icon className="size-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{t(`${plan.key}.name`)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t(`${plan.key}.description`)}</p>
                </div>

                <div className="mb-6">
                  <span className="font-serif text-4xl font-semibold text-foreground">
                    {t(`${plan.key}.price`)}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">/ {t(`${plan.key}.period`)}</span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {Array.from({ length: plan.featCount }, (_, i) => (
                    <li key={`feat-${i}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 text-emerald-400">✓</span>
                      {t(`${plan.key}.features.${i}`)}
                    </li>
                  ))}
                  {Array.from({ length: plan.missCount }, (_, i) => (
                    <li key={`miss-${i}`} className="flex items-start gap-2 text-sm text-muted-foreground/40">
                      <span className="mt-0.5">—</span>
                      {t(`${plan.key}.missing.${i}`)}
                    </li>
                  ))}
                </ul>

                {plan.key === "free" ? (
                  <Button asChild variant={plan.btnVariant} size="default" className="w-full">
                    <Link href={plan.btnHref}>
                      {t(`${plan.key}.cta`)}
                      <ArrowRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant={plan.btnVariant}
                    size="default"
                    className="w-full"
                    disabled={loadingPlan === plan.key}
                    onClick={() => handleBuy(plan)}
                  >
                    {loadingPlan === plan.key ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      t(`${plan.key}.cta`)
                    )}
                  </Button>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-6 text-muted-foreground">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
