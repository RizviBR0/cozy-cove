import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Cozy Savings Guides",
  description:
    "Expert guides on finding the best AliExpress deals, using coupons, and making smart purchases for cozy living.",
};

// Sample guides - in production, this would come from a CMS or database
const GUIDES = [
  {
    slug: "how-to-find-best-aliexpress-deals",
    title: "How to Find the Best AliExpress Deals in 2024",
    excerpt:
      "Master the art of finding hidden gems and exclusive discounts on AliExpress with our comprehensive guide.",
    date: "2024-12-01",
    readTime: "5 min read",
    category: "Tips & Tricks",
    featured: true,
  },
  {
    slug: "aliexpress-flash-sales-guide",
    title: "AliExpress Flash Sales: Your Complete Guide",
    excerpt:
      "Learn when flash sales happen, how to prepare, and strategies to snag the best deals before they sell out.",
    date: "2024-11-28",
    readTime: "7 min read",
    category: "Flash Sales",
    featured: true,
  },
  {
    slug: "cozy-home-decor-budget",
    title: "Create a Cozy Home on a Budget with AliExpress",
    excerpt:
      "Transform your living space without breaking the bank using our curated list of affordable home decor finds.",
    date: "2024-11-25",
    readTime: "6 min read",
    category: "Home & Decor",
    featured: false,
  },
  {
    slug: "aliexpress-coupons-explained",
    title: "AliExpress Coupons Explained: Stack Your Savings",
    excerpt:
      "Understand the different types of AliExpress coupons and how to stack them for maximum savings.",
    date: "2024-11-20",
    readTime: "8 min read",
    category: "Coupons",
    featured: false,
  },
  {
    slug: "buyer-protection-guide",
    title: "AliExpress Buyer Protection: What You Need to Know",
    excerpt:
      "Everything you need to know about AliExpress buyer protection, disputes, and getting refunds.",
    date: "2024-11-15",
    readTime: "10 min read",
    category: "Safety",
    featured: false,
  },
  {
    slug: "best-aliexpress-stores",
    title: "Best AliExpress Stores for Cozy Products",
    excerpt:
      "Our handpicked list of reliable AliExpress stores known for quality cozy products and fast shipping.",
    date: "2024-11-10",
    readTime: "5 min read",
    category: "Recommendations",
    featured: false,
  },
];

export default function GuidesPage() {
  const featuredGuides = GUIDES.filter((g) => g.featured);
  const otherGuides = GUIDES.filter((g) => !g.featured);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          Expert Guides
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Cozy Savings Guides
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Short, helpful guides on finding the best AliExpress discounts, flash
          sales, and coupons for cozy living.
        </p>
      </div>

      {/* Featured Guides */}
      {featuredGuides.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <Card className="h-full group overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-700"
                      >
                        Featured
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {guide.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(guide.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>{guide.readTime}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Guides */}
      <section>
        <h2 className="text-xl font-semibold mb-6">All Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherGuides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`}>
              <Card className="h-full group overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{guide.category}</Badge>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(guide.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>{guide.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-12 py-12 bg-muted/30 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Want more cozy tips?</h2>
        <p className="text-muted-foreground mb-6">
          Sign in to get personalized deal alerts and exclusive guides.
        </p>
        <Button size="lg">
          Sign in for more
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
