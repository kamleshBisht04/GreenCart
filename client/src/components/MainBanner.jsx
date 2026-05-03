import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  const desktopImages = [
    assets.main_banner_bg1,
    assets.main_banner_bg,
    assets.main_banner_bg2,
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % desktopImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* ✅ MOBILE IMAGE (UNCHANGED) */}
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* ✅ DESKTOP SLIDER ONLY (md+) */}
      <div className="relative hidden h-[32rem] overflow-hidden rounded-2xl md:block">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {desktopImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="banner"
              className="h-[32rem] w-full flex-shrink-0 overflow-hidden rounded-2xl object-cover"
            />
          ))}
        </div>
      </div>

      {/* ✅ CONTENT (UNCHANGED EXACT CLASS) */}
      <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-24 md:items-start md:justify-center md:pb-0 md:pl-18 lg:pl-24">
        <h1 className="max-w-72 text-center text-3xl leading-tight font-bold md:max-w-80 md:text-left md:text-4xl lg:max-w-105 lg:text-5xl lg:leading-15">
          Freshness You Can Trust, Delivered to Your Door!
        </h1>

        <div className="mt-6 flex items-center font-medium">
          <Link
            to={'/products'}
            className="group bg-primary hover:bg-primary-dull flex cursor-pointer items-center gap-2 rounded px-7 py-3 text-white transition md:px-9"
          >
            Shop now
            <img
              className="group-focus::translate-x-1 transition md:hidden"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          <Link
            to={'/products'}
            className="group hidden cursor-pointer items-center gap-2 px-9 py-3 md:flex"
          >
            Explore deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>

      {/* ✅ DOTS (ONLY FOR DESKTOP) */}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 gap-2 md:flex">
        {desktopImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === current ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBanner;
