import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

function Categories() {
  const { navigate } = useAppContext();
  return (
    <div className="mt-16 mb-10">
      <p className="text-2xl font-medium md:text-3xl">Categories</p>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg px-3 py-5"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              className="max-w-28 transition group-hover:scale-108"
              src={category.image}
              alt={category.text}
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
