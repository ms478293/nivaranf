export default function BlogsLoading() {
  return (
    <div className="w-full mb-10 font-Poppins animate-pulse">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded" />
        {/* Title skeleton */}
        <div className="h-8 w-80 bg-gray-200 rounded" />
        <div className="h-4 w-64 bg-gray-100 rounded" />
        <div className="w-full h-[1.5px] bg-gray-200" />
        {/* Blog cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="w-full h-52 bg-gray-200" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
