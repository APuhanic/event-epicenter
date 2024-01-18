"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import UserComment from "@/components/user_comment";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";
import { COMMENTS_ENDPOINT, EVENTS_ENDPOINT } from "@/api/endpoints";
import CommentList from "@/components/commentList";
import { addUserToEvent, removeUserFromEvent } from "@/api/api";

const EventDetails = ({ params }) => {
  const { isLoggedIn, getUserIDFromLocalStorage, getTokenFromLocalStorage } =
    useAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const id = params.id;

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
    fetchEventDetails();
    fetchComments();
  }, []);

  useEffect(() => {
    // Call checkUserAttendance only if eventDetails is not null
    if (eventDetails) {
      checkUserAttendance();
    }
  }, [eventDetails]);

  const fetchEventDetails = async () => {
    try {
      const url = `${EVENTS_ENDPOINT}/${id}`;
      console.log("url", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Event data:", data);
        setEventDetails(data);
        checkUserAttendance();
      } else {
        console.error("Error fetching events", response.status);
        console.error("Error fetching events", response.body);
        console.error("Error fetching events", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const url = `${COMMENTS_ENDPOINT}/${id}`;
      console.log("url", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const comments = await response.json();
        console.log("Data", comments);
        setComments(comments);
      } else {
        console.error("Error fetching events", response.status);
        console.error("Error fetching events", response.body);
        console.error("Error fetching events", response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const [isGoingChipSelected, setisGoingChipSelected] = useState(false);

  const handleToggle = () => {
    setisGoingChipSelected(!isGoingChipSelected);
    const userId = getUserIDFromLocalStorage();
    const userToken = getTokenFromLocalStorage();
    setEventDetails((prevEventDetails) => {
      const updatedEventDetails = { ...prevEventDetails };

      if (isGoingChipSelected) {
        // Remove the current user
        updatedEventDetails.users = updatedEventDetails.users.filter(
          (user) => user !== userId
        );
        removeUserFromEvent(eventDetails.id, userId, userToken);
      } else {
        // Add the current user
        updatedEventDetails.users = [...updatedEventDetails.users, userId];
        addUserToEvent(eventDetails.id, userId, userToken);
      }

      return updatedEventDetails;
    });
  };

  const checkUserAttendance = () => {
    const userId = getUserIDFromLocalStorage();
    console.log("userId", userId);
    if (eventDetails?.users.some((user) => user.id === userId)) {
      console.log("Found it:");
      setisGoingChipSelected(true);
    }
  };

  return (
    <>
      <div className="flex p-20 ">
        <div className="flex-1">
          <div className="flex flex-row justify-between">
            <p className="text-black text-4xl font-bold">
              {eventDetails?.name}
            </p>

            <div className="mr-8">
              <p className="text-black text-lg text-right font-bold">
                Vrsta događaja:
              </p>
              <p className="text-black text-lg text-right">
                {eventDetails?.eventTypeId}
              </p>
            </div>
          </div>

          <p className="text-black text-lg ">
            <span className="font-bold">Datum: </span>
            {eventDetails?.date &&
              new Date(eventDetails.date).toLocaleDateString()}{" "}
          </p>
          <p className="text-black text-lg mb-6">
            <span className="font-bold">Vrijeme: </span>
            {eventDetails?.date &&
              new Date(eventDetails.date).toLocaleTimeString()}{" "}
          </p>

          <div className="flex flex-row justify-between">
            <div>
              <p className="text-black text-lg">Dvorana Gradski vrt, Osijek</p>
              <p className="text-black text-lg">
                <span className="font-bold">Adresa: </span>
                {eventDetails?.address}
              </p>
            </div>
            <div className="mr-8">
              <p className="text-black text-lg text-right font-bold">Ulaz:</p>
              <p className="text-black text-lg text-right">
                {eventDetails?.price} €
              </p>
            </div>
          </div>

          <hr className="h-0.5 my-8  border-0 bg-gray-700" />

          <div className="flex items-center justify-center">
            <p className="text-center text-black my-2">
              {eventDetails?.description}
            </p>
          </div>

          <hr className="h-0.5 my-8  border-0 bg-gray-700" />

          <div className="flex flex-row justify-between">
            <div className="flex items-center">
              {isUserLoggedIn && (
                <>
                  <div
                    onClick={handleToggle}
                    className={`cursor-pointer flex items-center ${
                      isGoingChipSelected ? "bg-green-500" : "bg-gray-200"
                    } rounded-full py-2 px-4`}
                  >
                    <span
                      className={`text-black ${
                        isGoingChipSelected ? "text-white" : ""
                      }`}
                    >
                      Idem
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className=" flex flex-row">
              <img
                className=" mr-4"
                src="/people_icon.png"
                alt="Profile Icon"
                width="30"
                height="30"
              />
              <p className="text-black text-lg text-right">
                {eventDetails?.users.length}
              </p>
            </div>
          </div>
        </div>

        <div className=" flex-col ml-8">
          <img
            className="rounded-md"
            src={eventDetails?.imagePath}
            alt="Event"
            width={350}
            height={600}
          />
        </div>
      </div>
      <div className="ml-8">
        <p className="text-left text-black my-2 ml-10">Komentari</p>
        <div className="flex-col justify-center">
          <UserComment eventId={id} />
          {/* Dodati sortiranje po datumu*/}
          <CommentList comments={comments} />
        </div>
      </div>
    </>
  );
};

export default EventDetails;
