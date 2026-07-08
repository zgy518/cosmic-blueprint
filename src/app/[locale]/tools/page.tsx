import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ToolsPageContent } from "./content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });
  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default function ToolsPage() {
  return <ToolsPageContent />;
}
