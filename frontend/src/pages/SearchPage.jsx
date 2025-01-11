import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Person from "../components/search/Person";
import Movie from "../components/search/Movie";
import Tv from "../components/search/Tv";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [tabValue, setTabValue] = useState("");
  const [content, setContent] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearchPageContent = async () => {
    if (tabValue === "") {
      toast.error("Please select a search type for the search");
      return;
    }
    if (searchInputValue.trim()) {
      setIsLoading(true);
      setNotFound(false);
      try {
        const { data } = await axios.get(
          `/api/search/${tabValue}/${searchInputValue}`
        );
        if (data.data.length > 0) {
          setContent(data.data);
          setNotFound(false);
        } else {
          setNotFound(true);
          setContent([]);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-28">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setTabValue("movie")}
              className={`${
                tabValue === "movie" ? "bg-red-500" : "bg-gray-600"
              } text-white rounded shadow-sm w-20 h-10 flex items-center justify-center transition-all duration-300 hover:bg-red-500`}
            >
              Movies
            </button>
            <button
              onClick={() => setTabValue("tv")}
              className={`${
                tabValue === "tv" ? "bg-red-500" : "bg-gray-600"
              } text-white rounded shadow-sm w-20 h-10 flex items-center justify-center transition-all duration-300 hover:bg-red-500`}
            >
              Tv Shows
            </button>
            <button
              onClick={() => setTabValue("person")}
              className={`${
                tabValue === "person" ? "bg-red-500" : "bg-gray-600"
              } text-white rounded shadow-sm w-20 h-10 flex items-center justify-center transition-all duration-300 hover:bg-red-500`}
            >
              People
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <input
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder="Search For Movies , Tv Show , Actors ..."
              type="text"
              className="bg-gray-600 text-white px-3 w-68 sm:w-80 md:w-[550px] h-8 border-none outline-none rounded shadow-sm placeholder:text-white/70"
            />
            <button
              type="search"
              className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded shadow-sm"
              onClick={handleSearchPageContent}
            >
              <Search className="" />
            </button>
          </div>
          <div className="mt-12 text-white">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : notFound ? (
              <div className="text-center">No results found</div>
            ) : (
              <>
                {tabValue === "movie" && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
                    {content
                      .filter((item) => item.backdrop_path !== null)
                      ?.map((item, index) => (
                        <Link key={index + 1} to={`/watch/${item.id}`}>
                          <Movie {...item} />
                        </Link>
                      ))}
                  </div>
                )}
                {tabValue === "tv" && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
                    {content
                      .filter((item) => item.backdrop_path !== null)
                      ?.map((item, index) => (
                        <Link key={index + 1} to={`/watch/${item.id}`}>
                          <Tv {...item} />
                        </Link>
                      ))}
                  </div>
                )}
                {tabValue === "person" && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
                    {content
                      .filter((item) => item.profile_path !== null)
                      ?.map((item, index) => (
                        <Person key={index + 1} {...item} />
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;