import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTable() {
  return (
    <div className="space-y-3 w-full">
      {/* Table Header */}
      <div className="flex space-x-4 w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={`header-${index}`} className="h-4 bg-gray-200 w-full" />
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex space-x-4 w-full">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <Skeleton key={`row-${rowIndex}-col-${colIndex}`} className="h-6 bg-gray-200 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}
