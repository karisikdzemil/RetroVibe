import MemoryCategories from "../../components/MemoryCategories";

export default function Home() {
  return (
    <>
    <section className="w-full min-h-[100vh] bg-gradient-to-b from-[#161831] to-[#2f3567] text-[#EDF2F4] flex flex-col items-center justify-center px-5 text-center space-y-6">
    <h1 className="text-9xl md:text-6xl font-extrabold text-indigo-500 drop-shadow-lg">
      Relive Your Childhood Memories
    </h1>
    <p className="max-w-2xl text-lg md:text-xl text-[#BFC9D9]">
      Step back into the golden days of your youth. Share, discover, and celebrate the moments that shaped who you are today.
    </p>
    <div className="flex flex-col md:flex-row gap-4">
      <button className="bg-indigo-500 cursor-pointer text-[#2B2D42] font-semibold py-3 px-6 rounded-xl hover:bg-[#2B2D42] hover:text-white transition duration-300 shadow-md">
        Explore Memories
      </button>
      <button className="border-2 border-indigo-500 text-indigo-500 font-semibold py-3 px-6 rounded-xl hover:bg-indigo-500 cursor-pointer hover:text-[#2B2D42] transition duration-300 shadow-md">
        Share Yours
      </button>
    </div>
  </section>
    <MemoryCategories />
    </>
  );
}
