"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("locale");

  const switchTo = locale === "en" ? "zh" : "en";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs font-medium"
      onClick={() => {
        router.replace(pathname, { locale: switchTo });
      }}
    >
      {t(switchTo)}
    </Button>
  );
}
