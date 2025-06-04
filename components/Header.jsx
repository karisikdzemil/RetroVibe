import { faHouse, faClock, faArrowUpFromBracket, faPerson, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function  Header () {    
    return(
        <header className="w-full h-[10vh] bg-gray-900 flex items-center justify-between px-5 shadow-md fixed top-0 z-50">
  <div>
    <h1 className="text-4xl font-extrabold text-indigo-500 cursor-pointer tracking-widest hover:text-[#FF6B6B] transition duration-300">
      RetroVibe
    </h1>
  </div>
  <nav className="hidden md:flex text-[#EDF2F4] w-[70%] justify-evenly">
    <li className="py-1 px-3 text-center rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 flex items-center gap-2">
      <FontAwesomeIcon icon={faHouse} />
      Home
    </li>
    <li className="py-1 px-3 text-center rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 flex items-center gap-2">
      <FontAwesomeIcon icon={faClock} />
      Memories
    </li>
    <li className="py-1 px-3 text-center rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 flex items-center gap-2">
      <FontAwesomeIcon icon={faArrowUpFromBracket} />
      Share
    </li>
    <li className="py-1 px-3 text-center rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 flex items-center gap-2">
      <FontAwesomeIcon icon={faPerson} />
      Community
    </li>
    <li className="py-1 px-3 text-center rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200 flex items-center gap-2">
      <FontAwesomeIcon icon={faArrowRightToBracket} />
      Login
    </li>
  </nav>

  {/* Mobile menu icon placeholder */}
  <div className="md:hidden text-[#FFD23F] text-2xl cursor-pointer">
    ☰
  </div>
</header>

    )
}