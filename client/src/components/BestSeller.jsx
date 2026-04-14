import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  const bestRated = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 16);

  return (
    <div className="mt-16">
      <p className="text-2xl font-medium md:text-3xl">Best Sellers</p>

      <div className="mt-4 flex flex-wrap gap-4">
        {bestRated.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
