import { AboutPreview } from "@/components/sections/about-preview";
import { CulturePrimer } from "@/components/sections/culture-primer";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Pricing } from "@/components/sections/pricing";
import { QuoteCard } from "@/components/sections/quote-card";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureGrid />
      <Highlights />
      <QuoteCard />
      <CulturePrimer />
      <Pricing />
      <AboutPreview />
    </main>
  );
}
