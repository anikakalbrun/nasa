"use client";

import { useEffect } from "react";
import Image from "next/image";
import { anton } from "@/app/ui/fonts";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

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
          className={`${anton.className} text-xl text-white md:text-3xl md:leading-normal `}
        >
          Something went wrong...
        </h3>
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
