"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EVENTS_ENDPOINT } from "@/api/endpoints";
import EventList from "@/components/eventList";
import { detailsButtonStyle } from "./styles";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const fetchEvents = async () => {
    try {
      const url = `${EVENTS_ENDPOINT}`;
      console.log("url", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("response", response);
        setEvents(data);
        console.log("events", data);
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
      <div className="flex flex-row items-center justify-center p-4 ">
        <div className="flex-1"></div>

        <div className="text-medium font-semibold text-center text-black mr-4">
          DOGAĐAJI
        </div>

        <div className="text-medium font-semibold text-center text-black mr-4">
          DATUMI
        </div>

        <div className="flexbox">
          <div className="search">
            <div>
              <input
                type="text"
                placeholder="Search . . ."
                required
                className="ring-0"
              />
            </div>
          </div>
        </div>

        <div className="flex-1"></div>

        <Link href="/profile">
          <Image
            src="/profile_icon.png"
            alt="Profile Icon"
            width={30}
            height={30}
          />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <EventList events={events} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-8 rounded m-4 rounded-lg"
          style={detailsButtonStyle}
        >
          VIŠE
        </button>
      </div>

    </>
  );
}
