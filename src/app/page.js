"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import EventList from "@/components/eventList";
import { detailsButtonStyle, eventCardStyle } from "./styles";
import { fetchEvents } from "@/api/api";
import { inputStyle } from "./styles";
import LoadingSkeletonEventList from "@/components/loadingSkeletonEventList";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Set initial value to null or empty string
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchEvents();
      setEvents(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date).toISOString().split("T")[0];
    const selectedDateFormatted = selectedDate
      ? new Date(selectedDate).toISOString().split("T")[0]
      : null;

    return (
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedDateFormatted || eventDate == selectedDateFormatted)
    );
  });

  return (
    <>
      <div className="flex flex-row items-center justify-center p-4 ">
        <div className="flex-1"></div>

        <div className="text-medium font-semibold text-center text-black mr-4">
          DOGAĐAJI
        </div>

        <input
          type="date"
          name="date"
          className="form-input text-black  placeholder-white rounded-lg placeholder-red-300"
          placeholder={"Izaberi datum"}
          style={inputStyle}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            console.log(selectedDate);
          }}
        />

        <div className="flexbox">
          <div className="search">
            <div>
              <input
                type="text"
                placeholder="Search . . ."
                required
                className="ring-0"
                value={searchQuery}
                onChange={handleSearch}
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

      <LoadingSkeletonEventList isLoading={isLoading} skeletonNumber={4}/>
      <div className="flex flex-col items-center justify-center">
        <EventList events={filteredEvents} />
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
