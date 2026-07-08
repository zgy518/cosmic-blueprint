"use client";

import { useTranslations } from "next-intl";
import { ToolDirectory } from "@/components/tool/tool-directory";
import { SectionHeading } from "@/components/ui/section-heading";

export function ToolsPageContent() {
  const t = useTranslations("tools");

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <ToolDirectory />
      </div>
    </main>
  );
}
