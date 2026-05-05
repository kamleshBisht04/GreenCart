/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const {
    user,
    products,
    navigate,
    currency,
    addToCart,
    removeFromCart,
    getItemQuantity,
    setShowUserLogIn, 
  } = useAppContext();

  const { id } = useParams();
  const product = products.find((item) => item._id === id);

  const qty = getItemQuantity(product?._id);
  const [thumbnail, setThumbnail] = useState(null);

  if (!product) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  const displayImage = thumbnail || product.images?.[0];

  const discount = Math.round(
    ((product.price - product.offerPrice) / product.price) * 100,
  );

  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item._id !== product._id,
    )
    .slice(0, 10);

  // HANDLERS 
  const handleAddToCart = (productId) => {
    if (!user) {
      toast.error('Please login first');
      setShowUserLogIn(true); //  modal open
      return;
    }
    addToCart(productId);
    toast.success('Added to cart');
  };

  const handleBuyNow = (productId) => {
    if (!user) {
      toast.error('Please login first');
      setShowUserLogIn(true); //  modal open
      return;
    }
    addToCart(productId);
    navigate('/cart');
  };

  return (
    <div className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <Breadcrumb product={product} />
      </div>

      {/* MAIN */}
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {/* IMAGE */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex flex-row gap-3 sm:flex-col">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setThumbnail(img)}
                className={`h-16 w-16 cursor-pointer rounded-lg border object-cover ${
                  displayImage === img ? 'border-primary' : 'border-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex-1 rounded-xl border bg-white p-4">
            <img
              src={displayImage}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.round(product.rating)
                      ? assets.star_icon
                      : assets.star_dull_icon
                  }
                  className="w-4"
                />
              ))}
            <span className="text-sm text-gray-500">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <p className="text-sm text-gray-400 line-through">
              {currency}
              {product.price}
            </p>

            <p className="text-2xl font-bold text-green-600">
              {currency}
              {product.offerPrice}
            </p>

            {discount > 0 && (
              <span className="mt-1 inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="font-medium">About Product</p>
            <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-gray-600">
              {product.description?.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          {/* ACTION */}
          <div className="mt-8 flex gap-3">
            <div className="flex-1">
              {qty === 0 ? (
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="flex h-12 w-full items-center justify-center rounded-lg bg-gray-100 font-medium hover:bg-gray-200"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex h-12 w-full items-center justify-between rounded-lg border bg-white px-4">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-xl font-bold hover:text-red-500"
                  >
                    −
                  </button>

                  <span className="text-base font-semibold">{qty}</span>

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="text-xl font-bold hover:text-green-600"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleBuyNow(product._id)}
              className="bg-primary hover:bg-primary-dull h-12 flex-1 rounded-lg font-medium text-white"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <div className="bg-primary mx-auto mt-2 h-1 w-16 rounded"></div>
        </div>

        <div className="marquee-mask mt-8 overflow-hidden">
          <div className="animate-marquee flex w-max gap-4">
            {[...relatedProducts, ...relatedProducts]
              .filter((item) => item.inStock)
              .map((item, i) => (
                <div key={i} className="min-w-[180px]">
                  <ProductCard product={item} />
                </div>
              ))}
          </div>
        </div>

        <button
          onClick={() => {
            navigate('/products');
            scrollTo(0, 0);
          }}
          className="text-primary hover:bg-primary/10 mx-auto mt-10 block rounded-lg border px-8 py-2 text-sm"
        >
          See more
        </button>
      </div>

      {/* MOBILE BAR */}
      <div className="fixed right-0 bottom-0 left-0 flex gap-2 border-t bg-white p-3 md:hidden">
        <button
          onClick={() => handleAddToCart(product._id)}
          className="flex-1 rounded bg-gray-100 py-2"
        >
          Add
        </button>

        <button
          onClick={() => handleBuyNow(product._id)}
          className="bg-primary flex-1 rounded py-2 text-white"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
