import { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";

const Cart = () => {
  const {
    products,
    navigate,
    currency,
    cartItems,
    removeFromCart,
    getTotalItems,
    updateCartItem,
    getTotalAmount,
  } = useAppContext();

  const [addresses, setAddresses] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    dummyAddress?.[0] || null,
  );
  const [paymentOption, setPaymentOption] = useState("COD");

  const subtotal = useMemo(
    () => getTotalAmount(products),
    [getTotalAmount, products],
  );
  const tax = Math.round(subtotal * 0.02);
  const total = subtotal + tax;

  const cartArray = useMemo(() => {
    if (products.length === 0) return [];

    const productMap = Object.fromEntries(products.map((p) => [p._id, p]));

    return Object.keys(cartItems)
      .map((key) => ({
        ...productMap[key],
        quantity: cartItems[key],
      }))
      .filter(Boolean);
  }, [products, cartItems]);

  return cartArray.length > 0 ? (
    <div className="mt-12 flex flex-col md:flex-row">
      {/* LEFT */}
      <div className="max-w-4xl flex-1">
        <h1 className="mb-6 text-3xl font-medium">
          Shopping Cart{" "}
          <span className="text-primary-dull text-sm">
            {getTotalItems()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] pb-3 text-base font-medium text-gray-500">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center pt-3 text-sm font-medium text-gray-500 md:text-base"
          >
            <div className="flex items-center gap-3 md:gap-6">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`,
                  );
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded border border-gray-300"
              >
                <img
                  className="h-full max-w-full object-cover"
                  src={product?.image?.[0]}
                  alt={product.name}
                />
              </div>

              <div>
                <p className="hidden font-semibold md:block">{product.name}</p>

                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>

                  <div className="flex items-center">
                    <p>Qty:</p>

                    <select
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                      className="outline-none"
                    >
                      {Array(Math.max(cartItems[product._id], 9))
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {(product?.offerPrice || 0) * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="mx-auto cursor-pointer"
            >
              <img
                src={assets.remove_icon}
                alt="remove icon"
                className="inline-block h-6 w-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group text-primary-dull mt-8 flex cursor-pointer items-center gap-2 font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            className="transition group-hover:-translate-x-1"
            alt="arrow icon"
          />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT */}
      <div className="mt-10 w-full max-w-sm md:mt-0">
        <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">
                {currency}
                {subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax (2%)</span>
              <span className="font-medium">
                {currency}
                {tax}
              </span>
            </div>

            <div className="flex justify-between border-t pt-3 text-base font-semibold text-gray-900">
              <span>Total</span>
              <span>
                {currency}
                {total}
              </span>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="mt-6">
            <p className="text-xs tracking-wider text-gray-400 uppercase">
              Delivery Address
            </p>

            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                  : "No address found"}
              </p>

              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-primary text-sm hover:underline"
              >
                Change
              </button>
            </div>

            {showAddress && (
              <div className="relative z-50 mt-3 overflow-hidden rounded-xl border text-sm">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    {address.street},{address.city},{address.state},
                    {address.country}
                  </p>
                ))}

                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary hover:bg-primary/10 cursor-pointer p-2"
                >
                  + Add new address
                </p>
              </div>
            )}
          </div>

          {/* PAYMENT */}
          <div className="mt-5">
            <p className="text-xs tracking-wider text-gray-400 uppercase">
              Payment Method
            </p>

            <select
              onChange={(e) => setPaymentOption(e.target.value)}
              className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="ONLINE">Online Payment</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/my-orders")}
            disabled={!selectedAddress}
            className="bg-primary hover:bg-primary-dull mt-6 h-12 w-full rounded-xl font-medium text-white shadow-sm transition disabled:opacity-50"
          >
            {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
          </button>

          <p className="mt-3 text-center text-xs text-gray-400">
            Secure checkout • Fast delivery
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center text-center">
      <img
        src={assets.emptyCart}
        alt="emptyCart"
        className="w-[250px] object-contain"
      />

      <h2 className="mt-4 text-2xl font-semibold">Your cart is empty </h2>

      <button
        onClick={() => navigate("/products")}
        className="bg-primary hover:bg-primary-dull mt-5 rounded-lg px-6 py-2 text-white transition"
      >
        Shop Now
      </button>
    </div>
  );
};

export default Cart;
