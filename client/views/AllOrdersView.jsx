import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Order from "../components/Order"
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "../store";

const AllOrdersView = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const loadOrders = async () => {
    const ordersRequest = await fetch(
      `${SERVER_URL}/API/orders/${user.username}`,
      {
        headers: {
          Authorization: "Holder " + token,
        },
      }
    );
    const orders = await ordersRequest.json();
    dispatch(setOrders({orders: orders}));
  };
  useEffect(() => {
    loadOrders();
  }, []);
  return (
    <>
      <Navbar />
      <div className="orders-container">
        {orders && typeof orders === 'object' ?
          orders.map((order, index) => (
            <Order key={index} data={order}/>
          )) : <h1>No Orders</h1>
        }
      </div>
    </>
  );
};

export default AllOrdersView;
