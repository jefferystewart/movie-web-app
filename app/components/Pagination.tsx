import React, { useState } from 'react'

const Pagination = ({setCurrentPage, currentPage, totalPages}: any) => {
    
  return (
   <>
   <div className="flex justify-center items-center space-x-4 pb-10 mt-4">
        <button
          onClick={() => setCurrentPage((prev: any) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "text-gray-400" : "text-white"
          } hover:text-green-400 text-[16px]  font-bold`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 ${
              currentPage === index + 1
                ? "bg-[#2BD17E] text-white"
                : "bg-[#092C39] text-white"
            } rounded-md font-bold `}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev: any) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages ? "text-gray-400" : "text-white"
          } hover:text-green-400 text-[16px]  font-bold`}
        >
          Next
        </button>
      </div>
   </>
  )
}

export default Pagination