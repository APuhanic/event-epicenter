"use client";
import React from "react";
import { REGISTER_ENDPOINT } from "@/api/endpoints";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { eventCardStyle, inputStyle, detailsButtonStyle } from "../styles";

const Register = ({  }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (!dateOfBirth) {
        console.error("Date of birth is required.");
        return;
      }
      const url = `${REGISTER_ENDPOINT}`;

      console.log("url", url);
      const eventTypeIds = [];

      if (document.getElementById("music").checked) {
        eventTypeIds.push("music");
      }
      if (document.getElementById("sport").checked) {
        eventTypeIds.push("sport");
      }
      if (document.getElementById("culture").checked) {
        eventTypeIds.push("culture");
      }
      const temp = JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        dob: new Date(dateOfBirth).toISOString(),
        eventTypeIds,
        city,
      });

      console.log("temp", temp);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: temp,
      });
      console.log("Response Status:", response.status);
      const responseData = await response.text();
      console.log("Response Data:", responseData);
      if (responseData == "EMAIL_EXISTS") {
        //TODO: alert unutar stranice
        alert("Korisnik s unesenom e-mail adresom već postoji!");
      }
      if (response.ok) {
        const data = await response;
        console.log("response", response);
        console.log("events", data);
        router.replace("/login");
      } else {
        console.error("Error fetching ", response.status);
      }
    } catch (error) {
      console.error(error);
    }
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
              onChange={(e) => setfirstName(e.target.value)}
              required
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
              onChange={(e) => setLastName(e.target.value)}
              required
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
              onChange={(e) => setEmail(e.target.value)}
              required
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
              onChange={(e) => setEmailConfirmation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex-col mr-10">
            <p className="text-black text-left my-2">Lozinka:</p>
            <input
              type="password"
              name="email"
              className="form-input text-black w-full  mb-6 placeholder-white border-none rounded-lg "
              placeholder="Upišite lozninku..."
              style={inputStyle}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex-col">
            <p className="text-black text-left my-2">Potvrdite lozinku:</p>
            <input
              type="password"
              name="password"
              className="form-input text-black w-full  rounded-lg placeholder-white border-none"
              placeholder="Upišite lozinku..."
              style={inputStyle}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex-col mr-10 w-1/5">
            <p className="text-black text-left my-2">Grad:</p>
            <input
              type="text"
              name="email"
              className="form-input text-black w-full  mb-6 placeholder-white border-none rounded-lg "
              placeholder="Upišite grad"
              style={inputStyle}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="flex-col">
            <p className="text-black text-left my-2 text-center">
              Datum rođenja:
            </p>

            <div className="flex justify-center items center ">
              <input
                type="date"
                name="email"
                className="form-input text-black w-full  mb-6  placeholder-white border-none rounded-lg "
                placeholder="Mjesec"
                style={inputStyle}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white  font-light py-1 px-8 rounded rounded-lg "
            style={detailsButtonStyle}
            onClick={handleRegister}
          >
            Registracija
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
