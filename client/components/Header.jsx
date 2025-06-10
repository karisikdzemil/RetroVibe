"use client";
import {
  faHouse,
  faClock,
  faArrowUpFromBracket,
  faPerson,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  return (
    <header className="w-full h-[10vh] bg-gray-900 flex items-center justify-between px-5 shadow-md fixed top-0 z-50">
      <div>
        <h1 className="text-4xl font-extrabold text-indigo-500 cursor-pointer tracking-widest hover:text-[#FF6B6B] transition duration-300">
          RetroVibe
        </h1>
      </div>
      <nav className="hidden md:flex text-[#EDF2F4] w-[70%] justify-evenly">
        <Link href="/">
          <li
            className={`py-1 px-3 text-center rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 flex items-center gap-2 ${
              path === "/" && "bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faHouse} />
            Home
          </li>
        </Link>
        <Link href="/memories">
          <li
            className={`py-1 px-3 text-center rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 flex items-center gap-2 ${
              path === "/memories" && "bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faClock} />
            Memories
          </li>
        </Link>
        <Link href="/share">
          <li
            className={`py-1 px-3 text-center rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 flex items-center gap-2 ${
              path === "/share" && "bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            Share
          </li>
        </Link>
        <Link href="/community">
          <li
            className={`py-1 px-3 text-center rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 flex items-center gap-2 ${
              path === "/community" && "bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faPerson} />
            Community
          </li>
        </Link>
        <Link href="/login">
          {" "}
          <li
            className={`py-1 px-3 text-center rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 flex items-center gap-2 ${
              path === "/login" && "bg-gray-700" ||
              path === "/signup" && "bg-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            Login
          </li>
        </Link>
      </nav>

      <div className="md:hidden text-[#FFD23F] text-2xl cursor-pointer">☰</div>
    </header>
  );
}
