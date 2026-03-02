export default function Loading() {
  return (
    <main className="w-full font-Poppins" role="status" aria-label="Loading page content">
      {/* Hero Section Skeleton */}
      <div className="h-screen bg-gradient-to-b from-gray-200 to-gray-100 animate-pulse" />

      {/* About Section Skeleton */}
      <section className="py-16 px-4">
        <div className="max-w-[1320px] mx-auto animate-pulse">
          <div className="mb-6 space-y-3">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-72 bg-gray-100 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-2/3 bg-gray-100 rounded" />
          </div>
        </div>
      </section>

      {/* Happiness/Stats Section Skeleton */}
      <section className="py-16 px-4 bg-gray-50 animate-pulse">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-lg border border-gray-200 space-y-4"
              >
                <div className="h-12 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-100 rounded" />
                <div className="h-4 w-28 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Banner Skeleton */}
      <section className="py-16 px-4 animate-pulse">
        <div className="max-w-[1320px] mx-auto">
          <div className="h-48 bg-gray-200 rounded-lg" />
        </div>
      </section>

      {/* Where Money Goes Section Skeleton */}
      <section className="py-16 px-4 bg-gray-50 animate-pulse">
        <div className="max-w-[1320px] mx-auto">
          <div className="mb-8 space-y-3">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-64 bg-gray-100 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-80 bg-gray-200 rounded-lg" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Sanjeevani Section Skeleton */}
      <section className="py-16 px-4 animate-pulse">
        <div className="max-w-[1320px] mx-auto">
          <div className="mb-8 space-y-3">
            <div className="h-8 w-56 bg-gray-200 rounded" />
            <div className="h-4 w-72 bg-gray-100 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-5 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Projects Section Skeleton */}
      <section className="py-16 px-4 bg-gray-50 animate-pulse">
        <div className="max-w-[1320px] mx-auto">
          <div className="mb-8 space-y-3">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-64 bg-gray-100 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-100 rounded" />
                  <div className="h-3 w-5/6 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section Skeleton */}
      <section className="py-16 px-4 animate-pulse">
        <div className="max-w-[1320px] mx-auto">
          <div className="mb-8 space-y-3">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-72 bg-gray-100 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="h-64 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-100 rounded" />
                  <div className="h-3 w-5/6 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section Skeleton */}
      <section className="py-16 px-4 bg-gray-50 animate-pulse">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="h-8 w-56 bg-gray-200 rounded mx-auto" />
            <div className="h-4 w-64 bg-gray-100 rounded mx-auto" />
            <div className="h-12 w-full bg-gray-200 rounded-lg mt-6" />
          </div>
        </div>
      </section>

      {/* Donation Block Section Skeleton */}
      <section className="py-16 px-4 animate-pulse">
        <div className="max-w-[1320px] mx-auto">
          <div className="h-96 bg-gray-200 rounded-lg" />
        </div>
      </section>
    </main>
  );
}
