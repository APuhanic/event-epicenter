import React from "react";
import Image from "next/image";
import Link from "next/link";

const Event = ({ title, date, location, description, imageUrl }) => {
  const eventCardStyle = {
    backgroundColor: "rgb(217, 217, 217)",
    color: "white",
    padding: "0.75rem",
    textAlign: "center",
  };

  const detailsButtonStyle = {
    backgroundColor: "rgb(92,156,176)",
  };

  return (
    <div
      className="flex flex-row items-center bg-white p-6 m-6 rounded-lg  w-3/4 border-none"
      style={eventCardStyle}
    >
      <div className="ml-4">
        {/* Event Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${title} Image`}
            className="w-24 h-24 object-cover rounded-md"
          />
        )}
        <Image
          className=" rounded-md"
          src="/placeholder.png"
          alt="Profile Icon"
          width={185}
          height={127}
        />
      </div>

      <div className="m-4">
        <p className="text-black text-lg">{date} Date</p>
        <p className="text-black text-lg mt-6">{date} Time</p>
      </div>
      <div className="text-black text-lg flex-1"></div>

      <p className="text-black text-lg mr">{title} Title</p>
      <div className="flex-1"></div>

      <Link href="/event_details">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white  font-light py-1 px-8 rounded mr-4 rounded-lg"
          style={detailsButtonStyle}
        >
          {description} DETALJI
        </button>
      </Link>
    </div>
  );
};

export default Event;
