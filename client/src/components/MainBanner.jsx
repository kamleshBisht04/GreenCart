import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  const slides = [
    {
      img: assets.main_banner_bg1,
      title: 'Freshness You Can Trust, Delivered to Your Door!',
    },
    {
      img: assets.main_banner_bg,
      title: 'Real Freshness, Real Fast, Every Single Day',
    },
    {
      img: assets.main_banner_bg2,
      title: 'Lightning Fast Delivery, Right When You Need It',
    },
  ];

  //  clone first slide at end
  const extendedSlides = [...slides, slides[0]];

  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState(true);

  //  Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  //  Infinite loop fix (no jump)
  useEffect(() => {
    if (current === slides.length) {
      setTimeout(() => {
        setTransition(false); // remove animation
        setCurrent(0); // jump to real first
      }, 700);

      setTimeout(() => {
        setTransition(true); // restore animation
      }, 750);
    }
  }, [current, slides.length]);

  return (
    <div className="relative">
      {/* MOBILE */}
      {/* MOBILE */}
      <div className="relative md:hidden">
        <img
          src={slides[current % slides.length].img}
          alt="banner"
          className="h-[55vh] w-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-start justify-start px-4 pt-16">
          <h1 className="max-w-[10rem] text-center text-xl leading-tight font-bold">
            Experience Real Freshness, Delivered Right to Your Doorstep.
          </h1>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="relative hidden h-[32rem] overflow-hidden rounded-2xl md:block">
        <div
          className="flex"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: transition
              ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
          }}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              className="relative h-[32rem] w-full flex-shrink-0"
            >
              {/* IMAGE */}
              <img
                src={slide.img}
                alt="banner"
                className="h-full w-full rounded-2xl object-cover"
              />

              {/* CONTENT (inside slide) */}
              <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-24 md:items-start md:justify-center md:pl-18 lg:pl-24">
                <h1 className="max-w-72 text-center text-3xl leading-tight font-bold md:max-w-80 md:text-left md:text-4xl lg:max-w-105 lg:text-5xl lg:leading-15">
                  {slide.title}
                </h1>

                <div className="mt-6 flex items-center font-medium">
                  <Link
                    to="/products"
                    className="group bg-primary hover:bg-primary-dull flex cursor-pointer items-center gap-2 rounded px-7 py-3 text-white transition md:px-9"
                  >
                    Shop now
                    <img
                      className="transition md:hidden"
                      src={assets.white_arrow_icon}
                      alt="arrow"
                    />
                  </Link>

                  <Link
                    to="/products"
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
            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 gap-2 md:flex">
        {slides.map((_, i) => (
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
