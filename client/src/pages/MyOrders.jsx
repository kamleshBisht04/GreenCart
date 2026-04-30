/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user');

      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        await fetchMyOrders();
      }
    };
    loadOrders();
  }, [user]);

  return (
    <div className="mt-24 px-4 pb-10">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-left text-3xl font-semibold text-gray-800">
          My Orders
        </h1>
        <p className="text-left text-sm text-gray-500">
          Track your order history and delivery details
        </p>
      </div>

      {/* ORDERS */}
      {myOrders.map((order, index) => (
        <div
          key={index}
          className="mb-8 max-w-4xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          {/* TOP INFO */}
          <div className="flex flex-col gap-3 border-b pb-4 text-sm md:flex-row md:justify-between">
            <div>
              <p className="text-gray-400">Order ID</p>
              <p className="font-medium text-gray-700">{order?._id}</p>
            </div>

            <div>
              <p className="text-gray-400">Payment</p>
              <p className="font-medium text-gray-700">{order?.paymentType}</p>
            </div>

            <div>
              <p className="text-gray-400">Total Amount</p>
              <p className="text-primary text-lg font-semibold">
                {currency}
                {order?.amount}
              </p>
            </div>
          </div>

          {/* ADDRESS SECTION */}
          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Delivery Address
            </p>

            <p className="text-sm text-gray-700">
              {order?.address?.firstName} {order?.address?.lastName}
            </p>

            <p className="text-xs text-gray-500">
              {order?.address?.street}, {order?.address?.city}
            </p>

            <p className="text-xs text-gray-500">
              {order?.address?.state}, {order?.address?.country} -{' '}
              {order?.address?.zipcode}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              📞 {order?.address?.phone}
            </p>
          </div>

          {/* ITEMS */}
          <div className="mt-5 space-y-4">
            {order?.items?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition hover:bg-gray-100"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={item?.product?.images?.[0]}
                    alt=""
                    className="h-14 w-14 rounded-lg border object-cover"
                  />

                  <div className="max-w-[200px]">
                    <h2 className="truncate text-base font-medium text-gray-800">
                      {item?.product?.name}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {item?.product?.category}
                    </p>
                    <p className="text-xs text-gray-400">
                      Qty: {item?.quantity || 1}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p className="text-base font-semibold text-gray-800">
                    {currency}
                    {(item?.product?.offerPrice || 0) * (item?.quantity || 1)}
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
                    {order?.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* DATE */}
          <div className="mt-5 border-t pt-3 text-xs text-gray-400">
            Ordered on: {new Date(order?.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
