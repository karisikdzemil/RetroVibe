"use client";

import { useEffect, useState, useRef } from "react";
import { Chat, Inputs, SignUp } from "../../../components/chat";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Home() {

  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState([]);
  const [input, setInput] = useState("");

  const user = useRef(null);

  useEffect(() => {
    socket.on("recieve_message", (msg) => {
      if(!user.current) return
      setChat((prev) => [...prev, msg])
    })

    socket.on("user_typing", (data) => {
      if(!user.current) return
      setTyping((prev) => {
        if(typing.includes(data.user) && data.typing === true) return prev
        if(data.typing === false){
          return prev.filter((u) => u !== data.user)
        } else {
          return [...prev, data.user]
        }
      })
    })

    socket.on("new_user", (newUser) => {
      if(!user.current) return
      setChat((prev) => [...prev, {content: `${newUser} joined`, type: "server"}])
    })

    return () => {
      socket.off("recieve_message");
      socket.off("user_typing");
      socket.off("new_user");
    }
  })
  
  return (
    <main className="mt-[10vh] min-h-screen w-full bg-gradient-to-b from-[#2a2e4d] to-[#1b1d36] text-[#EDF2F4] px-4 py-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      
      <aside className="md:w-1/3 w-full bg-[#1f223a] rounded-2xl shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-indigo-400 mb-4">Chat Topics</h2>
        <ul className="space-y-3">
          {['General Chat', 'School Memories', 'Gaming Nostalgia', 'Cartoons & TV Shows', 'Old Toys'].map((topic, idx) => (
            <li
              key={idx}
              className="bg-[#2b2f50] hover:bg-indigo-500 hover:text-[#1f223a] cursor-pointer px-4 py-3 rounded-xl font-medium transition duration-200"
            >
              {topic}
            </li>
          ))}
        </ul>
      </aside>
  
      <section className="md:w-2/3 w-full bg-[#1f223a] rounded-2xl shadow-xl flex flex-col justify-between p-6 space-y-6">
        <h2 className="text-2xl font-bold text-indigo-400">Global Chat</h2>
  
        {user.current ? (
          <>
            <div className="flex-grow overflow-y-auto max-h-[60vh]">
              <Chat user={user.current} chat={chat} typing={typing} />
            </div>
            <Inputs setChat={setChat} user={user.current} socket={socket} />
          </>
        ) : (
          <SignUp user={user} socket={socket} input={input} setInput={setInput} />
        )}
      </section>
    </div>
  </main>
  
  );
}