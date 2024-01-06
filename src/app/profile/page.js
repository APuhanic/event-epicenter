"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";
import { USER_ENDPOINT } from "@/api/endpoints";
import { detailsButtonStyle } from "../styles";

const Profile = ({ title, date, location, description, imageUrl }) => {

  const { getTokenFromLocalStorage, getUserIDFromLocalStorage, logout } = useAuth();

  const [userData, setUserData] = useState(null);
  const userID = getUserIDFromLocalStorage();
  const userToken = getTokenFromLocalStorage();

  useEffect(() => {
    if(userID == null || userToken == null){
      
    }
    fetchUserData();
  }, []);

  const handleLogout = async () =>{
    logout();
  }

  const fetchUserData = async () => {
    try {

      if (userID && userToken) {
        const url = `${USER_ENDPOINT}/${userID}`;
        console.log("url", url);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          credentials: "include",
          
        });

        if (response.ok) {
          const data = await response.json();
          console.log("response", response);
          setUserData(data);
        } else {
          console.error("Error fetching user data:", response.status);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      <div className="flex p-20 ">
        <div className="flex-1">
          <div className="flex flex-row justify-between">
            <p className="text-black text-lg font-bold">Profil</p>
          </div>

          <p className="text-black text-lg">
            Ime: {userData ? userData.firstName : ""}
          </p>
          <p className="text-black text-lg">
            Prezime: {userData ? userData.lastName : ""}
          </p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white  font-light py-1 px-8 rounded mr-4 rounded-lg "
          style={detailsButtonStyle}
          onClick={handleLogout}
        >
          Odjava
        </button>
      </div>
    </>
  );
};

export default Profile;
