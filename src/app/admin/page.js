"use client";

import InputField from "@/components/inputField";
import React, { useEffect, useState } from "react";
import SelectField from "@/components/admin/selectField";
import DateField from "@/components/datePicker";
import TextareaField from "@/components/textareaField";
import { eventCardStyle, detailsButtonStyle, inputStyle } from "../styles";
import { EVENTS_ENDPOINT, EVENT_IMAGE_ENDPOINT } from "@/api/endpoints";
import { useAuth } from "@/contexts/authContext";
import { fetchEvents } from "@/api/api";
import AdminEventList from "@/components/admin/adminEventList";

const Admin = ({}) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [eventTypeId, setEventTypeId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setdate] = useState("");
  const [location, setLocation] = useState("");

  const { getTokenFromLocalStorage, getUserIDFromLocalStorage } = useAuth();

  const [eventImage, setEventImage] = useState(null);
  const [imagePath, setImagePath] = useState("");

  const userID = getUserIDFromLocalStorage();
  const userToken = getTokenFromLocalStorage();

  const [events, setEvents] = useState([]);

  const handleImageAsFile = (e) => {
    setEventImage(e.target.files[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchEvents();
    setEvents(data);
  };

  const resetFields = () => {
    setName("");
    setCity("");
    setAddress("");
    setPrice(0);
    setEventTypeId("");
    setDescription("");
    setdate("");
    setLocation("");
    setEventImage(null);
    setImagePath("");
  };

  const handleAddEvent = async () => {
    const imagePath = await handleImageUpload();
    console.log("eventImageData:", imagePath);

    const temp = JSON.stringify({
      address,
      city,
      date: new Date(date).toISOString(),
      description,
      eventTypeId,
      imagePath,
      location,
      name,
      price,
    });
    console.log("temp", temp);

    try {
      const url = `${EVENTS_ENDPOINT}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: temp,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("response", response);
        console.log("data", data);
        resetFields();
        fetchData();
      } else {
        console.error("Error adding events", response.status);
        console.error("Error adding events", response.body);
        console.error("Error adding events", response);
      }
    } catch (error) {
      console.error("Error adding events", error);
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", eventImage);

      const response = await fetch(EVENT_IMAGE_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Image uploaded successfully:", data);
        return data;
      } else {
        console.error("Image upload failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const onEventDelete = (eventID) => {
    const newEvents = events.filter((event) => event.id !== eventID);
    setEvents(newEvents);
  };

  return (
    <>
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
              className="w-full "
              onChange={(e) => setName(e.target.value)}
              
            />

            <SelectField
              label="Vrsta događaja"
              options={[
                { label: "Glazba", value: "glazba" },
                { label: "Sport", value: "sport" },
                { label: "Kultura", value: "kultura" },
              ]}
              value={eventTypeId}
              onChange={(e) => setEventTypeId(e.target.value)}
            />

            <DateField
              label="Datum događanja"
              name="date"
              value={date}
              onChange={(e) => setdate(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <div className="w-full mr-5">
              <InputField
                name="eventName"
                label="Grad"
                placeholder="Upišite naziv grada..."
                type={"text"}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="w-full ml-5">
              <InputField
                name="location"
                label="Lokacija"
                placeholder="Upišite naziv lokacije..."
                type={"text"}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <InputField
            name="eventName"
            label="Adresa"
            placeholder="Upišite adresu..."
            type={"text"}
            onChange={(e) => setAddress(e.target.value)}
          />

          <InputField
            name="eventName"
            label="Cijena"
            placeholder="Upišite cijenu..."
            type={"number"}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextareaField
            label="Opis događaja"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-center ">
            <div className="flex-col w-3/5">
              <p className="text-black text-center my-2">Slika:</p>
              <input
                type="file"
                accept="image/*"
                name="eventImage"
                className="form-input text-black w-full rounded-lg placeholder-white border-none mb-6"
                onChange={handleImageAsFile}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-8 rounded rounded-lg`}
              style={detailsButtonStyle}
              onClick={handleAddEvent}
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <AdminEventList events={events} onEventDelete={onEventDelete}/>
      </div>
    </>
  );
};

export default Admin;
