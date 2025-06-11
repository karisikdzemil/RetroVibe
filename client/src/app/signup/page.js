"use client";

import Link from "next/link";
import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/user/user-slice";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("User registered:", user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: formData.username,
        });
      }
      setSuccess("Account created successfully!");
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        username: formData.username,
        expiresAt: Date.now() + 2 * 60 * 60 * 1000
      }));
      
      dispatch(
        setUser({
          uid: user.uid,
          username: formData.username,
          email: formData.email,
        })
      );
    
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#161831] to-[#2f3567] text-[#EDF2F4] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#1f2244] p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-indigo-500 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-[#BFC9D9]">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2f3567] text-white rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#BFC9D9]">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2f3567] text-white rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#BFC9D9]">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2f3567] text-white rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Create a password"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#BFC9D9]">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2f3567] text-white rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Repeat your password"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-[#2B2D42] font-semibold py-2 rounded-xl hover:bg-[#2B2D42] hover:text-white transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-[#BFC9D9]">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
