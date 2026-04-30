import { useAppContext } from "../context/AppContext";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, getItemQuantity, currency, navigate } =
    useAppContext();
  // const productId = product.category.toLowerCase()

  if (!product) return null;

  const qty = getItemQuantity(product._id);

  const discount =
    product.price > 0
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="group relative w-40  h-[220px] cursor-pointer rounded-xl border border-gray-100 bg-white p-2 px-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        {/* 🔴 OFF BADGE */}
        {discount > 0 && (
          <span
            className="absolute top-1 left-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm z-50"
            style={{ backgroundColor: "#E1F5EC", color: "#1B3C53" }}
          >
            {discount}% OFF
          </span>
        )}

        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-110 "
        />

        {/* ADD BUTTON */}
        {qty === 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product._id);
            }}
            className="absolute right-1 bottom-1 rounded-md bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-md transition hover:bg-green-700 active:scale-95"
          >
            <span className="flex items-center justify-center gap-1">
              <FaCartPlus className="inline-block" />
              Add
            </span>
          </button>
        ) : (
          <div className="absolute right-1 bottom-1 flex items-center gap-2 rounded-md bg-green-600 px-2 py-1 text-white shadow-md">
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(product._id);
              }}
            >
              −
            </button>

            <span className="w-4 text-center text-xs font-semibold">{qty}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product._id);
              }}
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* CATEGORY */}
      <p className="mt-1 text-[10px] font-medium text-gray-400 uppercase">
        {product.category}
      </p>

      {/* NAME */}
      <p className="line-clamp-2 text-xs font-semibold text-gray-800">
        {product.name}
      </p>

      {/* PRICE + RATING */}
      <div className="mt-1 flex items-end justify-between">
        {/* PRICE */}
        <div>
          <p className="text-sm font-bold text-gray-900">
            {currency} {product.offerPrice}
          </p>
          <p className="text-[10px] text-gray-400 line-through">
            {currency} {product.price}
          </p>
        </div>

        {/* RATING */}
        <div className="text-right">
          <p className="text-[10px] font-medium text-yellow-500">
            ★ {product.rating}
          </p>
          <p className="text-[9px] text-gray-400">{product.reviews} reviews</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
