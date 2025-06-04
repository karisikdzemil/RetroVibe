"use client";

import "../../app/globals.css";

import { useEffect, useState, useRef } from "react";
import { Chat, Inputs, SignUp } from "../../../components/chat";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

export default function Community() {
  const user = useRef('sda');

  return (
    <main className="h-screen mt-[10vh] max-h-screen max-w-screen mx-auto md:container md:p-20 md:pt-4">
      {user.current ? (
        <>
          <Chat />
          <Inputs />
        </>
      ) : (
        <SignUp />
      )}
    </main>
  );
}
