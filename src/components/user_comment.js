import React from "react";
import Image from "next/image";
import Link from "next/link";

const UserComment = ({ title, date, location, description, imageUrl }) => {
  const eventCardStyle = {
    backgroundColor: "rgb(217, 217, 217)",
    padding: "0.75rem",
    textAlign: "left", 
  };

  const detailsButtonStyle = {
    backgroundColor: "rgb(92,156,176)",
  };

  const commentButtonStyle = {
    backgroundColor: "rgb(217, 217, 217)",
  };

  return (
    <div
      className="flex bg-white p-6 mx-10 my-8 rounded-lg w-11/12 border-none focus:border-none"
      style={commentButtonStyle}
    >
      <textarea
        id="message"
        className=" text-black rounded-lg border-none w-full"
        placeholder="Ostavi svoj komentar ..."
        style={eventCardStyle}
      ></textarea>
    </div>
  );
};

export default UserComment;
