export default function StoriesLoading() {
  return (
    <main className="w-full mb-10 px-4 font-Poppins animate-pulse">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4">
        {/* Breadcrumb */}
        <div className="h-4 w-40 bg-gray-200 rounded" />
        {/* Title */}
        <div className="h-8 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-72 bg-gray-100 rounded" />
        {/* Story cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="w-full h-48 bg-gray-200" />
              <div className="p-4 flex flex-col gap-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
