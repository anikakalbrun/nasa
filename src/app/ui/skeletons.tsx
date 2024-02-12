// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative bg-gray-100 p-2 shadow-sm flex flex-col lg:flex-row space-x-2 space-y-2 mb-4 mt-4`}
    >
      <div className="flex items-center justify-center truncate rounded-sm bg-gray-200 px-4 py-8 md:w-[500px] sm:w-[400px] h-[300px] md:h-[300px]"></div>
      <div className="flex flex-col p-1 space-y-4">
        <div className="ml-2 h-10 w-50 rounded-sm bg-gray-200 text-sm font-medium" />
        <div className="ml-2 h-6 w-[160px] rounded-sm bg-gray-200 text-sm font-medium" />
        <div className="rounded-sm bg-gray-200 w-96 h-40 ml-2" />
        <div className="ml-2 h-6 w-24 rounded-sm bg-gray-200 text-sm font-medium" />
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div className="flex-center flex-col">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  );
}
