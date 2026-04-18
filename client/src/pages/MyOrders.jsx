/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { dummyOrders } from "../assets/assets.js";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();
 
  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="mt-8 pb-8">
      <div className="mb-8 flex w-max flex-col items-end">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="bg-primary-dull h-0.5 w-16 rounded-full"></div>
      </div>
      {myOrders.map((order, index) => (
        <div
          key={index}
          className="mb-10 max-w-4xl rounded-lg border border-gray-300 p-4 py-5"
        >
          <p className="flex justify-between text-gray-400 max-md:flex-col md:items-center md:font-medium">
            <span>OrderId: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>
              Total Amount: {currency}
              {order.amount}
            </span>
          </p>
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white text-gray-500/70 ${order.items.length !== index + 1 && "border-b"} flex w-full max-w-4xl flex-col justify-between border-gray-300 p-4 py-5 md:flex-row md:items-center md:gap-16`}
            >
              <div className="mb-4 flex items-center md:mb-0">
                <div className="bg-primary/10 rounded-lg p-4">
                  <img
                    src={item.product.image[0]}
                    alt=""
                    className="h-16 w-16"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-medium text-gray-800">
                    {item.product.name}
                  </h2>
                  <p>Category: {item.product.category}</p>
                </div>
              </div>
              <div className="mb-4 flex flex-col justify-center md:mb-0 md:ml-8">
                <p>Quantity: {item.quantity || "1"}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-primary-dull text-lg font-medium">
                Amount: {currency}
                {item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
