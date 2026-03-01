export default function Loading() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      role="status"
      aria-label="Loading page content"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
