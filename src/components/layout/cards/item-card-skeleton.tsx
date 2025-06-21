import { Skeleton } from "@/components/ui/skeleton"

export default function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg shadow-md h-full flex flex-col animate-pulse">
      <div className="relative w-full aspect-[4/3] bg-muted flex-shrink-0">
        <Skeleton className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-2 right-2 z-10">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>

      <div className="px-4 space-y-2 py-4 border flex-grow flex flex-col">
        <Skeleton className="h-5 w-3/4" />

        <div className="flex flex-wrap gap-2 py-2">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-12 rounded" />
          <Skeleton className="h-5 w-14 rounded" />
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <Skeleton className="w-12 h-4" />
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>

        <Skeleton className="h-9 w-full rounded-md mt-2" />
      </div>
    </div>
  )
}
