import { shimmer } from "@/app/ui/skeletons";

export default function ArticleDetailsSceleton() {
  return (
    <div
      className={`${shimmer} relative bg-gray-100 shadow-sm flex flex-col lg:flex-row space-x-4 space-y-2`}
    >
      <div className="image-container lg:image-container-large rounded-sm bg-gray-200"></div>
      <div className="space-y-2 lg:w-[800px] p-8">
        <div className="pb-2 rounded-sm bg-gray-200 h-14" />
        <div className="pb-2 rounded-sm bg-gray-200 h-8 w-32" />
        <div className="flex flex-row pb-2 rounded-sm bg-gray-200 h-96" />
        <div className="rounded-sm bg-gray-200 h-8 w-56" />
      </div>
    </div>
  );
}
