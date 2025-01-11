import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContentType } from "../../store/useContentType";
import axios from "axios";
import Navbar from "../components/home/Navbar";
import {
  ChevronRight,
  ChevronLeft,
  Reply,
  Clock,
  Home,
  Film,
  Users,
  Globe,
} from "lucide-react";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import ImageWithShimmer from "../components/ImageWithShimmer";

const DetailsPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [content, setContent] = useState([]);
  const { contentType } = useContentType();
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [isLoadingTrailers, setIsLoadingTrailers] = useState(true);
  const [isLoadingSimillars, setIsLoadingSimillars] = useState(true);
  const [simillars, setSimillars] = useState([]);
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [prevTrailerIndex, setPrevTrailerIndex] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get(`/api/${contentType}/${id}/details`);
      if (!data) {
        setContent([]);
      } else {
        setContent(data);
        setIsLoadingContent(false);
      }
    };
    const fetchTrailers = async () => {
      const { data } = await axios.get(`/api/${contentType}/${id}/trailers`);
      if (!data.data.results) {
        setTrailers([]);
        return;
      } else {
        setTrailers(data.data.results);
        setIsLoadingTrailers(false);
      }
    };
    const fetchSimillars = async () => {
      const { data } = await axios.get(`/api/${contentType}/${id}/simillar`);
      if (!data.data.results) {
        setSimillars([]);
        return;
      } else {
        setSimillars(data.data.results);
        setIsLoadingSimillars(false);
      }
    };
    fetchDetails();
    fetchTrailers();
    fetchSimillars();
  }, [id, contentType]);

  const handleShowNextTrailer = () => {
    if (currentTrailerIndex >= trailers.length - 1) return;
    setCurrentTrailerIndex((prev) => prev + 1);
    setPrevTrailerIndex(currentTrailerIndex);
  };

  const handleShowPrevTrailer = () => {
    if (currentTrailerIndex <= 0) return;
    setCurrentTrailerIndex(currentTrailerIndex - 1);
    setPrevTrailerIndex(currentTrailerIndex);
  };
  
  return (
    <>
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto pt-40 p-4">
          <div className="flex items-center justify-between">
            <button
              className={`bg-gray-600 flex items-center justify-center rounded p-2 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleShowPrevTrailer}
              disabled={currentTrailerIndex <= 0}
            >
              <ChevronLeft />
            </button>
            <button
              className={`bg-gray-600 flex items-center justify-center rounded p-2 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleShowNextTrailer}
              disabled={currentTrailerIndex === trailers.length - 1}
            >
              <ChevronRight />
            </button>
          </div>
          {isLoadingTrailers ? (
            <div className="shimmer min-h-screen mt-8 rounded"></div>
          ) : (
            <div className="flex flex-col p-4 sm:p-8 lg:p-16">
              <div className="w-full h-[650px] aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
                  width={"100%"}
                  height={"100%"}
                  controls={true}
                />
              </div>
            </div>
          )}

          <div className="mt-20 text-white">
            {isLoadingContent ? (
              <div className="shimmer min-h-screen rounded"></div>
            ) : (
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <img
                  src={`https://image.tmdb.org/t/p/original/${content?.data?.poster_path}`}
                  alt={content?.data?.title}
                  className="w-full lg:w-1/3 rounded-xl shadow-lg"
                />
                <div className="flex flex-col gap-4 lg:w-2/3">
                  <h1 className="text-3xl lg:text-5xl font-bold">
                    {content?.data?.title}
                  </h1>
                  <p className="text-lg font-semibold italic">
                    {content?.data?.tagline}
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg">
                    {content?.data?.overview}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <p>{content?.data?.release_date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Reply className="w-5 h-5" />
                      <p>{content?.data?.vote_average}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-5 h-5" />
                      <a
                        href={content?.data?.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-400"
                      >
                        Official Website
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {content?.data?.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-600 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Film className="w-5 h-5" />
                      <p>{content?.data?.runtime} min</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      <p>
                        {content?.data?.spoken_languages
                          ?.map((lang) => lang.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold">Production Companies</h2>
                    <ul className="list-disc list-inside mt-2">
                      {content?.data?.production_companies?.map((company) => (
                        <li key={company.id}>{company.name}</li>
                      ))}
                    </ul>
                  </div>
                  {content?.data?.cast && (
                    <div className="mt-4">
                      <h2 className="text-2xl font-bold">Cast</h2>
                      <ul className="list-disc list-inside mt-2">
                        {content?.data?.cast?.map((actor) => (
                          <li key={actor.id}>
                            {actor.name} as {actor.character}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {simillars.length > 0 && (
            <div className="text-white mt-24">
              <h2 className="capitalize font-medium text-3xl">
                simillar movies and tv shows
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
                {simillars.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      to={`/watch/${item?.id}`}
                      className="cursor-pointer relative"
                    >
                      <ImageWithShimmer
                        src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                        alt={item?.title}
                      />
                      <Link
                        to={`/watch/${item.id}`}
                        className="text-white text-base font-normal mt-2 text-center sm:text-sm md:text-base absolute z-50 bottom-2 left-0 right-0"
                      >
                        {item?.title || item?.name}
                      </Link>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsPage;