export default function MemoryCard( {title, icon} ) {
  return (
    <div
      className="w-2/3 h-50 bg-gray-800 rounded-3xl flex flex-col items-center justify-center gap-3 border-3 border-gray-400 cursor-pointer 
                        transition-transform duration-300 hover:scale-105 group"
    >
      <div
        className="w-20 py-6 bg-indigo-400 text-center rounded-full text-2xl text-white 
                          transition-transform duration-300 group-hover:rotate-12"
      >
       {icon}
      </div>
      <h2
        className="text-xl text-white font-bold text-center 
                         transition-colors duration-300 group-hover:text-indigo-500"
      >
        {title}
      </h2>
    </div>
  );
}
