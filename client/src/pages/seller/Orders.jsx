/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { assets, dummyOrders } from "../../assets/assets.js";

function Orders() {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar h-[95vh] flex-1 overflow-y-scroll">
      <div className="space-y-4 p-4 md:p-10">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="flex max-w-4xl flex-col justify-between gap-5 rounded-md border border-gray-300 p-5 md:flex-row md:items-center"
          >
            <div className="flex max-w-80 gap-5">
              <img
                className="h-12 w-12 object-cover"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span className="text-primary">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm text-black/60 md:text-base">
              <p className="text-black/80">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city}{" "}
              </p>
              <p>
                {order.address.state}, {order.address.zipcode},{" "}
                {order.address.country}
              </p>
              <p></p>
              <p>{order.address.phone}</p>
            </div>
            <p className="my-auto text-lg font-medium">
              {currency}
              {order.amount}
            </p>
            <div className="flex flex-col text-sm text-black/60 md:text-base">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
