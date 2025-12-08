import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <span className="text-9xl font-bold text-muted-foreground/20">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-4xl">🏠</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">
          Oops! This page got a little too cozy and hid away
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to finding great deals!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/shop">
              <Search className="mr-2 h-4 w-4" />
              Browse Deals
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Looking for something specific?{" "}
            <Link href="/guides" className="text-primary hover:underline">
              Check our guides
            </Link>{" "}
            or{" "}
            <Link href="/shop" className="text-primary hover:underline">
              explore all deals
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
