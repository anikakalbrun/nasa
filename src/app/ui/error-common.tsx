import Image from "next/image";
import React from "react";

export const TryAgainButton = () => {
  return (
    <form action={() => window.location.reload()}>
      <button
        className="rounded-md w-40 bg-blue-500 px-8 py-4 text-sm text-white transition-colors hover:bg-blue-400 mt-4 font-mono"
        type="submit"
      >
        Try again
      </button>
    </form>
  );
};

export default function ErrorCommon({
  children,
}: {
  children: React.ReactElement;
}) {
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
        {children}
      </div>
    </div>
  );
}
