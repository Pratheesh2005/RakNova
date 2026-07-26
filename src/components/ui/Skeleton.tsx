import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className, variant = "rectangular" }: SkeletonProps) {
  const variants = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        variants[variant],
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-3" />
        </div>
      </div>
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
      <div className="flex gap-2">
        <Skeleton className="w-16 h-6 rounded-full" />
        <Skeleton className="w-16 h-6 rounded-full" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 space-y-3">
      <Skeleton variant="circular" className="w-10 h-10" />
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-3/4 h-8" />
    </div>
  );
}
