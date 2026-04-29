import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();

  // EDIT STATE
  const [editId, setEditId] = useState(null);
  const [priceData, setPriceData] = useState({
    price: '',
    offerPrice: '',
  });

  // STOCK TOGGLE
  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.patch(`/api/product/stock/${id}`, {
        inStock,
      });

      if (data.success) {
        toast.success(data.message);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // PRICE UPDATE
  const updatePrice = async (id, price, offerPrice) => {
    try {
      const { data } = await axios.patch(`/api/product/price/${id}`, {
        price,
        offerPrice,
      });

      if (data.success) {
        toast.success(data.message);
        fetchProducts();
        setEditId(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="w-full p-4 md:p-10">
        <h2 className="text-lg font-medium">All Products</h2>
        <div className="bg-primary mb-4 h-0.5 w-25 rounded-full"></div>

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
              {products?.map((product) => (
                <tr
                  key={product._id}
                  className="group border-t border-gray-500/20"
                >
                  {/* PRODUCT */}
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={product?.images?.[0] || '/placeholder.png'}
                      alt=""
                      className="w-16 rounded border"
                    />
                    <span className="hidden sm:block">{product.name}</span>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-4 py-3">{product.category}</td>

                  {/* PRICE */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* VIEW MODE */}
                      {editId !== product._id ? (
                        <>
                          <span>
                            {currency}
                            {product.offerPrice}
                          </span>

                          <button
                            onClick={() => {
                              setEditId(product._id);
                              setPriceData({
                                price: product.price,
                                offerPrice: product.offerPrice,
                              });
                            }}
                            className="text-primary opacity-0 transition group-hover:opacity-100 hover:scale-110"
                          >
                            ✏️
                          </button>
                        </>
                      ) : (
                        /* EDIT MODE */
                        <div className="flex flex-col gap-3 rounded-md border bg-gray-50 p-3 shadow-sm">
                          {/* PRICE ROW */}
                          <div className="flex items-center justify-between gap-3">
                            <label className="w-20 text-[10px] font-medium text-gray-500">
                              Price
                            </label>

                            <input
                              type="number"
                              placeholder="Price"
                              value={priceData.price}
                              onChange={(e) =>
                                setPriceData({
                                  ...priceData,
                                  price: e.target.value,
                                })
                              }
                              className="w-28 rounded border px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-blue-300"
                            />
                          </div>

                          {/* OFFER PRICE ROW */}
                          <div className="flex items-center justify-between gap-3">
                            <label className="w-20 text-[10px] font-medium text-gray-500">
                              Offer
                            </label>

                            <input
                              type="number"
                              placeholder="Offer Price"
                              value={priceData.offerPrice}
                              onChange={(e) =>
                                setPriceData({
                                  ...priceData,
                                  offerPrice: e.target.value,
                                })
                              }
                              className="w-28 rounded border px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-blue-300"
                            />
                          </div>

                          {/* ACTIONS */}
                          <div className="flex gap-3 pt-1 text-xs">
                            {/* SAVE */}
                            <button
                              onClick={() => {
                                if (!priceData.price || !priceData.offerPrice) {
                                  return toast.error('All fields are required');
                                }

                                if (
                                  Number(priceData.offerPrice) >
                                  Number(priceData.price)
                                ) {
                                  return toast.error(
                                    'Offer price cannot be greater than price',
                                  );
                                }

                                updatePrice(
                                  product._id,
                                  priceData.price,
                                  priceData.offerPrice,
                                );
                              }}
                              className="font-medium text-green-600 hover:underline"
                            >
                              ✔ Save
                            </button>

                            {/* CANCEL */}
                            <button
                              onClick={() => setEditId(null)}
                              className="font-medium text-red-500 hover:underline"
                            >
                              ✖ Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* STOCK */}
                  <td className="px-4 py-3">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={!!product.inStock}
                        onChange={(e) =>
                          toggleStock(product._id, e.target.checked)
                        }
                      />

                      {/* KEEP SAME COLOR (NO CHANGE) */}
                      <div className="peer-checked:bg-primary-dull h-7 w-12 rounded-full bg-slate-300 transition"></div>

                      <span className="absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products?.length === 0 && (
            <p className="py-4 text-center text-gray-400">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
