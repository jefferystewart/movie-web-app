import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
import axios from "axios";

export const MovieListing = ({ movies }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 8;
    const totalMovies = movies.length;
    const totalPages = Math.ceil(totalMovies / moviesPerPage);
    const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  const navigateToEditMovie = (item: any) => {
    router.push({
      pathname: "/add-movies",
      query: { type: "edit", item: JSON.stringify(item) },
    });
  };
  const navigateToCreateMovie = () => {
    router.push({
      pathname: "/add-movies",
      query: { type: "new" },
    });
  };
  const logout = () => {
    router.push("/");
  };

  return (
    <>
      <div className={`flex justify-between  my-[4rem] px-4 lg:px-[8rem]`}>
        <div className={`flex items-center text-[#ffffff] mx-4`}>
          <h2
            className={` text-[32px] lg:text-[48px] leading-[56px] font-semibold `}
          >
            My movies
          </h2>
          <IoAddCircleOutline
            onClick={navigateToCreateMovie}
            className={`text-[32px] ml-4 cursor-pointer`}
          />
        </div>
        <div onClick={logout} className={`flex items-center cursor-pointer`}>
          <label
            className={`text-[#ffffff] lg:flex hidden text-[16px] font-bold`}
          >
            Logout
          </label>
          <MdLogout className={`text-[#ffffff] text-[32px] ml-6`} />
        </div>
      </div>
      <div
        className={`grid lg:grid-cols-4 lg:gap-6 gap-2 ml-[1rem]  grid-cols-2 lg:px-[8rem] `}
      >
        {currentMovies.map((item: any) => (
          <div
          key={item.id}
            onClick={() => navigateToEditMovie(item)}
            className={`col-span-1 w-[180px] lg:w-[282px] `}
          >
            <MovieCard data={item}   />
          </div>
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};
