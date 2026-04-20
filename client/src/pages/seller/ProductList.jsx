import React from "react";
import { useAppContext } from "../../context/AppContext";

const ProductList = () => {
  const { products, currency } = useAppContext();
  return (
    <div className="flex flex-1 flex-col justify-between ">
      <div className="w-full p-4 md:p-10">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-md border border-gray-500/20 bg-white">
          <table className="w-full table-fixed overflow-hidden md:table-auto">
            <thead className="text-left text-sm text-gray-900">
              <tr>
                <th className="truncate px-4 py-3 font-semibold">Product</th>
                <th className="truncate px-4 py-3 font-semibold">Category</th>
                <th className="hidden truncate px-4 py-3 font-semibold md:block">
                  Selling Price
                </th>
                <th className="truncate px-4 py-3 font-semibold">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="flex items-center space-x-3 truncate py-3 pl-2 md:px-4 md:pl-4">
                    <div className="overflow-hidden rounded border border-gray-300">
                      <img
                        src={product?.image[0]}
                        lt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="w-full truncate max-sm:hidden">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {currency}
                    {product.offerPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex cursor-pointer items-center gap-3 text-gray-900">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked={product.inStock}
                      />
                      <div className="peer peer-checked:bg-primary-dull h-7 w-12 rounded-full bg-slate-300 transition-colors duration-200"></div>
                      <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
