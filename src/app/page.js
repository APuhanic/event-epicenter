"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import EventList from "@/components/eventList";
import { fetchEvents } from "@/api/api";
import { inputStyle } from "./styles";
import LoadingSkeletonEventList from "@/components/loadingSkeletonEventList";
import { fetchEventTypes, fetchUserData } from "@/api/api";
import { useAuth } from "@/contexts/authContext";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventTypes, setEventTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [userData, setUserData] = useState(null);
  const { isLoggedIn, getUserIDFromLocalStorage, getTokenFromLocalStorage } =
    useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log("isLoggedIn", isLoggedIn());
      if (isLoggedIn()) {
        const userData = await fetchUserData(getUserIDFromLocalStorage());
        setUserData(userData);
      }
      const data = await fetchEvents();
      const eventTypes = await fetchEventTypes();

      setEventTypes(eventTypes);
      setEvents(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    console.log("selectedEventTypes", selectedEventTypes);
  }, [selectedEventTypes]);

  const handleEventTypeToggle = (eventTypeId) => {
    setSelectedEventTypes((prevSelectedEventTypes) => {
      if (prevSelectedEventTypes.includes(eventTypeId)) {
        // Remove the event type if it's already selected
        return prevSelectedEventTypes.filter((id) => id !== eventTypeId);
      } else {
        // Add the event type if it's not selected
        return [...prevSelectedEventTypes, eventTypeId];
      }
    });
  };

  const filteredEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      const selectedDateFormatted = selectedDate
        ? new Date(selectedDate).toISOString().split("T")[0]
        : null;

      return (
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!selectedDateFormatted || eventDate === selectedDateFormatted) &&
        (selectedEventTypes.length === 0 ||
          (event.eventType &&
            selectedEventTypes.includes(event.eventType.name)))
      );
    })
    .sort((eventA, eventB) => {
      // Check if event type is in user preferences
      const isInUserPreferences = (eventType) =>
        userData?.eventTypeIds?.includes(eventType);

      // Get event types of eventA and eventB
      const eventTypeA = eventA.eventType?.name;
      const eventTypeB = eventB.eventType?.name;

      // Check if event type is in user preferences for both events
      const isInUserPreferencesA = isInUserPreferences(eventTypeA);
      const isInUserPreferencesB = isInUserPreferences(eventTypeB);

      // Sort events based on user preferences
      if (isInUserPreferencesA && !isInUserPreferencesB) {
        return -1; // eventA comes first
      } else if (!isInUserPreferencesA && isInUserPreferencesB) {
        return 1; // eventB comes first
      } else {
        return 0; // maintain the current order
      }
    });

  return (
    <>
      <div className="flex flex-row items-center justify-center p-4 ">
        <div className="flex-1"></div>

        <div className="flexbox">
          <div className="search">
            <div>
              <input
                type="text"
                placeholder="Search . . ."
                required
                className="ring-0 mb-1 focus:ring-0 focus:outline-none focus:ring-opacity-0"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <input
          type="date"
          name="date"
          className="form-input text-black text-bold placeholder-black rounded-full placeholder-red-300"
          placeholder={"Izaberi datum"}
          style={inputStyle}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            console.log(selectedDate);
          }}
        />

        <div className="flex-1"></div>

        <Link href="/profile">
          <Image
            src="/profile_icon.png"
            alt="Profile Icon"
            width={40}
            height={40}
          />
        </Link>
      </div>
      <div className="flex flex-wrap justify-center mb-4">
        {eventTypes.map((eventType) => (
          <div
            key={eventType.id}
            className={`mx-4 flex flex-row my-2 rounded-full py-2 px-3 cursor-pointer transition duration-300 ${
              selectedEventTypes.includes(eventType.name)
                ? "bg-blue-500 text-white font-bold hover:bg-blue-700 hover:text-white-800"
                : "bg-gray-300 text-black font-bold hover:bg-blue-200 hover:text-blue-800"
            }`}
            onClick={() => handleEventTypeToggle(eventType.name)}
          >
            {eventType.name}
          </div>
        ))}
      </div>

      <LoadingSkeletonEventList isLoading={isLoading} skeletonNumber={4} />
      <div className="flex flex-col items-center justify-center ">
        {!isLoading && filteredEvents.length === 0 && (
          <p className="text-black text-lg text-center font-bold">
            Nema rezultata pretrage
          </p>
        )}
        {!isLoading && (
          <EventList
            events={filteredEvents}
            userPreferences={userData?.eventTypeIds}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center"></div>
    </>
  );
}
