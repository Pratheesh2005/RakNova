import { Skeleton } from "@/components/ui/Skeleton";

export function SavedJobsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="flex items-start gap-4">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="w-14 h-14 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-2/3 h-5" />
              <Skeleton className="w-1/3 h-4" />
            </div>
            <Skeleton className="w-20 h-8 rounded-full" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-16 h-6 rounded-full" />
          </div>
          <Skeleton className="w-full h-24 rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="w-24 h-9 rounded-lg" />
            <Skeleton className="w-28 h-9 rounded-lg" />
            <Skeleton className="w-16 h-9 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
