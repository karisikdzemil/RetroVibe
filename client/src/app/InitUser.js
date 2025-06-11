"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/user/user-slice";

export default function InitUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.expiresAt && parsedUser.expiresAt < Date.now()) {
        localStorage.removeItem("user");
        console.log("Session expired. User removed from localStorage.");
      } else {
        dispatch(setUser(parsedUser));
      }
    }
  }, [dispatch]);

  return null;
}
