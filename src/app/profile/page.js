"use client";

import React from "react";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";
import { detailsButtonStyle, eventCardStyle } from "../styles";
import { useRouter } from "next/navigation";
import { fetchUserData } from "@/api/api";

const Profile = ({}) => {
  const {
    getTokenFromLocalStorage,
    getUserIDFromLocalStorage,
    logout,
    isLoggedIn,
  } = useAuth();

  const [userData, setUserData] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const router = useRouter();

  const userID = getUserIDFromLocalStorage();
  const userToken = getTokenFromLocalStorage();

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
    console.log("isUserLoggedIn:", isLoggedIn());
    if (isLoggedIn() === false) {
      router.replace("/login");
    }
    fetchData();
    
  }, []);

  const fetchData = async () => {
    const data = await fetchUserData(userID, userToken);
    setUserData(data);
  }

  const handleLogout = async () => {
    const logoutResponse = await logout();
    if (logoutResponse.ok) {
      router.replace("/login");
    }
  };

  
  return (
    <>
      <div
        className="flex flex-col p-20 m-20 rounded-lg"
        style={eventCardStyle}
      >
        <p className="text-black text-lg font-bold my-2">Profil</p>

        <p className="text-black text-lg my-1">
          Ime: {userData ? userData.firstName : ""}{" "}
          {userData ? userData.lastName : ""}
        </p>
        <p className="text-black text-lg my-1">
          Grad: {userData ? userData.city : ""}
        </p>
        <p className="text-black text-lg my-1">
          Datum rođenja:
          {userData && userData.dob
            ? new Date(userData.dob)
                .toLocaleDateString("en-GB")
                .replace(/\//g, ".")
            : ""}
        </p>
        {/* Displaying eventTypeIds */}
        <div className="text-black text-lg my-1">
          Preference:
          {userData &&
            userData.eventTypeIds &&
            userData.eventTypeIds.map((typeId, index) => (
              <span key={index}>
                {index > 0 && ", "} {typeId}
              </span>
            ))}
        </div>
        <button
          className="bg-blue-500  text-white  font-light py-1 px-8 rounded mr-4 rounded-lg w-1/4"
          style={detailsButtonStyle}
          onClick={handleLogout}
        >
          Odjava
        </button>

        {/*TODO: Edit preferences*/}
      </div>
    </>
  );
};

export default Profile;
