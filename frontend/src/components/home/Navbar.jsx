import React, { useEffect, useState } from "react";
import { Search, User, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../store/useAuth";
import { useContentType } from "../../../store/useContentType";
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout } = useAuth();
  const {setContentType} =  useContentType()
  const [searchInputValue , setSerachInputValue] = useState('')
  const navigate = useNavigate()
  const searchHandeler = (e)=>{
    if (e.keyCode === 13){
      navigate(`/search?q=${searchInputValue}`)
    }
  }
  return (
    <>
      <nav className="bg-transparent fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/">
                <img
                  className="h-8 w-auto sm:h-10"
                  src="/netflix-logo.png"
                  alt="Netflix Logo"
                />
              </Link>
              <ul className="hidden sm:flex items-center  justify-center gap-x-4 text-white ml-4">
                <li>
                  <Link onClick={()=>setContentType('movies')}>Movies</Link>
                </li>
                <li>
                  <Link onClick={()=>setContentType('tv')}>Tv Shows</Link>
                </li>
                <li>
                  <Link to={'/search-history'}>Search History</Link>
                </li>
              </ul>
            </div>
            <div className="hidden flex-1 sm:flex">
              <Link to={'/search'} className="flex-1 flex px-2 lg:ml-6 justify-end">
                <Search className="text-white w-6 h-6 translate-y-0.5 mr-2" />
              </Link>
              <div className="flex items-center">
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-400 transition-colors duration-300"
                >
                  <img
                    src={user.image}
                    className="h-8 w-8 rounded"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    const areYouSure = confirm(
                      "Are you sure you want to log out"
                    );
                    if (areYouSure) {
                      logout();
                    }
                  }}
                  className="ml-6 text-white hover:text-gray-400 transition-colors duration-300"
                >
                  <LogOut className="h-6 w-6" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="sm:hidden relative">
              <Menu
                className="text-white w-8 h-8 cursor-pointer"
                onClick={() => setShowMobileMenu((prev) => !prev)}
              />
              {showMobileMenu && (
                <div className="absolute top-11 right-3 w-64 rounded shadow-lg p-4 bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-6 text-white">
                  <div className="w-full px-4">
                  </div>
                  <div className="flex space-x-6">
                    <Link
                      to="/profile"
                      className="text-white hover:text-gray-400 transition-colors duration-300"
                    >
                      <img
                        src={user.image}
                        className="h-8 w-8 rounded"
                        aria-hidden="true"
                      />
                    </Link>
                    <Link to={'/search'}>
                    <Search className="text-white w-6 h-6" />
                    </Link>
                    <Link
                      to="/"
                      onClick={() => {
                        const areYouSure = confirm(
                          "Are you sure you want to log out"
                        );
                        if (areYouSure) {
                          logout();
                        }
                      }}
                      className="text-white hover:text-gray-400 transition-colors duration-300"
                    >
                      <LogOut className="h-6 w-6" aria-hidden="true" />
                    </Link>
                  </div>
                  <ul className="space-y-4 text-center">
                    <li>
                      <Link
                        to="/"
                        onClick={()=>setContentType('movies')}
                        className="text-lg hover:text-gray-400 transition-colors duration-300"
                      >
                        Movies
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        onClick={()=>setContentType('tv')}
                        className="text-lg hover:text-gray-400 transition-colors duration-300"
                      >
                        TV Shows
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/search-history"
                        className="text-lg hover:text-gray-400 transition-colors duration-300"
                      >
                        Search History
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
