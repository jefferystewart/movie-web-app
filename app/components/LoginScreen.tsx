"use client";
import React, { useState } from "react";
import Loader from "./Loader";
import { useRouter } from 'next/navigation'
import { Montserrat } from "next/font/google";
import axios from "axios";


export const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    }
    if (emailRegex.test(email) && password.length >= 6) {
      console.log("Form submitted:", { email, password });
      try {
        const response = await axios.post(
          "https://movie-api-nine-orcin.vercel.app/api/signin",
          {
            email,
            password,
          }
        );
  
        if (response.status === 200) {
          console.log("Login successful:", response.data);
          localStorage.setItem('token', response.data.token)
          router.push("/my-movies");
        } else {
          console.error("Login failed:", response.data);
          
        }
      } catch (error: any) {
        console.error("Error during sign-in:", error.response.data.message);
        setPasswordError(error.response.data.message)
        
      }
       
    }
  };
  return (
    <>
      <div className="w-full max-w-md  ">
        <h1
          className={`mb-6 text-[56px] lg:text-[64px] leading-[80px] font-semibold text-center text-[#FFFFFF] `}
        >
          Sign in
        </h1>
        <form className={`flex flex-col items-center`} onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-[350px] lg:w-[300px] px-4 py-2 text-white bg-[#224957] border border-[#224957] h-[45px] rounded-[10px] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#224957]"
            />
            <label>{emailError}</label>
          </div>
          <div className="mb-4">
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[350px] lg:w-[300px] px-4 py-2 text-white bg-[#224957] border border-[#224957] h-[45px] rounded-[10px] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#224957]"
            />
          </div>
          <label className={`text-[#EB5757] text-[14px]`}>
            {passwordError}
          </label>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                className={` bg-[#224957] text-[14px]  appearance-none checked:bg-[#2BD17E] w-4 h-4 mr-2 rounded  checked:content-['✔']`}
              />
              Remember me
              <style jsx>{`
                input:checked::after {
                  content: "✔";
                  position: relative;
                  top: -3px;
                  left: 2.2px;
                  font-size: 12px;
                  color: white;
                }
              `}</style>
            </label>
          </div>
          <button
            type="submit"
            className="w-[350px] lg:w-[300px] py-2 font-semibold text-white bg-[#2BD17E] rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {!isLoading && 
            'Login'
            }
            {isLoading && 
            <Loader/>
            }
            
          </button>
        </form>
      </div>
    </>
  );
};
