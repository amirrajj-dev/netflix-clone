import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-not-found min-h-screen flex items-center justify-center text-white px-2 sm:px-0">
      <div className="flex items-center justify-center flex-col gap-8 px-3 py-5 sm:px-6 sm:py-8 bg-black bg-opacity-80 rounded-xl shadow-2xl border border-gray-700 transform transition-transform duration-500 hover:scale-105 animate-fadeIn">
        <h1 className="text-6xl sm:text-9xl font-extrabold text-shadow-lg animate-pulse">404</h1>
        <h2 className="text-3xl sm:text-5xl font-bold text-shadow-md animate-bounce">Page Not Found</h2>
        <p className="text-base sm:text-xl text-shadow-sm brightness-110 text-gray-100 text-center max-w-lg">
          Oops! The page you're looking for seems to have vanished. It might have been removed or the URL might be incorrect. Let's get you back on track!
        </p>
        <Link to="/" className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-shadow-md text-white px-4 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 text-base sm:text-xl font-bold shadow-md hover:shadow-lg transform hover:scale-110 animate-wiggle">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;