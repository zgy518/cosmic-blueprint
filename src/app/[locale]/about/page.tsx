import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutContent } from "./content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
