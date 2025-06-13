import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faBookOpen, faGamepad, faCakeCandles, faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";
import MemoryCard from "./MemoryCard";

export default function MemoryCategories() {
  return (
    <section className="w-full min-h-screen bg-gray-900 flex flex-col items-center pt-10 pb-16 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-300 drop-shadow-lg mb-10 text-center">
        Memory Categories
      </h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center mt-10">
        <MemoryCard title="Cartoons" icon={<FontAwesomeIcon icon={faTv} />} />
        <MemoryCard title="School" icon={<FontAwesomeIcon icon={faBookOpen} />} />
        <MemoryCard title="Toys" icon={<FontAwesomeIcon icon={faGamepad} />} />
        <MemoryCard title="Other" icon={<FontAwesomeIcon icon={faCakeCandles} />} />
        <MemoryCard title="Music" icon={<FontAwesomeIcon icon={faMusic} />} />
        <MemoryCard title="Games" icon={<FontAwesomeIcon icon={faPlay} />} />
      </div>
    </section>
  );
}
