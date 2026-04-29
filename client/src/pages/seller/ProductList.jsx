import React from "react";
import { useAppContext } from "../../context/AppContext";

const ProductList = () => {
  const { products, currency} = useAppContext();

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="w-full p-4 md:p-10">
        <h2 className="text-lg font-medium">All Products</h2>
        <div className="bg-primary h-0.5 w-25 rounded-full mb-4 "></div>

        <div className="flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-md border border-gray-500/20 bg-white">
          <table className="w-full table-fixed md:table-auto">
            <thead className="text-left text-sm text-gray-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Selling Price</th>
                <th className="px-4 py-3 font-semibold">In Stock</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="group border-t border-gray-500/20"
                >
                  {/* Product */}
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="overflow-hidden rounded border">
                      <img
                        src={product?.images[0]}
                        alt="product"
                        className="w-16"
                      />
                    </div>
                    <span className="hidden sm:block">{product.name}</span>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">{product.category}</td>

                  {/* 💰 PRICE UI ONLY */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>
                        {currency}
                        {product.offerPrice}
                      </span>

                      {/* ✏️ Pencil hover only */}
                      <button className="text-sm text-blue-500 opacity-0 transition duration-200 group-hover:opacity-100 hover:scale-110">
                        ✏️
                      </button>
                    </div>
                  </td>

                  {/* Stock Toggle UI ONLY */}
                  <td className="px-4 py-3">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked={product.inStock}
                      />

                      <div className="peer-checked:bg-primary-dull h-7 w-12 rounded-full bg-slate-300 transition"></div>

                      <span className="absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <p className="py-4 text-center text-gray-400">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
