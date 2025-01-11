import React, { useState } from "react";
import Navbar from "./Navbar";
import useAuth from "../../../store/useAuth";
import { Info, Play } from "lucide-react";
import useTrendingContent from "../../hooks/useTrendingContent";
import { Link } from "react-router-dom";
import { useContentType } from "../../../store/useContentType";
import useGetContentByCategory from "../../hooks/useGetContentByCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ImageWithShimmer from '../ImageWithShimmer'

const AuthenticatedHomePage = () => {
  const { logout } = useAuth();
  const { content, isLoading, setIsLoading } = useTrendingContent();
  const { contentType } = useContentType();
  const movieCategories = ["now_playing", "top_rated", "popular", "upcoming"];
  const tvCategories = ["airing_today", "on_the_air", "popular", "top_rated"];
  const categories = contentType === "movies" ? movieCategories : tvCategories;
  const { categoryContent, errors } = useGetContentByCategory(categories);

  const getPath = () => content?.backdrop_path || content?.poster_path;
  const getTitle = () => content?.title || content?.name || "extraction";
  const getOverview = () =>
    content?.overview ||
    "After barely surviving his grievous wounds from his mission in Dhaka, Bangladesh, Tyler Rake is back, and his team is ready to take on their next mission.";
  const handleIsLoad = () => {
    setIsLoading(false);
  };
  const handleIsLoadError = () => {
    setIsLoading(true);
  };

  return (
    <>
      <div className="relative h-screen">
        {isLoading ? (
          <div className="shimmer loading-placeholder"></div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original/${getPath()}`}
            alt={getTitle()}
            onLoad={handleIsLoad}
            onError={handleIsLoadError}
            className="object-cover w-full h-full"
          />
        )}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/90 to-transparent"></div>
        <Navbar />
        <div className="absolute top-[30%] sm:top-[40%] left-[5%] sm:left-[10%] flex flex-col">
          <h2 className="text-white font-bold text-3xl sm:text-5xl md:text-6xl">
            {getTitle()}
          </h2>
          <p className="text-white font-bold text-sm sm:text-lg my-2 sm:my-3">
            {content?.release_date?.slice(0, 4)} | +18
          </p>
          <p className="font-medium max-w-[300px] sm:max-w-[660px] text-white text-sm sm:text-base md:text-lg capitalize line-clamp-2">
            {getOverview()}
          </p>
          <div className="flex items-center mt-4 gap-x-2 sm:gap-x-4">
            <Link
              to={`/watch/${content?.id}`}
              className="flex items-center justify-center text-nowrap gap-2 w-28 h-9 sm:w-28 sm:h-9 md:w-32 md:h-10 rounded-lg shadow bg-white text-black hover:bg-white/80"
            >
              <Play fill="black" />
              <span>Play</span>
            </Link>
            <Link
              to={`/watch/${content?.id}`}
              className="flex items-center justify-center text-nowrap gap-2 w-28 h-9 sm:w-28 sm:h-9 md:w-32 md:h-10 rounded-lg shadow bg-gray-600 text-white hover:bg-gray-700"
            >
              <Info />
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-black flex flex-col gap-6 sm:gap-10 pt-6 sm:pt-8 md:pt-10 px-4 sm:px-10 md:px-20">
        {categories.map((category , index) => (
        <div key={index + 1} className="mb-6 sm:mb-10">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 capitalize">
              {category.replace("_", " ")}
            </h2>
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
              navigation
              className="h-56 sm:h-72"
            >
              {categoryContent[category]?.map((item , index) => (
                <SwiperSlide className="" key={index + 1}>
                  <Link
                    to={`/watch/${item.id}`}
                    className="cursor-pointer relative"
                    key={item.id}
                  >
                    <ImageWithShimmer
                      src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                      alt={item.title}
                    />
                    <Link to={`/watch/${item.id}`} className="text-white text-base font-normal mt-2 text-center sm:text-sm md:text-base absolute z-50 bottom-2 left-0 right-0">
                      {item.title || item.name}
                    </Link>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </>
  );
};

export default AuthenticatedHomePage;