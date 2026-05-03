import { categories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CategoryNavbar = () => {
  const { navigate } = useAppContext();
  const [active, setActive] = useState('');
  const location = useLocation();
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScroll();

    el.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);

    return () => {
      el.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  const scrollByAmount = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = Math.min(el.clientWidth * 0.8, 260);

    el.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const handleCategoryClick = (cat) => {
    setActive(cat.path);
    navigate(`/products/${cat.path.toLowerCase()}`);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // center active item
    setTimeout(() => {
      const el = document.getElementById(`cat-${cat.path}`);
      el?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }, 50);
  };

  return (
    <div className="fixed top-[64px] right-0 left-0 z-100 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      {/* fade edges */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-10 bg-gradient-to-l from-white to-transparent" />

      <div className="relative grid grid-cols-1 md:flex  items-center">
        {/* left button */}
        <button
          onClick={() => scrollByAmount('left')}
          disabled={!canScrollLeft}
          className={`absolute left-1 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition sm:left-2 sm:h-9 sm:w-9 ${!canScrollLeft ? 'pointer-events-none opacity-30' : 'hover:scale-105 active:scale-95'}`}
        >
          <FaChevronLeft size={12} />
        </button>

        {/* scroll container */}
        <div
          ref={scrollRef}
          onScroll={updateScroll}
          className="no-scrollbar flex w-full flex-nowrap items-center gap-2 overflow-x-auto scroll-smooth px-10 py-2 sm:gap-3 sm:px-12 sm:py-3 md:px-14"
        >
          {categories.map((cat) => {
            const isActive =
              active === cat.path ||
              location.pathname.includes(cat.path.toLowerCase());

            return (
              <div
                key={cat.path}
                id={`cat-${cat.path}`}
                onClick={() => handleCategoryClick(cat)}
                className={`flex-shrink-0 cursor-pointer rounded-full px-3 py-1 mt-1 md:mt-2 text-[11px] font-medium whitespace-nowrap transition-all sm:px-4 sm:text-sm ${
                  isActive
                    ? 'bg-primary scale-105 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {cat.text}
              </div>
            );
          })}
        </div>

        {/* right button */}
        <button
          onClick={() => scrollByAmount('right')}
          disabled={!canScrollRight}
          className={`absolute right-1 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition sm:right-2 sm:h-9 sm:w-9 ${!canScrollRight ? 'pointer-events-none opacity-30' : 'hover:scale-105 active:scale-95'}`}
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default CategoryNavbar;
