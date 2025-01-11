import React from 'react';
import { Link } from 'react-router-dom';

const Person = ({ profile_path, name, known_for }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-white rounded-lg shadow-lg bg-gray-800 p-6 transition-transform transform hover:scale-105">
      <img
        src={`https://image.tmdb.org/t/p/original/${profile_path}`}
        alt={name}
        className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover shadow-md"
      />
      <h2 className="text-lg sm:text-xl font-semibold">{name}</h2>
      <div className="w-full mt-4">
        <h3 className="text-sm sm:text-md font-medium underline">Known For:</h3>
        <div className="flex flex-row gap-2 mt-2">
          {known_for?.filter(item=>item?.backdrop_path !== null)?.map((item) => (
            <Link to={`/watch/${item?.id}`}
              key={item?.id}
              className="flex flex-col items-center justify-center p-2 bg-gray-700 rounded-lg shadow-sm w-full sm:w-1/3 transition-transform transform hover:scale-105"
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                alt={name}
                className="w-full h-24 sm:h-32 rounded-lg object-cover"
              />
              <p className="text-sm mt-2 text-center">{item?.name || item?.title || item?.orignal_title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Person;