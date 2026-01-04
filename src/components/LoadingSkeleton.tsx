import { Skeleton } from '@/components/ui/skeleton';

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-4">
            <Skeleton className="mb-2 h-5 w-20" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-3/4" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
