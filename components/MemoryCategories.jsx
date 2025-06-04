import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faBookOpen, faGamepad, faCakeCandles, faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";
import MemoryCard from "./MemoryCard";
export default function MemoryCategories() {
  return (
    <section className="w-[100%] h-[80vh] bg-gray-900 flex flex-col items-center justify-between pt-5">
      <h1 className="text-4xl font-extrabold text-indigo-300 drop-shadow-lg">
        Memory Categories
      </h1>
      <div className="w-[100%] h-[70vh] flex items-center justify-center">
        <div className="w-[30%] h-full flex flex-col items-center justify-center gap-10">
       <MemoryCard title='Cartoons' icon={ <FontAwesomeIcon icon={faTv} />}/>
       <MemoryCard title='School' icon={ <FontAwesomeIcon icon={faBookOpen} />}/>
        </div>
        <div className="w-[30%] h-full flex flex-col items-center justify-center gap-10">
       <MemoryCard title='Toys' icon={ <FontAwesomeIcon icon={faGamepad} />}/>
       <MemoryCard title='Birthday Parties' icon={ <FontAwesomeIcon icon={faCakeCandles} />}/>
        </div>
        <div className="w-[30%] h-full flex flex-col items-center justify-center gap-10">
       <MemoryCard title='Music' icon={<FontAwesomeIcon icon={faMusic} />}/>
       <MemoryCard title='Video Games' icon={ <FontAwesomeIcon icon={faPlay} />}/>
        </div>
      </div>
    </section>
  );
}
