import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { CustomCursor } from "@/components/custom-cursor";

// Plus Jakarta Sans - Modern, clean, great for headings
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// DM Sans - Geometric, friendly, excellent readability for body text
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cozy Cove | Best AliExpress deals for cozy living",
    template: "%s | Cozy Cove",
  },
  description:
    "Cozy Cove curates the best AliExpress deals on home, fashion, gadgets, and lifestyle. Discover top rated and trending offers, updated regularly for people who love smart savings.",
  keywords: [
    "AliExpress deals",
    "AliExpress discounts",
    "AliExpress offers",
    "cozy home",
    "home decor deals",
    "loungewear deals",
    "best AliExpress products",
  ],
  authors: [{ name: "Cozy Cove" }],
  creator: "Cozy Cove",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Cozy Cove",
    title: "Cozy Cove | Best AliExpress deals for cozy living",
    description:
      "Curated AliExpress deals for cozy living and smart savings. Discover top rated and trending offers.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cozy Cove - AliExpress Deals Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cozy Cove | Best AliExpress deals for cozy living",
    description: "Curated AliExpress deals for cozy living and smart savings.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}
