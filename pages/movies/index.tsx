import { LoginScreen } from "@/app/components/LoginScreen";
import { MovieListing } from "@/app/components/MovieListing";
import React, { useEffect, useState } from "react";
import "../../app/globals.css";
// import { montserrat } from "@/app/layout";
import { Router, useRouter } from "next/router";
import axios from "axios";

const index = () => {
  const [movies, setMovies] = useState([]);
  const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  const [token, setToken] = useState<string | null>(null);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
      }
    }, []);
  
    useEffect(() => {
      const fetchMovies = async () => {
        if (!token) return;
  
        try {
          const response = await axios.get('https://movie-api-nine-orcin.vercel.app/api/movie', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMovies(response.data.data);
        } catch (err) {
          setError('Failed to load movies.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMovies();
    }, [token]);

  const addMovie = () => {
    router.push('/add-movies');
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#093545]">
        {movies.length === 0 && 
        <div className={`flex flex-col items-center mx-[1rem]`} >
        <h2 className={`text-[#ffffff]  text-center text-[32px] mx-[2rem] lg:text-[48px] leading-[40px] lg:leading-[56px] mb-[3rem]`}>Your movie list is empty</h2>
        <button
        onClick={addMovie}
        className={`bg-[#2BD17E] text-[#ffffff] rounded-[10px]  text-[16px] font-bold leading-[24px] w-full   lg:w-[220px] h-[56px]`}>Add a new movie</button>
        </div>
        }
        {movies.length>0 && 
        <div className={`w-full`}>

         <MovieListing/>
        </div>
        } 
        <img
          src="/images/Vectors.svg"
          className={`hidden lg:flex absolute bottom-0 w-full `}
        />
        <img
          src="/images/Vectors_mbl.svg"
          className={`flex lg:hidden absolute bottom-0 w-full `}
        />
      </div>
      
    </>
  );
};

export default index;
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

