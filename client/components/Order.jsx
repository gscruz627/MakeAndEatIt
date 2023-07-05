import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { setOrders } from "../store";
import { useNavigate } from "react-router-dom";

const Order = (props) => {
  const { data } = props;
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const user = useSelector( (state) => state.user);
  const token = useSelector( (state) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    const ordersRequest = await fetch(`${SERVER_URL}/API/order/${data._id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Holder " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: data._id,
            username: user.username
        })
    });
    const orders = await ordersRequest.json();
    dispatch(setOrders({orders: orders}));
  }
  return (
    <div className="order-item">
      <h2 style={{ fontSize: data.name.length > 12 && "16px" }}>
        {data.name} &nbsp;
        <small
          onClick={() => {handleDelete(); location.reload()}}
          style={{
            padding: "0 4px",
            color: "#FFF",
            fontWeight: "bold",
            backgroundColor: "red",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          &times;
        </small>
      </h2>
      {data.finalStack.map((src, index) => (
        <img key={index}src={src} width="100px" />
      ))}
      <h4>Bun: </h4>
      <p>{data.bun}</p>
      <h4>Main Piece: </h4>
      <p>{data.main}</p>
      <h4>Toppings: </h4>
      <ul>
        {data.toppings.map((topping, index) => (
          <li key={index}>- {topping}</li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
