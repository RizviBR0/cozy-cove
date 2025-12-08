"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, HelpCircle, MessageCircle } from "lucide-react";

const FAQS = [
  {
    question: "How does Cozy Cove find deals?",
    answer:
      "We use the official AliExpress Affiliate API to search for products, then apply our own scoring system based on ratings, order volume, and discount percentages to surface the best deals. We update our listings regularly to ensure you see current offers.",
  },
  {
    question: "Is it safe to buy through your links?",
    answer:
      "Absolutely! We redirect you directly to the official AliExpress website for checkout. Your purchase is made entirely on AliExpress, protected by their buyer protection policies. We never handle your payment information.",
  },
  {
    question: "How do you make money?",
    answer:
      "We participate in the AliExpress Affiliate Program. When you purchase through our links, we earn a small commission at no extra cost to you. This allows us to keep the service free and continue curating great deals.",
  },
  {
    question: "Are the prices accurate?",
    answer:
      "We sync product information regularly, but prices can change on AliExpress at any time. Always verify the final price on the AliExpress product page before purchasing. We recommend checking for any additional coupons on AliExpress as well!",
  },
  {
    question: "What data do you collect?",
    answer:
      "We only store your email for authentication and your favorites/click history to personalize your experience. We never sell your data to third parties. You can delete your account and all associated data at any time.",
  },
  {
    question: "Can I request specific products or categories?",
    answer:
      "Yes! We love hearing from our community. Use the contact form to suggest product categories or specific items you&apos;d like to see featured. We prioritize requests based on community interest.",
  },
];

export function FaqSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            FAQ and affiliate disclosure
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Clear answers about how Cozy Cove works with AliExpress and how we
            keep the experience fair for you.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Affiliate Disclosure Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Affiliate Disclosure
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Cozy Cove participates in the AliExpress affiliate program. When
                you purchase through our links, we may earn a commission at no
                extra cost to you. This helps us maintain the site and continue
                finding great deals for our community. We only recommend
                products we believe provide genuine value.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">
              Read all FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact support
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
