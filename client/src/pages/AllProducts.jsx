import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const query = String(searchQuery || "").toLowerCase();

    return query
      ? products.filter((product) => product.name.toLowerCase().includes(query))
      : products;
  }, [searchQuery, products]);

  return (
    <div className="mt-10 px-4 md:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-end justify-between">
          <div className="relative">
            <h1 className="text-xl font-semibold text-gray-800 md:text-2xl">
              All Products
            </h1>
            <div className="bg-primary absolute right-0 mt-1 h-[3px] w-16 rounded-full" />
          </div>

          <span className="text-sm text-gray-500">
            {filteredProducts.length} items
          </span>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="col-span-full mt-20 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-semibold text-gray-700">
            No products found 😕
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Try something like "ice cream", "milk", or "fruits"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredProducts.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
