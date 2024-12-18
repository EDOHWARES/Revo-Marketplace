export function ProductSkeleton() {
    return (
      <div className="w-full rounded-lg border p-4 space-y-4 animate-pulse bg-card">
        <div className="w-full h-48 bg-muted rounded-lg" />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted" />
            <div className="h-4 w-24 bg-muted rounded" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-5 w-32 bg-muted rounded" />
              <div className="h-5 w-16 bg-muted rounded" />
            </div>
            <div className="flex gap-1">
              <div className="h-4 w-16 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  } 