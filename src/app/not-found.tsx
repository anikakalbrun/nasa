import Link from "next/link";
import Image from "next/image";
import { anton } from "@/app/ui/fonts";

export default function NotFound() {
  return (
    <div className="containerStyle">
      <Image
        src="/error-picture.jpg"
        alt="error"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="centered-element mt-20 flex flex-col items-center justify-center">
        <h3
          className={`${anton.className} text-8xl md:text-9xl text-white md:leading-normal `}
        >
          404
        </h3>
        <h3
          className={`${anton.className} text-sm md:text-lg text-white md:leading-normal `}
        >
          It looks like we got lost in space...
        </h3>
        <Link href={"/"}>
          <button className="rounded-md w-40 bg-blue-500 px-8 py-4 text-sm text-white transition-colors hover:bg-blue-400 mt-4 font-mono">
            Take me home
          </button>
        </Link>
      </div>
    </div>
  );
}
