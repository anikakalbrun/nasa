import Image from "next/image";
import { format } from "date-fns";
import { IoTimeOutline } from "react-icons/io5";
import { fetchPost } from "@/app/lib/data";

export default async function ArticleItem({
  params,
}: {
  params: { day: string };
}) {
  const day = params.day;

  const { copyright, date, explanation, title, url, thumbnail_url } =
    await fetchPost(day);
  return (
    <>
      <div className="flex flex-col lg:flex-row space-x-4 space-y-2">
        <div className="image-container lg:image-container-large">
          <Image
            src={thumbnail_url || url}
            alt={title}
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </div>
        <div className="space-y-2 lg:max-w-[600px] p-8">
          <div className="font-bold text-2xl pb-2">{title}</div>
          <div className="flex flex-row pb-2">
            <span className="pr-2">
              <IoTimeOutline size={20} />
            </span>
            {format(date, "dd LLLL yyyy")}
          </div>
          <div className="text-md text-justify">{explanation}</div>
          <div className="font-bold">{copyright}</div>
        </div>
      </div>
    </>
  );
}
