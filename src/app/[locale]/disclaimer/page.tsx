import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DisclaimerContent } from "./content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "disclaimer" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function DisclaimerPage() {
  return <DisclaimerContent />;
}
