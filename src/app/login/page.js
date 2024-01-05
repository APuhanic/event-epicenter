"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOGIN_ENDPOINT } from "@/api/endpoints";

const Login = ({}) => {
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

  const [email, setEmail] = useState("a@a.com");
  const [password, setPassword] = useState("12345678");
  const router = useRouter();

  const { userToken, setuserToken, isLoading, setIsLoading, setUserID } =
    useAuth();

  const handleLogin = async () => {
    try {
      const temp = JSON.stringify({ email, password });
      console.log("temp", temp);
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setuserToken(data.accessToken);
        setUserID(data.userId);
        router.replace("/profile");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-white p-12 my-8 rounded-lg w-2/5 border-none focus:border-none justify-center items-center"
        style={eventCardStyle}
      >
        <p className="text-black text-center">PRIJAVA</p>
        <p className="text-black text-left my-2">E-mail adresa:</p>
        <input
          type="text"
          name="email"
          className="form-input text-black w-full  mb-6 placeholder-white border-none rounded-lg "
          placeholder="Upišite e-mail"
          style={inputStyle}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-black text-left my-2">Lozinka:</p>
        <input
          type="password"
          name="password"
          className="form-input text-black w-full mb-20 rounded-lg placeholder-white border-none"
          placeholder="Upišite lozinku"
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white  font-light py-1 px-8 rounded mr-4 rounded-lg "
            style={detailsButtonStyle}
            onClick={handleLogin}
          >
            Prijava
          </button>
        </div>
        <div className=" text-black  mt-4">
          <Link href="/registration">
            <div className="flex flex-row text-center justify-center ">
              <p className="mr-2"> Nemaš profil? </p>
              <p className="text-center text-blue-500 hover:underline">
                Registriraj se
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
