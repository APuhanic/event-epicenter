"use client";

import InputField from "@/components/inputField";
import React, { useState } from "react";
import SelectField from "@/components/admin/selectField";
import DateField from "@/components/datePicker";
import TextareaField from "@/components/textareaField";

const Admin = ({ title, date, location, description, imageUrl }) => {
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

  const [selectedPreference, setSelectedPreference] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImageUrl, setEventImageUrl] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleEventDateChange = (event) => {
    setEventDate(event.target.value);
    console.log(event.target.value);
  };

  const handlePreferenceChange = (event) => {
    setSelectedPreference(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setEventImageUrl(event.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white p-12 my-8 rounded-lg w-4/5 border-none focus:border-none"
        style={eventCardStyle}
      >
        <p className="text-black text-center">Admin</p>

        <div className="flex justify-between">
          <InputField
            name="eventName"
            label="Naziv događaja:"
            placeholder="Upišite naziv događaja..."
            type={"text"}
            className="w-full"
          />

          <SelectField
            label="Vrsta događaja"
            options={[
              { label: "Glazba", value: "glazba" },
              { label: "Sport", value: "sport" },
              { label: "Kultura", value: "kultura" },
            ]}
            value={selectedPreference}
            onChange={handlePreferenceChange}
          />

          <DateField
            label="Datum događanja"
            name="eventDate"
            value={eventDate}
            onChange={handleEventDateChange}
          />
        </div>

        <InputField
          name="eventName"
          label="Grad"
          placeholder="Upišite naziv grada..."
          type={"text"}
        />

        <InputField
          name="eventName"
          label="Adresa"
          placeholder="Upišite adresu..."
          type={"text"}
        />

        <InputField
          name="eventName"
          label="Cijena"
          placeholder="Upišite cijenu..."
          type={"number"}
        />

        <TextareaField
          label="Opis događaja"
          name="eventDescription"
          value={eventDescription}
          onChange={handleDescriptionChange}
        />

        <div className="flex justify-center ">
          <div className="flex-col w-3/5">
            <p className="text-black text-center my-2">Slika:</p>
            <input
              type="file"
              accept="image/*"
              name="eventImage"
              className="form-input text-black w-full rounded-lg placeholder-white border-none mb-6"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-8 rounded rounded-lg`}
            style={detailsButtonStyle}
          >
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
