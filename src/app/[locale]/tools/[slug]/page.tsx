import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolConsole } from "@/components/tool/tool-console";
import { fortuneTools, toolOrder } from "@/lib/constants";
import type { ToolSlug } from "@/types";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function getTool(slug: string) {
  return fortuneTools.find((tool) => tool.slug === slug);
}

export function generateStaticParams() {
  return toolOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = getTool(slug);
  const isZh = locale === "zh";

  if (!tool) {
    return { title: isZh ? "工具不存在" : "Tool Not Found" };
  }

  return {
    title: isZh ? tool.title : tool.titleEn,
    description: isZh ? tool.taglineZh : tool.taglineEn,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug as ToolSlug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <ToolConsole tool={tool} />
      </div>
    </main>
  );
}
