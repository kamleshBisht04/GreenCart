import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const TopVegetables = () => {
  const { products } = useAppContext();

  if (!products || products.length === 0) return null;

  const vegetables = products
    .filter(
      (item) =>
        item.category === "Fruits" &&
        item.inStock,
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 30);

  return (
    <div className="mt-16 px-3">
      <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
        🥦 Top Vegetables
      </h2>

      <p className="text-sm text-gray-500">
        Fresh & healthy vegetables for you
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
        {vegetables.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default TopVegetables;
