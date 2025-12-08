import {
  HeroSection,
  TopPicksSection,
  TrendingSection,
  CozyVibesSection,
  HowItWorksSection,
  CozyCornerSection,
  SavingsJournalSection,
  BenefitsSection,
  FaqSection,
  FooterCtaSection,
} from "@/components/sections";
import { MOCK_PRODUCTS, MOCK_PRODUCT_STATS } from "@/lib/aliexpress";
import { getTopProducts, sortByTrendingScore } from "@/lib/scoring";
import { ProductStats } from "@/lib/types";

export default async function HomePage() {
  // In production, these would come from API routes
  // For now, using mock data for the UI
  const topProducts = getTopProducts(MOCK_PRODUCTS, 8);

  // Convert mock stats to proper ProductStats type
  const statsMap = new Map<string, ProductStats>();
  MOCK_PRODUCT_STATS.forEach((stats, key) => {
    statsMap.set(key, {
      productId: stats.productId,
      totalClicks: stats.totalClicks,
      recentClicks: stats.recentClicks,
      totalSaves: stats.totalSaves,
    });
  });

  const trendingProducts = sortByTrendingScore(MOCK_PRODUCTS, statsMap).slice(
    0,
    8
  );

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Cozy Cove",
            description:
              "Cozy Cove curates the best AliExpress deals on home, fashion, gadgets, and lifestyle.",
            url: process.env.NEXT_PUBLIC_APP_URL,
          }),
        }}
      />

      <HeroSection />
      <TopPicksSection products={topProducts} />
      <TrendingSection products={trendingProducts} />
      <CozyVibesSection />
      <HowItWorksSection />
      <CozyCornerSection />
      <SavingsJournalSection />
      <BenefitsSection />
      <FaqSection />
      <FooterCtaSection />
    </>
  );
}
