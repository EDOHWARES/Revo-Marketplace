export function ProductSkeleton() {
    return (
      <div className="w-full h-[350px] rounded-lg border p-4 space-y-4 animate-pulse">
        <div className="w-full h-48 bg-gray-200 rounded-lg" />
        <div className="space-y-2">
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
        </div>
      </div>
    );
  } 