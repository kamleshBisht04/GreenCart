import { categories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CategoryBar = () => {
  const { navigate } = useAppContext();
  const [active, setActive] = useState('');
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();

    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = scrollRef.current?.firstChild?.offsetWidth + 16;
    el.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative mt-20 bg-white">
      {/* LEFT BUTTON */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute top-1/2 -left-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* RIGHT BUTTON */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute top-1/2 -right-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
        >
          <FaChevronRight />
        </button>
      )}

      {/* SCROLL AREA (NO SCROLLBAR) */}
      <div className="px-6 py-4">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => {
                setActive(cat.path);
                navigate(`/products/${cat.path.toLowerCase()}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex min-w-[85px] cursor-pointer flex-col items-center justify-start"
            >
              {/* IMAGE BOX */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl border transition duration-200 ${
                  active === cat.path
                    ? 'border-primary shadow-sm'
                    : 'border-gray-200'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.text}
                  className="h-12 w-12 object-contain transition-transform duration-200 hover:scale-110"
                />
              </div>

              {/* TEXT */}
              <p
                className={`hover:text-primary-dull mt-2 w-[70px] text-center text-[15px] leading-tight font-medium transition-colors duration-200 ${
                  active === cat.path ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {cat.text}
              </p>

              {/* ACTIVE LINE */}
              <div className="mt-1 h-[2px] w-full overflow-hidden">
                <span
                  className={`bg-primary block h-full transition-all duration-300 ${
                    active === cat.path ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
