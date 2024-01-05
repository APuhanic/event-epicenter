"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Comment from "@/components/comment";
import UserComment from "@/components/user_comment";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";
import { USER_ENDPOINT } from "@/api/endpoints";

const Profile = ({ title, date, location, description, imageUrl }) => {
  const eventCardStyle = {
    backgroundColor: "rgb(217, 217, 217)",
    color: "white",
    padding: "0.75rem",
    textAlign: "center",
  };

  const { userToken, getTokenFromLocalStorage, getUserIDFromLocalStorage } =
    useAuth();

  React.useEffect(() => {
    const token = getTokenFromLocalStorage();
    const userID = getUserIDFromLocalStorage();
  }, [userToken]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = getUserIDFromLocalStorage();
        const token = getTokenFromLocalStorage();
        console.log("userID", userID);
        console.log(token);
        if (userID && token) {
          const response = await fetch(`${USER_ENDPOINT}/${userID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
            console.log("response", response);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } 
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [getUserIDFromLocalStorage, getTokenFromLocalStorage]);

  return (
    <>
      <div className="flex p-20 ">
        <div className="flex-1">
          <div className="flex flex-row justify-between">
            <p className="text-black text-lg font-bold">
              {title} Koncert Dine Merlina
            </p>

            <div className="mr-8">
              <p className="text-black text-lg text-right font-bold">
                Vrsta događaja:
              </p>
              <p className="text-black text-lg text-right font-bold">Glazba</p>
            </div>
          </div>

          <p className="text-black text-lg">Datum: {date} </p>
          <p className="text-black text-lg mb-6">Time: {date} </p>

          <div className="flex flex-row justify-between">
            <p className="text-black text-lg">Dvorana Gradski vrt, Osijek</p>

            <div className="mr-8">
              <p className="text-black text-lg text-right">Ulaz:</p>
              <p className="text-black text-lg text-right">Besplatan</p>
            </div>
          </div>

          <hr className="h-0.5 my-8  border-0 bg-gray-700" />

          <div className="flex items-center justify-center">
            <p className="text-center text-black my-2">Opis događaja</p>
          </div>

          <hr className="h-0.5 my-8  border-0 bg-gray-700" />

          <div className="flex flex-row justify-between">
            {/* Radio buttons */}
            <div className="flex items-center ">
              <label className="flex items-center mr-4">
                <input
                  type="radio"
                  name="interest"
                  className="form-radio text-black  "
                />
                <span className="ml-2 text-black">Zainteresiran sam</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="interest"
                  className="form-radio text-black"
                />
                <span className="ml-2 text-black">Idem</span>
              </label>
            </div>

            <div className="mr-8 flex flex-row">
              <Image
                className="rounded-md mr-4"
                src="/people_icon.png"
                alt="Profile Icon"
                width={25}
                height={25}
              />
              <p className="text-black text-lg text-right">Dolazi: 100</p>
            </div>
          </div>
        </div>

        <div className=" flex-col ml-8">
          <Image
            className="rounded-md"
            src="/merlin.png"
            alt="Profile Icon"
            width={350}
            height={600}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
