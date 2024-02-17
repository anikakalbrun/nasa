import Link from "next/link";

import { anton } from "@/app/ui/fonts";
import ErrorCommon from "@/app/ui/error-common";

export default function NotFound() {
  return (
    <ErrorCommon>
      <>
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
      </>
    </ErrorCommon>
  );
}
