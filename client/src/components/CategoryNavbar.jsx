import { categories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CategoryNavbar = () => {
  const { navigate } = useAppContext();
  const [active, setActive] = useState('');
  const location = useLocation();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -180, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 180, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-[64px] right-0 left-0 z-40 w-full overflow-hidden border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="relative flex items-center">
        {/* ⬅ LEFT BUTTON (responsive size) */}
        <button
          onClick={scrollLeft}
          className="absolute left-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow sm:left-2 sm:h-8 sm:w-8 md:h-9 md:w-9"
        >
          <FaChevronLeft size={12} />
        </button>

        {/* 🔥 SCROLL AREA (NO OUTSIDE SCROLLBAR EVER) */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex w-full gap-6 overflow-hidden scroll-smooth px-10 py-3 sm:gap-8 sm:px-14 md:px-16"
        >
          {categories.map((cat, index) => {
            const isActive =
              active === cat.path ||
              location.pathname.includes(cat.path.toLowerCase());

            return (
              <div
                key={index}
                onClick={() => {
                  setActive(cat.path);
                  navigate(`/products/${cat.path.toLowerCase()}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative flex-shrink-0 cursor-pointer text-xs font-medium whitespace-nowrap transition sm:text-sm md:text-sm lg:text-base ${
                  isActive ? 'text-primary' : 'text-gray-600 hover:text-black'
                }`}
              >
                {cat.text}

                {/* underline */}
                <span
                  className={`bg-primary absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* ➡ RIGHT BUTTON (responsive size) */}
        <button
          onClick={scrollRight}
          className="absolute right-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow sm:right-2 sm:h-8 sm:w-8 md:h-9 md:w-9"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default CategoryNavbar;
