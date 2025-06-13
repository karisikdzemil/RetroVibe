"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { setCategory } from "@/features/category/category-slice";

export default function MemoriesPage() {
  const [memories, setMemories] = useState([]);
  const [decadeFilter, setDecadeFilter] = useState("all");
  // const [categoryFilter, setCategoryFilter] = useState("all");
  const category = useSelector((state) => state.category.category);
  const dispatch = useDispatch();
  // dispatch(setCategory('All'))

  useEffect(() => {
    const fetchMemories = async () => {
      const querySnapshot = await getDocs(collection(db, "memories"));
      const memoryList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMemories(memoryList);
    };

    fetchMemories();
  }, []);

  const filteredMemories = memories.filter((memory) => {
    const decadeMatch =
      decadeFilter === "all" || memory.decade === decadeFilter;
    const categoryMatch =
      category === "All" || memory.categories.includes(category);
    return decadeMatch && categoryMatch;
  });

  const decades = ["80s", "90s", "2000s"];
  const allCategories = Array.from(
    new Set(memories.flatMap((m) => m.categories))
  );

  return (
    <section className="mt-[10vh] w-full min-h-screen bg-gradient-to-b from-[#3b4176] to-[#232746] text-[#EDF2F4] px-5 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-indigo-300 text-center mb-12 drop-shadow-md">
        Explore Memories
      </h1>

      <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
        <div>
          <label className="font-semibold text-md mr-2">Decade:</label>
          <select
            className="px-4 py-2 rounded-md bg-[#2f345e] text-[#EDF2F4] border border-indigo-400 shadow-md"
            onChange={(e) => setDecadeFilter(e.target.value)}
            value={decadeFilter}
          >
            <option value="all">All</option>
            {decades.map((decade) => (
              <option key={decade} value={decade}>
                {decade}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold text-md mr-2">Category:</label>
          <select
            className="px-4 py-2 rounded-md bg-[#2f345e] text-[#EDF2F4] border border-indigo-400 shadow-md"
            onChange={(e) => dispatch(setCategory(e.target.value))}
            value={category}
          >
            <option value="All">All</option>

            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMemories.map((mem) => (
          <div
            key={mem.id}
            className="bg-[#f1f3f9] text-[#2B2D42] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            {mem.imageUrl && (
              <Image
                src={mem.imageUrl}
                alt={mem.title}
                width={500}
                height={240}
                className="w-full h-60 object-cover"
              />
            )}
            <div className="p-5">
              <h2 className="text-xl font-bold text-indigo-600 mb-2">
                {mem.title}
              </h2>
              <Link href={`/profile/${mem.userId}`}>
                {" "}
                <p className="text-sm italic mb-1 text-gray-600 cursor-pointer">
                  By {mem.username} • {mem.decade}
                </p>
              </Link>
              <p className="text-gray-700 mb-3">{mem.memory}</p>
              <div className="flex flex-wrap gap-2">
                {mem.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredMemories.length === 0 && (
        <div className="w-full h-10 flex justify-center items-center flex-col">
          <div className="flex justify-center items-center py-6">
            <div className="w-18 h-18 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-white">Loading...</h1>
        </div>
      )}
    </section>
  );
}
