"use client";

import Link from "next/link";
import Image from "next/image";

import { anton } from "@/app/ui/fonts";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="containerStyle">
      <Image
        src="/error-picture.jpg"
        alt="error"
        layout="fill"
        objectFit="cover" // or "contain" depending on your needs
        quality={100}
      />
      <div className="centered-element mt-20 flex flex-col items-center justify-center">
        <h3
          className={`${anton.className} text-white text-xl md:text-3xl lg:text-5xl md:leading-normal mt-20`}
        >
          Something went wrong...
        </h3>
        <Link href={"/"}>
          <button className="rounded-md w-40 bg-blue-500 px-8 py-4 text-sm text-white transition-colors hover:bg-blue-400 mt-4 font-mono">
            Take me home
          </button>
        </Link>
        <button
          className="rounded-md w-40 bg-blue-500 px-8 py-4 text-sm text-white transition-colors hover:bg-blue-400 mt-4 font-mono"
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
