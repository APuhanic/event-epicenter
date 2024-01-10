import React from "react";
import { useRouter } from "next/navigation";
import { eventCardStyle, detailsButtonStyle } from "@/app/styles";

const Event = ({event }) => {

  const eventDate = new Date(event.date);

  const formattedDate = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}-${eventDate.getDate()}`;
  const formattedTime = `${eventDate.getHours()}:${eventDate.getMinutes()}`;

  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(`/event_details/${event.id}`);
  }
  
  return (
    <div
      className="flex flex-row items-center bg-white p-6 m-6 rounded-lg  w-3/4 border-none"
      style={eventCardStyle}
    >
      <div className="ml-4">
        {/* Event Image */}
        {event.imagePath && (
          <img
            src={event.imagePath}
            className="w-24 h-24 object-cover rounded-md"
          />
        )}

      </div>

      <div className="m-4">
        <p className="text-black text-lg">{formattedDate} </p>
        <p className="text-black text-lg mt-6">{formattedTime} Time</p>
      </div>
      <div className="text-black text-lg flex-1"></div>

      <p className="text-black text-lg mr">{event.name}</p>
      <div className="flex-1"></div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white  font-light py-1 px-8 rounded mr-4 rounded-lg"
          style={detailsButtonStyle}
          onClick={handleDetailsClick}
        >
           DETALJI
        </button>
    </div>
  );
};

export default Event;
