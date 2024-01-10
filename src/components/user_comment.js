"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";

const UserComment = ({ title, date, location, description, imageUrl }) => {
  const eventCardStyle = {
    backgroundColor: "rgb(217, 217, 217)",
    padding: "0.75rem",
    textAlign: "left",
  };

  const detailsButtonStyle = {
    backgroundColor: "rgb(92,156,176)",
  };

  const commentButtonStyle = {
    backgroundColor: "rgb(217, 217, 217)",
  };

  const { isLoggedIn } = useAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
  }, []);

  return (
    <div
      className="flex bg-white p-6 mx-10 my-8 rounded-lg w-11/12 border-none focus:border-none"
      style={commentButtonStyle}
    >
      {isUserLoggedIn ? (
        <textarea
          id="message"
          className="text-black rounded-lg border-none w-full"
          placeholder="Ostavi svoj komentar ..."
          style={eventCardStyle}
        ></textarea>
      ) : (
        <Link href="/login" className="w-full">
            <textarea
              id="message"
              className="text-black rounded-lg border-none w-full"
              placeholder="Ostavi svoj komentar ..."
              style={eventCardStyle}
            ></textarea>
        </Link>
      )}
    </div>
  );
};

export default UserComment;
