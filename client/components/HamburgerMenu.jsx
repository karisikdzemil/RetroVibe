"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/features/user/user-slice";
import {
  faHouse,
  faClock,
  faArrowUpFromBracket,
  faPerson,
  faArrowRightToBracket,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;
    dispatch(clearUser());
    localStorage.removeItem("user");
    setOpen(false);
  }

  return (
    <>
     {!open && <div
        className="md:hidden text-[#FFD23F] text-3xl cursor-pointer z-50 fixed top-6 right-6"
        onClick={() => setOpen(true)}
      >
        ☰
      </div>}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <FontAwesomeIcon
            icon={faXmark}
            className="text-2xl cursor-pointer text-gray-400 hover:text-red-500"
            onClick={() => setOpen(false)}
          />
        </div>

        <ul className="flex flex-col gap-4 px-6">
          <Link href="/">
            <li
              onClick={() => setOpen(false)}
              className={`py-2 px-3 rounded-md cursor-pointer hover:bg-gray-700 flex items-center gap-3 ${
                path === "/" && "bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faHouse} /> Home
            </li>
          </Link>

          <Link href="/memories">
            <li
              onClick={() => setOpen(false)}
              className={`py-2 px-3 rounded-md cursor-pointer hover:bg-gray-700 flex items-center gap-3 ${
                path === "/memories" && "bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faClock} /> Memories
            </li>
          </Link>

          <Link href="/share">
            <li
              onClick={() => setOpen(false)}
              className={`py-2 px-3 rounded-md cursor-pointer hover:bg-gray-700 flex items-center gap-3 ${
                path === "/share" && "bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faArrowUpFromBracket} /> Share
            </li>
          </Link>

          <Link href="/community">
            <li
              onClick={() => setOpen(false)}
              className={`py-2 px-3 rounded-md cursor-pointer hover:bg-gray-700 flex items-center gap-3 ${
                path === "/community" && "bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={faPerson} /> Community
            </li>
          </Link>

          {!user.user ? (
            <Link href="/login">
              <li
                onClick={() => setOpen(false)}
                className={`py-2 px-3 rounded-md cursor-pointer hover:bg-gray-700 flex items-center gap-3 ${
                  (path === "/login" || path === "/signup") && "bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} /> Login
              </li>
            </Link>
          ) : (
            <>
              <Link href={`/profile/${user.user.uid}`}>
                <li
                  onClick={() => setOpen(false)}
                  className="py-2 px-3 rounded-md cursor-pointer hover:bg-gray-700 flex items-center gap-3"
                >
                  <FontAwesomeIcon icon={faPerson} /> Profile
                </li>
              </Link>
              <li
                onClick={handleLogout}
                className="py-2 px-3 rounded-md cursor-pointer hover:bg-red-600 text-red-400 flex items-center gap-3"
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </li>
            </>
          )}
        </ul>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
