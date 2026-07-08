"use client";

import { useLocale, useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

const ELEMENT_EN: Record<ElementKey, string> = {
  wood: "Wood", fire: "Fire", earth: "Earth", metal: "Metal", water: "Water",
};

const fiveElementsDefs: Array<{
  key: ElementKey;
  zh: string;
  en: string;
  color: string;
  direction: string;
}> = [
  { key: "wood", zh: "木", en: "Wood", color: "#4ADE80", direction: "East" },
  { key: "fire", zh: "火", en: "Fire", color: "#F87171", direction: "South" },
  { key: "earth", zh: "土", en: "Earth", color: "#FBBF24", direction: "Center" },
  { key: "metal", zh: "金", en: "Metal", color: "#C0C0C0", direction: "West" },
  { key: "water", zh: "水", en: "Water", color: "#60A5FA", direction: "North" },
];

const stemDefs = [
  { zh: "甲", en: "Jia", elementKey: "wood" as ElementKey, elementZh: "木", polarity: "Yang" as const },
  { zh: "乙", en: "Yi", elementKey: "wood" as ElementKey, elementZh: "木", polarity: "Yin" as const },
  { zh: "丙", en: "Bing", elementKey: "fire" as ElementKey, elementZh: "火", polarity: "Yang" as const },
  { zh: "丁", en: "Ding", elementKey: "fire" as ElementKey, elementZh: "火", polarity: "Yin" as const },
  { zh: "戊", en: "Wu", elementKey: "earth" as ElementKey, elementZh: "土", polarity: "Yang" as const },
  { zh: "己", en: "Ji", elementKey: "earth" as ElementKey, elementZh: "土", polarity: "Yin" as const },
  { zh: "庚", en: "Geng", elementKey: "metal" as ElementKey, elementZh: "金", polarity: "Yang" as const },
  { zh: "辛", en: "Xin", elementKey: "metal" as ElementKey, elementZh: "金", polarity: "Yin" as const },
  { zh: "壬", en: "Ren", elementKey: "water" as ElementKey, elementZh: "水", polarity: "Yang" as const },
  { zh: "癸", en: "Gui", elementKey: "water" as ElementKey, elementZh: "水", polarity: "Yin" as const },
];

const branchDefs = [
  { zh: "子", en: "Zi", hours: "23:00–01:00" },
  { zh: "丑", en: "Chou", hours: "01:00–03:00" },
  { zh: "寅", en: "Yin", hours: "03:00–05:00" },
  { zh: "卯", en: "Mao", hours: "05:00–07:00" },
  { zh: "辰", en: "Chen", hours: "07:00–09:00" },
  { zh: "巳", en: "Si", hours: "09:00–11:00" },
  { zh: "午", en: "Wu", hours: "11:00–13:00" },
  { zh: "未", en: "Wei", hours: "13:00–15:00" },
  { zh: "申", en: "Shen", hours: "15:00–17:00" },
  { zh: "酉", en: "You", hours: "17:00–19:00" },
  { zh: "戌", en: "Xu", hours: "19:00–21:00" },
  { zh: "亥", en: "Hai", hours: "21:00–23:00" },
];

export function CulturePrimer() {
  const locale = useLocale();
  const t = useTranslations("culture");
  const isZh = locale === "zh";

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        {/* Five Elements */}
        <div className="mb-16">
          <h3 className="mb-8 text-center font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            {t("fiveElementsTitle")} · <span className="text-primary">五行 Wǔ Xíng</span>
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-7 text-muted-foreground sm:text-base">
            {t("fiveElementsDesc")}
          </p>

          {/* Generation & Control cycles */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-emerald-400">
              🟢 {t("generating")}
            </span>
            <span className="rounded-full bg-red-500/10 px-4 py-1.5 text-red-400">
              🔴 {t("controlling")}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {fiveElementsDefs.map((el, index) => {
              const eT = (sub: string) => t(`elements.${el.key}.${sub}`);
              return (
                <GlassCard
                  key={el.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="min-h-[280px]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className="grid size-10 place-items-center rounded-xl text-2xl font-bold"
                      style={{ backgroundColor: `${el.color}18`, color: el.color }}
                    >
                      {el.zh}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {isZh ? el.direction : el.direction}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    {isZh ? el.zh : el.en}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      · {isZh ? el.en : el.zh} · {eT("season")}
                    </span>
                  </h4>
                  <p className="mt-2 text-xs text-primary/70">{eT("quality")}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {eT("analogy")}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Heavenly Stems & Earthly Branches */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Stems */}
          <div>
            <h3 className="mb-2 text-center font-serif text-xl font-semibold text-foreground">
              {t("stemsTitle")} · <span className="text-primary">天干 Tiān Gān</span>
            </h3>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              {t("stemsDesc")}
            </p>
            <GlassCard interactive={false} className="overflow-hidden p-0">
              <div className="grid grid-cols-2 text-sm">
                {stemDefs.map((s, i) => (
                  <div
                    key={s.en}
                    className={`flex items-center gap-3 border-b border-border/40 px-4 py-3 ${
                      i % 2 === 0 ? "border-r" : ""
                    } ${i >= stemDefs.length - 2 ? "border-b-0" : ""}`}
                  >
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {s.zh}
                    </span>
                    <div>
                      <span className="text-muted-foreground">{s.en}</span>
                      <span className="mx-1 text-muted-foreground/40">·</span>
                      <span className="text-xs text-primary/70">
                        {isZh ? s.elementZh : ELEMENT_EN[s.elementKey]}{" "}
                        {t(`polarity${s.polarity}`)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Branches */}
          <div>
            <h3 className="mb-2 text-center font-serif text-xl font-semibold text-foreground">
              {t("branchesTitle")} · <span className="text-primary">地支 Dì Zhī</span>
            </h3>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              {t("branchesDesc")}
            </p>
            <GlassCard interactive={false} className="overflow-hidden p-0">
              <div className="grid grid-cols-2 text-sm">
                {branchDefs.map((b, i) => (
                  <div
                    key={b.en}
                    className={`flex items-center gap-3 border-b border-border/40 px-4 py-3 ${
                      i % 2 === 0 ? "border-r" : ""
                    } ${i >= branchDefs.length - 2 ? "border-b-0" : ""}`}
                  >
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {b.zh}
                    </span>
                    <div className="min-w-0">
                      <span className="text-muted-foreground">
                        {t(`branchesAnimals.${i}`)}
                      </span>
                      <p className="text-[11px] text-muted-foreground/50">{b.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
