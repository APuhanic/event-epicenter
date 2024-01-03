import React from "react";
import Image from "next/image";
import Link from "next/link";

const Comment = ({ title, date, location, description, imageUrl }) => {
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
      className="flex bg-white p-6 mx-10 my-8 rounded-lg   w-11/12 border-none "
      style={eventCardStyle}
    >
      <div className="flex flex-col">
        <p className="text-black text-lg text-left font-bold">{date} Ime korisnika:</p>
        <p className="text-black text-lg text-left my-5">{title} Komentar</p>
      </div>
    </div>
  );
};

export default Comment;
