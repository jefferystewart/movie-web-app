import React, { useEffect, useState } from "react";
import { CgSoftwareDownload } from "react-icons/cg";
import "../app/globals.css";
import { useRouter } from "next/router";

const AddMovies = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage]: any= useState(null);

  const router = useRouter();
    const { type, item } = router.query;

    useEffect(() => {
        if (item) {
          const movieData = JSON.parse(item as string);
    
          setTitle(movieData.title || "");
          setYear(movieData.publishing_year || "");
        }
      }, [item]);
    

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result: any = e.target?.result;
        console.log("Image preview data:", result); 
        if (result) {
          setImage(result as string); 
        }
      };
  
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
  
      reader.readAsDataURL(file); 
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!title || !year ) {
      alert("Please fill all fields and upload an image.");
      return;
    }
  
    try {
        const storedToken = localStorage.getItem("token");
        const movieData = type === 'edit' ? JSON.parse(item as string) : '';
        const payload = {
            title,
            publishing_year: year,
          };
          const apiUrl =
          type === "new"
            ? "https://movie-api-nine-orcin.vercel.app/api/movie"
            : `https://movie-api-nine-orcin.vercel.app/api/movie/${movieData.id}`;
    
        const method = type === "new" ? "POST" : "PUT";
      const response = await fetch(apiUrl, {
        method: method,
        body: JSON.stringify(payload),
        headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit movie details.");
      }
  
      const data = await response.json();
      console.log("Movie added successfully:", data);
      router.push('my-movies')
    //   alert("Movie added successfully!");
  
      handleCancel();
    } catch (error) {
      console.error("Error submitting movie:", error);
      alert("Error submitting movie. Please try again.");
    }
  };
  

  const handleCancel = () => {
    setTitle("");
    setYear("");
    setImage(null);
    console.log("Cancelled");
  };

  return (
    <div className="min-h-screen flex justify-center lg:items-center bg-[#062a3e]">
      <div className="lg:pb-10 flex flex-col w-[100%] mx-[6rem] my-[2rem] lg:my-[4rem]">
        <h1
          className={`text-2xl lg:text-[48px] text-white font-semibold mb-[2rem] `}
        >
          {type === 'new' && 
          'Create a new movie'
          }
          {type === 'edit' && 
          'Edit'
          }
        </h1>
        <div className="flex flex-col-reverse lg:flex-row lg:mt-[4rem] w-full">
          <div className="relative flex items-center justify-center h-[372px] lg:w-[473px] mt-[2rem] lg:mt-[0]  bg-[#224957] border-2 border-dashed border-gray-400 rounded-lg mb-6 lg:mb-0">
            {image ? (
              <img
                src={image|| ""}
                alt="Uploaded Preview"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center flex flex-col justify-center items-center text-white">
                <CgSoftwareDownload className={`text-[24px]`} />
                <p
                  className={`text-[#FFFFFF] text-[14px] `}
                >
                  Drop an image here
                </p>
              </div>
            )}
            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6 lg:ml-[10rem]"
          >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[362px] h-[45px] px-4 py-2 bg-[#224957] text-white border border-[#224957] rounded-md focus:outline-none focus:ring-2 focus:ring-[#224957]"
            />
            <input
              type="number"
              placeholder="Publishing year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-[362px] lg:w-[216px] h-[45px] px-4 py-2 bg-[#224957] text-white border border-[#224957] rounded-md focus:outline-none focus:ring-2 focus:ring-[#224957]"
            />
            <div className="hidden lg:flex !mt-[4rem]">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 w-[167px] bg-transparent border border-white text-white rounded-md hover:bg-gray-700 mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#2BD17E] w-[167px] text-white rounded-md hover:bg-green-600"
              >
                {type === 'new' && 'Submit'}
                {type === 'edit' && 'Update'}
              </button>
            </div>
          </form>
        </div>
        <div className="flex lg:hidden !lg:mt-[4rem]">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 w-[167px] bg-transparent border border-white text-white rounded-md hover:bg-gray-700 mr-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#2BD17E] w-[167px] text-white rounded-md hover:bg-green-600"
          >
            {type === 'new' && 'Submit'}
            {type === 'edit' && 'Update'}
          </button>
        </div>
      </div>
      <img
        src="/images/Vectors.svg"
        className={`hidden lg:flex absolute bottom-0 w-full`}
      />
      <img
        src="/images/Vectors_mbl.svg"
        className={`flex lg:hidden absolute bottom-0 w-full`}
      />
    </div>
  );
};

export default AddMovies;
