export default function CareerLoading() {
  return (
    <main className="w-full px-4 font-Poppins pb-10 animate-pulse">
      <div className="max-w-[1320px] mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
        {/* Title skeleton */}
        <div className="mb-4 md:mb-20 flex flex-col gap-2">
          <div className="h-8 w-72 bg-gray-200 rounded" />
          <div className="h-4 w-64 bg-gray-100 rounded mt-4" />
        </div>
        {/* Info cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-100 rounded-lg border border-gray-200"
            />
          ))}
        </div>
        {/* Opening title */}
        <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
        {/* Job listings skeleton */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-100 rounded-lg border border-gray-200"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
