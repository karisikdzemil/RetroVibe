"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";

export default function UserProfile() {
  const [memories, setMemories] = useState([]);
  const [user, setUser] = useState({});
  const params = useParams();
  const currentUser = useSelector((state) => state.user);

  const isAutor = currentUser.user?.uid === params.userId;

  useEffect(() => {
    const fetchMemoriesAndUser = async () => {
      const querySnapshot = await getDocs(collection(db, "memories"));
      const memoryList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const userDocRef = doc(db, "Users", params.userId);
      const userSnapshot = await getDoc(userDocRef);

      setMemories(memoryList);
      setUser(userSnapshot.data());
    };

    fetchMemoriesAndUser();
  }, [params.userId]);

  const filteredMemories = memories.filter(
    (el) => el.userId === params.userId
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this memory?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "memories", id));
    setMemories((prev) => prev.filter((mem) => mem.id !== id));
  };

  return (
    <section className="mt-[10vh] w-full min-h-screen bg-gradient-to-b from-[#3b4176] to-[#232746] text-[#EDF2F4] px-5 py-16">

<div className="max-w-xl mx-auto text-center mb-16 p-6 rounded-lg bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900 shadow-2xl border-2 border-indigo-500">
  <h1 className="text-4xl font-extrabold text-indigo-300 drop-shadow-lg mb-3 tracking-wide">
    {user.username || "Unknown User"}
  </h1>
  <p className="text-md text-indigo-100">{user.email || "No email provided"}</p>
  <p className="mt-2 text-sm text-indigo-200 italic">
    {isAutor ? "This is your public profile" : "User's profile"}
  </p>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMemories.map((mem) => (
          <div
            key={mem.id}
            className="bg-[#f1f3f9] text-[#2B2D42] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition relative"
          >
            <Image
              src={mem.imageUrl}
              alt={mem.title}
              width={500}
              height={240}
              className="w-full h-60 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold text-indigo-600 mb-2">{mem.title}</h2>
              <Link href={`/profile/${mem.userId}`}>
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
            {isAutor && (
              <button
                onClick={() => handleDelete(mem.id)}
                className="absolute top-4 right-4 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200"
                title="Delete Memory"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
      </div>

      {filteredMemories.length === 0 && (
        <div className="w-full h-10 flex justify-center items-center flex-col mt-16">
          <div className="flex justify-center items-center py-6">
            <div className="w-18 h-18 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-white">Loading...</h1>
        </div>
      )}
    </section>
  );
}
