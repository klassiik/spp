export default function ListingsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-pulse">
            <div className="h-12 bg-blue-500 rounded-lg w-3/4 mx-auto mb-4" />
            <div className="h-6 bg-blue-500 rounded w-1/2 mx-auto mb-6" />
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="h-6 bg-blue-500 rounded w-32" />
              <div className="h-6 bg-blue-500 rounded w-40" />
              <div className="h-6 bg-blue-500 rounded w-28" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center max-w-3xl mx-auto animate-pulse">
            <div className="h-6 bg-muted rounded w-full mb-2" />
            <div className="h-6 bg-muted rounded w-5/6 mx-auto" />
          </div>

          {/* Widget Loading Skeleton */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-8 animate-pulse">
            <div className="h-12 bg-muted rounded-lg w-full mb-4" />
            <div className="flex gap-2 flex-wrap mb-8">
              <div className="h-10 bg-muted rounded-lg w-24" />
              <div className="h-10 bg-muted rounded-lg w-32" />
              <div className="h-10 bg-muted rounded-lg w-28" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-48 bg-muted rounded-lg" />
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <span className="sr-only">Loading listings page...</span>
    </div>
  );
}
