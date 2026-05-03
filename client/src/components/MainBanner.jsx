import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  const bannerImages = [
    assets.main_banner_bg1,
    assets.main_banner_bg,
    assets.main_banner_bg2,
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 8000); // 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* IMAGE SLIDER */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {bannerImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="banner"
            className="w-full flex-shrink-0 object-cover md:h-[500px]"
          />
        ))}
      </div>

      {/* CONTENT OVER IMAGE */}
      <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-24 md:items-start md:justify-center md:pb-0 md:pl-18 lg:pl-24">
        <h1 className="max-w-72 text-center text-3xl font-bold md:max-w-80 md:text-left md:text-4xl lg:max-w-105 lg:text-5xl">
          Freshness You Can Trust, Delivered to Your Door!
        </h1>

        <div className="mt-6 flex items-center font-medium">
          <Link
            to={'/products'}
            className="bg-primary hover:bg-primary-dull rounded px-7 py-3 text-white"
          >
            Shop now
          </Link>
        </div>
      </div>

      {/* DOTS NAVIGATION */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {bannerImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full ${
              i === current ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBanner;
