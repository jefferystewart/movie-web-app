import React from "react";

const MovieCard = ({ data }: any) => {
  const apiUrl = "https://movie-api-nine-orcin.vercel.app/api/";
  return (
    <>
      <div
        className={`bg-[#092C39] hover:bg-[#0829358C] rounded-[12px] py-4 px-4`}
      >
        <img className={`lg:h-[400px] h-[246px] w-[180px] lg:w-[266px]`} src={`/images/Rectangle 24.png`} alt="" />
        {/* <img
          className="lg:h-[400px] h-[246px] w-[180px] lg:w-[266px] object-cover"
          src={
            data.poster  !== ""
              ? `https://movie-api-nine-orcin.vercel.app/api/${data.poster}`
              : "images/images.png"
          }
          alt="Movie Poster"
        /> */}
        <div className={`flex flex-col mt-4`}>
          <label className={` text-[20px] text-[#ffffff] capitalize`}>{data.title}</label>
          <label className={` text-[14px] text-[#ffffff]`}>
            {data.publishing_year}
          </label>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
