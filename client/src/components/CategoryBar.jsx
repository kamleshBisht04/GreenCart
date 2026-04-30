import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const CategoryBar = () => {
  const { navigate } = useAppContext();
  const [active, setActive] = useState("");

  return (
    <div className="w-full overflow-hidden mt-20  bg-white">
      <div className="w-full px-4 py-3">
        <div className="scrollbar-hide flex w-max gap-7 overflow-x-auto scroll-smooth">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => {
                setActive(cat.path);
                navigate(`/products/${cat.path.toLowerCase()}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex min-w-[95px] cursor-pointer flex-col items-center"
            >
              {/* IMAGE (BIG + CLEAN) */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 p-1 transition duration-200 group-hover:scale-105">
                  <img
                    src={cat.image}
                    alt={cat.text}
                    className="h-16 w-16 object-contain"
                  />
                </div>

                {/* TEXT */}
                <p
                  className={`mt-2 text-sm font-semibold transition ${
                    active === cat.path
                      ? "text-black"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                >
                  {cat.text}
                </p>
              </div>

              {/* UNDERLINE (ONLY ACTIVE) */}
              <div className="mt-1 h-[2px] w-full overflow-hidden">
                <span
                  className={`bg-primary block h-full transition-all duration-300 ${
                    active === cat.path ? "w-full" : "w-0"
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
