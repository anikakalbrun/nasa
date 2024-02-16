import Link from "next/link";
import { anton } from "@/app/ui/fonts";
import HeaderAuth from "@/app/ui/header-auth";

export default function Header() {
  return (
    <div className="full-w p-5 border-b border-l-zinc-300 sticky top-0 bg-white z-10 flex justify-between">
      <nav className="mt-2">
        <Link
          href="/"
          className={`${anton.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
        >
          Astronomy Picture of the Day
        </Link>
      </nav>
      <HeaderAuth />
    </div>
  );
}
