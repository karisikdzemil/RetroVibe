"use client";
import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  async function loginHandler(e) {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("Logged in:", userCredential.user);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#161831] to-[#2f3567] text-[#EDF2F4] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#1f2244] p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-indigo-500 text-center">Welcome Back</h2>
        <form onSubmit={loginHandler} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-[#BFC9D9]">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-[#2f3567] text-white rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-[#BFC9D9]">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-[#2f3567] text-white rounded-md border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-[#2B2D42] font-semibold py-2 rounded-xl hover:bg-[#2B2D42] hover:text-white transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-[#BFC9D9]">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
