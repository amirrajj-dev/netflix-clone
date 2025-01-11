import React, { useState } from 'react';

const Tv = ({ name, original_name, overview, poster_path, backdrop_path, first_air_date, vote_average }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleOverview = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center relative lg:max-h-[490px] lg:overflow-auto bg-gray-800 p-6 rounded-xl shadow-lg gap-6 text-white transition-transform transform hover:scale-105">
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={name}
        className="w-full sm:w-48 h-auto rounded-lg object-cover shadow-md"
      />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold">{name || original_name}</h2>
          <span className="text-sm sm:text-base bg-blue-600 px-3 py-1 rounded-lg absolute top-3 left-3">{first_air_date}</span>
        </div>
        <h3 className="italic text-md sm:text-lg text-gray-300">{original_name}</h3>
        <p className="text-sm sm:text-base text-gray-400">
          {isExpanded ? overview : `${overview?.substring(0, 100)}... `}
          <button onClick={toggleOverview} className="text-blue-500 hover:underline">
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-yellow-400 text-lg">{vote_average.toFixed(1)} ⭐</span>
        </div>
        <div className="relative w-full mt-4 rounded-lg overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={name}
            className="w-full rounded-lg shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-2xl sm:text-3xl text-white font-semibold">{name || original_name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tv;