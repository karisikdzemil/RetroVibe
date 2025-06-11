"use client";

import { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase"; 
import { useSelector } from "react-redux";

export default function ShareMemory() {
  const imageRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    decade: "90s",
    categories: [],
    memory: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.user);
  console.log(user)

  function handleCheckboxChange(category) {
    setFormData((prev) => {
      const alreadySelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: alreadySelected
          ? prev.categories.filter((cat) => cat !== category)
          : [...prev.categories, category],
      };
    });
  }

  function chooseImageHandler(e) {
    e.preventDefault();
    imageRef.current.click();
  }

  function handleImageChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  async function uploadImageServerSide(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);
  
    for (const [key, val] of formData.entries()) {
      console.log(key, val); 
    }
  
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      const err = await res.text();
      console.error("Server error body:", err);
      throw new Error(`Upload failed (${res.status})`);
    }
  
    const data = await res.json();
    return data.imageUrl;
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    if (image) {
      try {
        imageUrl = await uploadImageServerSide(image);
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Failed to upload image");
        setLoading(false);
        return;
      }
    }

    try {
      const postData = {
        ...formData,
        imageUrl,
      };

      const postRef = await addDoc(collection(db, "memories"), postData);
      console.log("Memory saved with ID:", postRef.id);
      alert("Memory successfully saved!");
      setFormData({ title: "", decade: "90s", categories: [], memory: "" });
      setImage(null);
    } catch (error) {
      console.error("Firestore error:", error);
      alert("Failed to save memory");
    }

    setLoading(false);
  }

  return (
    <section className="mt-[10vh] w-full min-h-screen bg-gradient-to-b from-[#161831] to-[#2f3567] text-[#EDF2F4] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl bg-[#1f2244] p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-indigo-500 text-center">
          Share Your Memory 💾
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-[#BFC9D9]">Memory Title</label>
            <input
              type="text"
              placeholder="What's this memory about?"
              className="w-full px-4 py-2 bg-[#2f3567] text-white rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[#BFC9D9]">Decade</label>
            <select
              className="w-full px-4 py-2 bg-[#2f3567] text-white rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.decade}
              onChange={(e) => setFormData({ ...formData, decade: e.target.value })}
            >
              <option value="90s">90s - The Golden Age</option>
              <option value="80s">80s</option>
              <option value="2000s">2000s</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-[#BFC9D9]">Category</label>
            <div className="grid grid-cols-2 gap-2 text-sm text-white">
              {["Cartoons", "Toys", "Music", "School", "Games", "Other"].map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(cat)}
                    onChange={() => handleCheckboxChange(cat)}
                    className="accent-indigo-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 text-[#BFC9D9]">Your Memory</label>
            <textarea
              placeholder="Tell us about your memory..."
              className="w-full h-32 px-4 py-2 bg-[#2f3567] text-white rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              value={formData.memory}
              onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[#BFC9D9]">Upload Media (Optional)</label>
            <div className="flex gap-4">
              <input type="file" className="hidden" ref={imageRef} onChange={handleImageChange} />
              <button
                onClick={chooseImageHandler}
                type="button"
                className="bg-[#2f3567] border border-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-500 hover:text-[#2B2D42] transition"
              >
                Choose Image
              </button>
              {image && <span className="ml-2">{image.name}</span>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-[#2B2D42] font-semibold py-3 rounded-xl hover:bg-[#2B2D42] hover:text-white transition duration-300 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save to Memory Bank"}
          </button>
        </form>
      </div>
    </section>
  );
}
