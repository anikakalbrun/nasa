import { RxHamburgerMenu } from "react-icons/rx";

export function MobileMenuButton() {
  return (
    <button className="dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg p-2 hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 lg:hidden cursor-pointer">
      <RxHamburgerMenu size={25} />
    </button>
  );
}
