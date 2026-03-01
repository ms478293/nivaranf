export default function DonateLoading() {
  return (
    <main className="w-full px-4 font-Poppins pb-10 animate-pulse">
      <div className="max-w-[1320px] mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-36 bg-gray-200 rounded mb-4" />
        {/* Title skeleton */}
        <div className="h-8 w-64 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-96 bg-gray-100 rounded mb-8" />
        {/* Donation form skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <div className="h-12 bg-gray-100 rounded-lg border border-gray-200" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-gray-100 rounded-lg border border-gray-200"
                />
              ))}
            </div>
            <div className="h-14 bg-gray-200 rounded-lg mt-4" />
          </div>
          <div className="h-80 bg-gray-100 rounded-lg border border-gray-200" />
        </div>
      </div>
    </main>
  );
}
