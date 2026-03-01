export default function GlobalNewsLoading() {
  return (
    <div className="w-full mb-10 px-4 font-Poppins animate-pulse">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4">
        {/* Title */}
        <div className="h-8 w-56 bg-gray-200 rounded" />
        <div className="h-4 w-80 bg-gray-100 rounded" />
        {/* Lead story skeleton */}
        <div className="rounded-2xl border border-gray-200 overflow-hidden mt-4">
          <div className="h-[320px] sm:h-[380px] bg-gray-200" />
          <div className="p-6 flex flex-col gap-3">
            <div className="h-6 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-2/3 bg-gray-100 rounded" />
          </div>
        </div>
        {/* Grid stories skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="h-[200px] bg-gray-200" />
              <div className="p-4 flex flex-col gap-2">
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
