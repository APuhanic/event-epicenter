"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Comment from "@/components/comment";
import UserComment from "@/components/user_comment";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";
import { EVENTS_ENDPOINT } from "@/api/endpoints";

const EventDetails = ({ params }) => {
  const { isLoggedIn } = useAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [eventDetails, seteventDetails] = useState(null);

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
    fetchEventDetails();
  }, []);
  const id = params.id;

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
        seteventDetails(data);
      } else {
        console.error("Error fetching events", response.status);
        console.error("Error fetching events", response.body);
        console.error("Error fetching events", response);
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
            <p className="text-black text-lg font-bold">
              {eventDetails?.name}
            </p>

            <div className="mr-8">
              <p className="text-black text-lg text-right font-bold">
                Vrsta događaja:
              </p>
              <p className="text-black text-lg text-right font-bold">{eventDetails?.description}</p>
            </div>
          </div>

          <p className="text-black text-lg">Datum: {eventDetails?.date} </p>
          <p className="text-black text-lg mb-6">Time: {eventDetails?.date} </p>

          <div className="flex flex-row justify-between">
            <div>
              <p className="text-black text-lg">Dvorana Gradski vrt, Osijek</p>
              <p className="text-black text-lg">Adresa: {eventDetails?.address}</p>
            </div>
            <div className="mr-8">
              <p className="text-black text-lg text-right">Ulaz:</p>
              <p className="text-black text-lg text-right">{eventDetails?.price} €</p>
            </div>
          </div>

          <hr className="h-0.5 my-8  border-0 bg-gray-700" />

          <div className="flex items-center justify-center">
            <p className="text-center text-black my-2">{eventDetails?.description}</p>
          </div>

          <hr className="h-0.5 my-8  border-0 bg-gray-700" />

          <div className="flex flex-row justify-between">
            {/* Radio buttons */}
            <div className="flex items-center ">
              {isUserLoggedIn && (
                <>
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
                </>
              )}
            </div>

            <div className="mr-8 flex flex-row">
              <Image
                className="rounded-md mr-4"
                src="/people_icon.png"
                alt="Profile Icon"
                width={25}
                height={25}
              />
              <p className="text-black text-lg text-right">Dolazi: {eventDetails?.users.length}</p>
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
          <UserComment />
          <Comment />
          <Comment />
        </div>
      </div>
    </>
  );
};

export default EventDetails;
