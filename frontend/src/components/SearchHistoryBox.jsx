import React from 'react';
import { Trash2 } from 'lucide-react';

const SearchHistoryBox = ({ title, createdAt, image, onDelete , id }) => {
  return (
    <div className="flex flex-row items-center bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg gap-4 sm:gap-6 text-white transition-transform transform hover:scale-105 w-full max-w-md mx-auto">
      <img
        src={`https://image.tmdb.org/t/p/original/${image}`}
        alt={title}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover shadow-md"
      />
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
        <p className="text-sm sm:text-base text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
        <button
          onClick={()=>onDelete(id)}
          className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-lg flex items-center gap-2 mt-2 self-start"
        >
          <Trash2 className="w-5 h-5" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default SearchHistoryBox;