import { send, upload } from "../../assets";
import Image from "next/image";

const Inputs = () => {
  return (
    <div className="w-full absolute bottom-0 text-xl grid grid-cols-5 gradient md:bg-none md:text-3xl md:flex md:justify-center md:relative">
      <input
        className="rounded-2xl p-3 text-white placeholder-slate-200 col-span-4 gradient md:w-6/12 md:mr-3"
        type="text"
        placeholder="Enter your message"
      />
      <button className="w-full py-2 px-3 bg-sky-400 text-white font-bold rounded-md text-xl gradient md:w-1/12 md:text-2xl">
        <Image
          src={send}
          alt="send"
          className="w-6 md:w-12 mx-auto"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
};

export default Inputs;
