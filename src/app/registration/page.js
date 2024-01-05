import React from "react";
import Image from "next/image";
import Link from "next/link";
import Comment from "@/components/comment";
import UserComment from "@/components/user_comment";

const Register = ({ title, date, location, description, imageUrl }) => {
  const eventCardStyle = {
    backgroundColor: "rgb(217, 217, 217)",
  };

  const inputStyle = {
    backgroundColor: "rgb(181, 175, 175)",
    color: "white",
  };

  const detailsButtonStyle = {
    backgroundColor: "rgb(92,156,176)",
  };

  return (
    <div className="flex items-center justify-center ">
      <div
        className="bg-white p-12 my-8 rounded-lg w-4/5 border-none focus:border-none "
        style={eventCardStyle}
      >
        <p className="text-black text-center">Registracija</p>

        <div className="flex justify-center">
          <div className="flex-col mr-10">
            <p className="text-black text-left my-2">Ime:</p>
            <input
              type="text"
              name="email"
              className="form-input text-black w-full  mb-6 placeholder-white border-none rounded-lg "
              placeholder="Upišite ime"
              style={inputStyle}
            />
          </div>

          <div className="flex-col ">
            <p className="text-black text-left my-2">Prezime:</p>
            <input
              type="text"
              name="password"
              className="form-input text-black w-full  rounded-lg placeholder-white border-none"
              placeholder="Upišite prezime"
              style={inputStyle}
            />
          </div>
        </div>

        <p className="text-black mb-2 text-center">Događaji koje preferiram:</p>

        <div className="flex justify-center mb-4">
          <div className="mx-4">
            <input type="checkbox" id="music" name="music" />
            <label
              htmlFor="culture"
              className="ml-2 mr-6 text-black rounded-lg p-2"
              style={inputStyle}
            >
              Glazba
            </label>
          </div>
          <div className="mr-4">
            <input type="checkbox" id="sport" name="sport" />
            <label
              htmlFor="culture"
              className="ml-2  mr-6 text-black rounded-lg p-2"
              style={inputStyle}
            >
              Sport
            </label>
          </div>
          <div>
            <input type="checkbox" id="culture" name="culture" />
            <label
              htmlFor="culture"
              className="ml-2 text-black rounded-lg p-2"
              style={inputStyle}
            >
              Kultura
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex-col mr-10">
            <p className="text-black text-left my-2">E-mail adresa:</p>
            <input
              type="text"
              name="email"
              className="form-input text-black w-full  mb-6 placeholder-white border-none rounded-lg "
              placeholder="Upišite e-mail..."
              style={inputStyle}
            />
          </div>

          <div className="flex-col">
            <p className="text-black text-left my-2">
              Potvrdite e-mail adresu:
            </p>
            <input
              type="text"
              name="password"
              className="form-input text-black w-full  rounded-lg placeholder-white border-none"
              placeholder="Upišite e-mail..."
              style={inputStyle}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex-col mr-10">
            <p className="text-black text-left my-2">Lozinka:</p>
            <input
              type="text"
              name="email"
              className="form-input text-black w-full  mb-6 placeholder-white border-none rounded-lg "
              placeholder="Upišite lozninku..."
              style={inputStyle}
            />
          </div>

          <div className="flex-col">
            <p className="text-black text-left my-2">Potvrdite lozinku:</p>
            <input
              type="text"
              name="password"
              className="form-input text-black w-full  rounded-lg placeholder-white border-none"
              placeholder="Upišite lozinku..."
              style={inputStyle}
            />
          </div>
        </div>

        <p className="text-black text-left my-2 text-center">Datum rođenja:</p>

        <div className="flex justify-center items center ">
          <div className="w-1/5 ">
            <input
              type="date"
              name="email"
              className="form-input text-black w-full  mb-6  placeholder-white border-none rounded-lg "
              placeholder="Mjesec"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white  font-light py-1 px-8 rounded rounded-lg "
            style={detailsButtonStyle}
          >
            Registracija
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
