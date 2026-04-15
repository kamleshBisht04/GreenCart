import { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets.js";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const product = products.find((item) => item._id === id);
  const [thumbnail, setThumbnail] = useState(null);

  const relatedProducts = product
    ? products
        .filter(
          (item) =>
            item.category === product.category && item._id !== product._id,
        )
        .slice(0, 7)
    : [];

  if (!product) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  const displayImage = thumbnail || product.image?.[0];

  const discount = Math.round(
    ((product.price - product.offerPrice) / product.price) * 100,
  );

  return (
    <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* 🔗 Breadcrumb */}
      <p className="flex flex-wrap gap-1 text-sm text-gray-500">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        /
        <Link to="/products" className="hover:text-primary">
          Products
        </Link>
        /
        <Link
          to={`/products/${product.category.toLowerCase()}`}
          className="hover:text-primary"
        >
          {product.category}
        </Link>
        /<span className="text-primary-dull">{product.name}</span>
      </p>

      {/*  Main Section */}
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        {/* 🖼 Images */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex flex-row gap-3 sm:flex-col">
            {product.image?.map((image, index) => (
              <img
                key={index}
                onClick={() => setThumbnail(image)}
                src={image}
                className={`h-16 w-16 cursor-pointer rounded-lg border object-cover transition ${displayImage === image ? "border-primary" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="group flex-1 overflow-hidden rounded-xl border bg-white p-4">
            <img
              src={displayImage}
              className="mx-auto h-[250px] w-full object-contain transition duration-300 group-hover:scale-110 sm:h-[300px]"
            />
          </div>
        </div>

        {/* 📄 Details */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
            {product.name}
          </h1>

          {/* ⭐ Rating */}
          <div className="mt-2 flex items-center gap-1">
            {Array(5)
              .fill("")
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

          {/* 💰 Price */}
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

          {/* 📄 Description */}
          <div className="mt-6">
            <p className="font-medium">About Product</p>
            <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-gray-600">
              {product.description?.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          {/* 🛒 Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full rounded-lg bg-gray-100 py-3 font-medium transition hover:bg-gray-200"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="bg-primary hover:bg-primary-dull w-full rounded-lg py-3 font-medium text-white transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold sm:text-2xl">Related Products</p>
          <div className="bg-primary mt-2 h-0.5 w-16 rounded-full"></div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {relatedProducts
            .filter((item) => item.inStock)
            .map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="text-primary hover:bg-primary/10 mx-auto mt-10 block rounded-lg border px-8 py-2 text-sm transition"
        >
          See more
        </button>
      </div>

      {/* 📱 Mobile Sticky Bar */}
      <div className="fixed right-0 bottom-0 left-0 flex gap-2 border-t bg-white p-3 md:hidden">
        <button
          onClick={() => addToCart(product._id)}
          className="flex-1 rounded bg-gray-100 py-2"
        >
          Add
        </button>
        <button
          onClick={() => {
            addToCart(product._id);
            navigate("/cart");
          }}
          className="bg-primary flex-1 rounded py-2 text-white"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
