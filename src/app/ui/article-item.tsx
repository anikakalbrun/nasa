import Image from "next/image";
import { format } from "date-fns";
import { IoTimeOutline } from "react-icons/io5";
import Link from "next/link";
import { Post } from "@/app/interfaces";

function getFirstThreeSentences(text: string) {
  // Split the text into an array of sentences using regex
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);

  // Select the first three sentences
  const firstThreeSentences = sentences.slice(0, 3);

  // Join the selected sentences back into a single string
  const result = firstThreeSentences.join(" ");

  return result;
}

export default function ArticleItem({
  copyright,
  date,
  explanation,
  title,
  url,
  thumbnail_url,
}: Post) {
  return (
    <Link href={`/pictureOfDay/${date}`}>
      <div className="flex flex-col lg:flex-row space-x-4 space-y-2 p-6">
        <div className="">
          <Image
            src={thumbnail_url || url}
            width={500}
            height={300}
            alt={title}
          />
        </div>
        <div className="space-y-2 max-w-96">
          <div className="font-bold text-2xl pb-2">{title}</div>
          <div className="flex flex-row pb-2">
            <span className="pr-2">
              <IoTimeOutline size={20} />
            </span>
            {format(date, "dd LLLL yyyy")}
          </div>
          <div className="text-md">
            {getFirstThreeSentences(explanation)}
            <span className="pl-2 text-indigo-600">[Read more]</span>
          </div>
          <div className="font-bold">{copyright}</div>
        </div>
      </div>
    </Link>
  );
}
