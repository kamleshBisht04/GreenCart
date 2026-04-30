import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { assets } from '../../assets/assets.js';
import toast from 'react-hot-toast';

function Orders() {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) setOrders(data.orders);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrders();
    };
    loadOrders();
  }, []);

  return (
    <div className="h-[95vh] flex-1 overflow-y-scroll bg-white">
      {/* HEADER */}
      <div className="px-6 py-6 md:px-10">
        <h2 className="text-2xl font-medium text-gray-800">Orders</h2>
        <p className="text-sm text-gray-500">Manage customer orders</p>
      </div>

      {/* ORDERS */}
      <div className="space-y-5 px-6 pb-10 md:px-10">
        {orders.map((order, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            {/* TOP SECTION */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* PRODUCTS */}
              <div className="flex gap-4">
                <img src={assets.box_icon} className="h-10 w-10" />

                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-sm text-gray-700">
                      {item.product.name}
                      <span className="ml-2 text-gray-500">
                        x {item.quantity}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* ADDRESS */}
              <div className="text-xs text-gray-600">
                <p className="text-sm font-medium text-gray-800">
                  Delivery Address
                </p>
                <p>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city}
                </p>
                <p>
                  {order.address.state}, {order.address.country} -{' '}
                  {order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>

              {/* AMOUNT + STATUS */}
              <div className="md:text-right">
                <p className="text-lg font-medium text-gray-800">
                  {currency}
                  {order.amount}
                </p>

                <p
                  className={`mt-1 inline-block text-xs font-medium ${
                    order.isPaid ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {order.isPaid ? 'Paid' : 'Pending'}
                </p>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="mt-4 flex flex-wrap justify-between border-t pt-3 text-xs text-gray-500">
              <p>
                Method:{' '}
                <span className="text-gray-700">{order.paymentType}</span>
              </p>

              <p>
                Date:{' '}
                <span className="text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
