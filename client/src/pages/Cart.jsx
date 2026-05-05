/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';
import { loadRazorpay } from '../components/loadRazorpay';

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
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState('COD');

  // subtotal fix (ensure correct dependency usage)
  const subtotal = useMemo(
    () => getTotalAmount(products),
    [products, getTotalAmount],
  );

  const tax = Math.round(subtotal * 0.02);
  const total = subtotal + tax;

  // cart mapping fix
  const cartArray = useMemo(() => {
    if (!products.length) return [];

    const productMap = Object.fromEntries(products.map((p) => [p._id, p]));

    return Object.keys(cartItems)
      .map((key) => ({
        ...productMap[key],
        quantity: cartItems[key],
      }))
      .filter(Boolean);
  }, [products, cartItems]);

  //fetch addresses
  const getUserAddress = async () => {
    try {
      const { data } = await axios.get('/api/address/get');

      if (data.success) {
        setAddresses(data.addresses);

        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        } else {
          setSelectedAddress(null);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

 const placeOrder = async () => {
   try {
     if (!selectedAddress) {
       return toast.error('Please select an address');
     }

     if (cartArray.length === 0) {
       return toast.error('Cart is empty');
     }

     const orderData = {
       items: cartArray.map((item) => ({
         productId: item._id,
         quantity: item.quantity,
       })),
       address: selectedAddress,
     };

     //  COD FLOW
     if (paymentOption === 'COD') {
       
       const { data } = await axios.post('/api/order/cod', orderData);

       if (data.success) {
         toast.success(data.message);
         navigate('/my-orders');
         setCartItems({});
       } else {
         toast.error(data.message);
       }
     }

     //  ONLINE PAYMENT FLOW
     else {
       // STEP 1: create order from backend
       const { data } = await axios.post('/api/payment/create-order', {
         items: orderData.items,
       });

       if (!data.success) {
         return toast.error('Payment order failed');
       }

       // STEP 2: CHECK KEY
       const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

       if (!key) {
         return toast.error('Razorpay key missing in frontend .env');
       }

       await loadRazorpay();
       // STEP 3: Razorpay options
       const options = {
         key: key,
         amount: data.amount * 100,
         currency: 'INR',
         name: 'My Store',
         description: 'Order Payment',

         order_id: data.order.id, // must be backend razorpay order id
         handler: async function (response) {
           try {
             const verifyRes = await axios.post('/api/payment/verify', {
               razorpay_order_id: response.razorpay_order_id,
               razorpay_payment_id: response.razorpay_payment_id,
               razorpay_signature: response.razorpay_signature,
               items: orderData.items,
               address: selectedAddress,
             });

             if (verifyRes.data.success) {
               toast.success('Payment successful & Order placed');
               navigate('/my-orders');
               setCartItems({});
             } else {
               toast.error('Payment verification failed');
             }
           } catch (err) {
             toast.error(err.message);
           }
         },

         theme: {
           color: '#3399cc',
         },
       };

       // STEP 4: open Razorpay
       const rzp = new window.Razorpay(options);
       rzp.open();
     }
   } catch (error) {
     toast.error(error.message);
   }
 };

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

 

  return cartArray.length > 0 ? (
    <div className="mt-24 flex flex-col md:flex-row">
      {/* LEFT */}
      <div className="max-w-4xl flex-1">
        <h1 className="mb-6 text-3xl font-medium">
          Shopping Cart{' '}
          <span className="text-primary-dull text-sm">
            {getTotalItems()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] pb-3 text-base font-medium text-gray-500">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center pt-3 text-sm md:text-base"
          >
            <div className="flex items-center gap-4">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`,
                  );
                }}
                className="h-24 w-24 cursor-pointer overflow-hidden rounded border"
              >
                <img
                  src={product?.images?.[0]}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold">{product.name}</p>

                <div className="text-gray-500">
                  <p>Weight: {product.weight || 'N/A'}</p>

                  <div className="flex items-center gap-1">
                    <p>Qty:</p>
                    <select
                      value={cartItems[product._id]}
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                    >
                      {Array.from({ length: 10 }).map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {(product.offerPrice || 0) * product.quantity}
            </p>

            <button onClick={() => removeFromCart(product._id)}>
              <img src={assets.remove_icon} className="h-6 w-6" />
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate('/products')}
          className="text-primary mt-8"
        >
          Continue Shopping
        </button>
      </div>

      {/* RIGHT */}
      <div className="mt-10 w-full max-w-sm md:mt-0">
        <div className="sticky top-20 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {currency}
                {subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax (2%)</span>
              <span>
                {currency}
                {tax}
              </span>
            </div>

            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Total</span>
              <span>
                {currency}
                {total}
              </span>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="mt-6">
            <p className="text-xs text-gray-400 uppercase">Delivery Address</p>

            <div className="mt-2 flex justify-between">
              <p className="text-sm text-gray-600">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                  : 'No address found'}
              </p>
              <button
                onClick={() =>
                  addresses.length === 0
                    ? navigate('/add-address')
                    : setShowAddress(!showAddress)
                }
                className="text-primary text-sm"
              >
                {addresses.length === 0 ? '+ Add Address' : 'Change'}
              </button>
            </div>

            {showAddress && (
              <div className="mt-2 rounded border text-sm">
                {addresses.map((address) => (
                  <p
                    key={address._id}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    {address.street}, {address.city}, {address.state},{' '}
                    {address.country}
                  </p>
                ))}

                <p
                  onClick={() => navigate('/add-address')}
                  className="text-primary p-2"
                >
                  + Add new address
                </p>
              </div>
            )}
          </div>

          {/* PAYMENT */}
          <div className="mt-5">
            <p className="text-xs text-gray-400 uppercase">Payment Method</p>

            <select
              onChange={(e) => setPaymentOption(e.target.value)}
              className="mt-2 w-full rounded border px-3 py-2"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="ONLINE">Online Payment</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            disabled={!selectedAddress}
            onClick={placeOrder}
            className="bg-primary mt-6 w-full rounded py-3 text-white disabled:opacity-50"
          >
            {paymentOption === 'COD' ? 'Place Order' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="mt-20 text-center">
      <img src={assets.emptyCart} className="mx-auto w-[250px]" />
      <h2 className="mt-4 text-xl">Your cart is empty</h2>

      <button
        onClick={() => navigate('/products')}
        className="bg-primary mt-5 rounded px-6 py-2 text-white"
      >
        Shop Now
      </button>
    </div>
  );
};

export default Cart;
