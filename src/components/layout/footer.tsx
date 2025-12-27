import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  shop: [
    { href: "/shop", label: "All Deals" },
    { href: "/shop?category=home-decor", label: "Home & Decor" },
    { href: "/shop?category=loungewear", label: "Loungewear" },
    { href: "/shop?category=self-care", label: "Self Care" },
    { href: "/shop?sort=trending", label: "Trending" },
  ],
  resources: [
    { href: "/guides", label: "Guides" },
    { href: "/guides/how-to-find-deals", label: "Finding Best Deals" },
    { href: "/guides/aliexpress-tips", label: "AliExpress Tips" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <span className="font-semibold text-lg">Cozy Cove</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Curated AliExpress deals for cozy living and smart savings.
            </p>
            <p className="text-xs text-muted-foreground">
              Finding the best deals so you don&apos;t have to.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Cozy Cove. All rights reserved.</p>
          <p>Made with ❤️ for deal lovers everywhere</p>
        </div>
      </div>
    </footer>
  );
}
