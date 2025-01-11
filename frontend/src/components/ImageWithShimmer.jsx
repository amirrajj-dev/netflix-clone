import { useState } from "react";

const ImageWithShimmer = ({ src, alt }) => {
    const [isLoading, setIsLoading] = useState(false);
  
    const handleLoad = () => {
      setIsLoading(false);
    };
    const handleError = () => {
      setIsLoading(true);
    };
  
    return (
      <div className="relative h-56  sm:h-full overflow-hidden rounded w-full flex flex-col items-center">
        {isLoading && (
          <div className="shimmer loading-placeholder h-full w-full"></div>
        )}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover rounded-lg transition-all duration-500 hover:rotate-2  hover:scale-110"
          onLoad={handleLoad}
          onError={handleError}
          style={{ display: isLoading ? "none" : "block" }}
        />
      </div>
    );
};

export default ImageWithShimmer;