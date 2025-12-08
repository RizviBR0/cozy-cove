import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, Share2, BookmarkPlus } from "lucide-react";

// Sample guides content - in production, this would come from a CMS
const GUIDES_CONTENT: Record<
  string,
  {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    content: string;
  }
> = {
  "how-to-find-best-aliexpress-deals": {
    title: "How to Find the Best AliExpress Deals in 2024",
    excerpt:
      "Master the art of finding hidden gems and exclusive discounts on AliExpress with our comprehensive guide.",
    date: "2024-12-01",
    readTime: "5 min read",
    category: "Tips & Tricks",
    content: `
## Introduction

Finding great deals on AliExpress can feel overwhelming with millions of products to browse. This guide will teach you the strategies that savvy shoppers use to find the best discounts.

## 1. Use the Right Search Filters

Start your search with specific keywords and use the built-in filters:

- **Sort by Orders**: Products with more orders often have more reliable reviews
- **4 Stars & Up**: Filter for well-reviewed products only
- **Free Shipping**: Save on delivery costs

## 2. Check Seller Ratings

Before buying, always check:

- Overall store rating (aim for 95%+)
- Communication and shipping scores
- How long the store has been operating

## 3. Look for Coupon Codes

AliExpress offers several types of coupons:

- **Store Coupons**: Specific to individual sellers
- **Select Coupons**: Work across multiple stores
- **AliExpress Coupons**: Platform-wide discounts

## 4. Time Your Purchases

The best times to shop are:

- **11.11 Single's Day** (November)
- **Black Friday/Cyber Monday** (November)
- **Anniversary Sale** (March)
- **Summer Sale** (June-July)

## 5. Use Price History Tools

Use browser extensions to track price history and ensure you're getting a genuine deal, not an inflated "discount."

## Conclusion

With these strategies, you'll be finding amazing deals in no time. Remember to always verify seller ratings and read recent reviews before making a purchase.
    `,
  },
  "aliexpress-flash-sales-guide": {
    title: "AliExpress Flash Sales: Your Complete Guide",
    excerpt:
      "Learn when flash sales happen, how to prepare, and strategies to snag the best deals before they sell out.",
    date: "2024-11-28",
    readTime: "7 min read",
    category: "Flash Sales",
    content: `
## What Are Flash Sales?

Flash sales are limited-time offers where products are discounted significantly, but only for a short period or until stock runs out. On AliExpress, these can offer savings of 50-90% off regular prices.

## Types of Flash Sales

### 1. SuperDeals
Daily deals updated every 24 hours with deep discounts on popular items.

### 2. Limited Quantity Deals
First-come-first-served deals with very limited stock.

### 3. Flash Deals
Time-limited offers that may last only a few hours.

## How to Prepare

1. **Create a wishlist** ahead of major sales
2. **Add items to cart** before the sale starts
3. **Set reminders** for when deals go live
4. **Have payment ready** to check out quickly

## Best Times to Shop

Flash deals typically update at:
- Midnight Pacific Time
- Noon Pacific Time
- Various times during major sales events

## Pro Tips

- Follow your favorite stores for notifications
- Check the "Almost Gone" section for ending deals
- Compare prices with regular listings to verify savings

Happy deal hunting!
    `,
  },
  "cozy-home-decor-budget": {
    title: "Create a Cozy Home on a Budget with AliExpress",
    excerpt:
      "Transform your living space without breaking the bank using our curated list of affordable home decor finds.",
    date: "2024-11-25",
    readTime: "6 min read",
    category: "Home & Decor",
    content: `
## Transform Your Space for Less

Creating a cozy home doesn't require a huge budget. AliExpress has amazing finds that can transform any space for a fraction of retail prices.

## Essential Cozy Elements

### 1. Soft Textiles
- Throw blankets ($10-25)
- Decorative pillows ($5-15 each)
- Cozy rugs ($20-50)

### 2. Ambient Lighting
- LED string lights ($3-10)
- Table lamps ($15-30)
- Candle holders ($5-15)

### 3. Wall Decor
- Canvas prints ($10-30)
- Macrame hangings ($8-20)
- Floating shelves ($15-25)

### 4. Plants & Greenery
- Faux plants ($5-15)
- Planters & pots ($3-15)
- Hanging plant holders ($5-10)

## Budget Breakdown

For under $100, you can get:
- 2-3 throw pillows
- 1 cozy blanket
- String lights
- 2-3 small plants or decor pieces

## Shopping Tips

1. Look for bundle deals
2. Check seller ratings carefully
3. Read reviews with photos
4. Order early for shipping time

Your cozy home awaits!
    `,
  },
};

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES_CONTENT[slug];

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      publishedTime: guide.date,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = GUIDES_CONTENT[slug];

  if (!guide) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12">
      {/* Back Link */}
      <Link
        href="/guides"
        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Guides
      </Link>

      {/* Header */}
      <header className="mb-8">
        <Badge className="mb-4">{guide.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{guide.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{guide.excerpt}</p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(guide.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {guide.readTime}
          </span>
        </div>
      </header>

      <Separator className="my-8" />

      {/* Content */}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none
          prose-headings:font-semibold
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-li:text-muted-foreground
          prose-strong:text-foreground
        "
        dangerouslySetInnerHTML={{
          __html: guide.content
            .replace(/\n/g, "<br>")
            .replace(/## /g, "</p><h2>")
            .replace(/### /g, "</p><h3>")
            .replace(/<br><br>/g, "</p><p>"),
        }}
      />

      <Separator className="my-8" />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <BookmarkPlus className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
        <Button asChild>
          <Link href="/guides">Read more guides</Link>
        </Button>
      </div>

      {/* Related CTA */}
      <Card className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Ready to find some deals?
          </h2>
          <p className="text-muted-foreground mb-4">
            Put these tips into practice and discover amazing cozy finds.
          </p>
          <Button asChild>
            <Link href="/shop">Browse Cozy Deals</Link>
          </Button>
        </CardContent>
      </Card>
    </article>
  );
}
