import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface ProductSkeletonProps {
  count?: number;
}

export function ProductSkeleton({ count = 1 }: ProductSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-0">
            {/* Image skeleton */}
            <Skeleton className="aspect-square w-full" />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Rating & Orders */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-16" />
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>

              {/* Button */}
              <Skeleton className="h-9 w-full mt-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
