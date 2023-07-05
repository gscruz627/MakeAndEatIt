import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../src/App.css";
import data from "/src/data.json";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../store";
import { useNavigate } from "react-router-dom";
const LOCAL_URL = import.meta.env.VITE_LOCAL_URL;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
console.log(LOCAL_URL);
const MakeOrderView = () => {
  const [sandwichName, setSandwichName] = useState("");
  const colorsCollection = [
    "DarkRed",
    "Orange",
    "#2e2c28",
    "#f6c458",
    "#1A237E",
    "DarkRed",
    "Orange",
  ];
  const [bunType, setBunType] = useState("");
  const [mainType, setMainType] = useState("");
  const [toppings, setToppings] = useState([]);
  const [finalStack, setFinalStack] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteTopping = (index) => {
    setFinalStack([
      ...finalStack.slice(0, index + 1),
      ...finalStack.slice(index + 2, finalStack.length),
    ]);
    index = toppings.length - index - 1;
    console.log(index);
    setToppings([...toppings.filter((topping, Lindex) => Lindex !== index)]);
  };
  const toppingsDisplayReverse = toppings.slice().reverse();

  const handleMakeOrder = async () => {
    const orderRequest = await fetch(`${SERVER_URL}/API/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Holder " + token,
      },
      body: JSON.stringify({
        name: sandwichName,
        username: user.username,
        bun: bunType,
        main: mainType,
        toppings,
        finalStack,
      }),
    });
    const orders = await orderRequest.json();
    dispatch(setOrders({orders: orders}));
    setShowAlert(true);
    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };
  return (
    <>
      <Navbar />
      <section className="maker-container">
        <div className="maker-item">
          <h2>Add and Edit Items</h2>

          <p>Choose The Type of Bun: </p>
          {data.bread.map((bread, index) => (
            <button
              onClick={() => {
                setBunType(bread);
                setFinalStack([`${data.images
                    .filter((item) => item.name === bread)
                    .map((item) => item.src[0])}`,
                  ...finalStack.slice(1, finalStack.length - 1),
                  `/${data.images
                    .filter((item) => item.name === bread)
                    .map((item) => item.src[1])}`,
                ]);
              }}
              className="maker-inner-button"
              key={index}
              style={{
                backgroundColor:
                  bunType === bread ? "#FFF" : `${colorsCollection[index]}`,
                color: bunType === bread && "#000",
                border: bunType === bread && "1px solid Green",
              }}
            >
              {bread}
            </button>
          ))}
          {bunType && (
            <>
              <p>Choose the Main Piece: </p>
              {data.main.map((main, index) => (
                <button
                  className="maker-inner-button"
                  key={index}
                  onClick={() => {
                    setMainType(main);
                    if (!mainType) {
                      setFinalStack([
                        ...finalStack.slice(0, finalStack.length - 1),
                        `${LOCAL_URL}/${data.images
                          .filter((item) => item.name === main)
                          .map((item) => item.src)}`,
                        ...finalStack.slice(finalStack.length - 1),
                      ]);
                    } else {
                      setFinalStack([
                        ...finalStack.slice(0, finalStack.length - 2),
                        `${LOCAL_URL}/${data.images
                          .filter((item) => item.name === main)
                          .map((item) => item.src)}`,
                        ...finalStack.slice(finalStack.length - 1),
                      ]);
                    }
                  }}
                  style={{
                    backgroundColor:
                      mainType === main ? "#FFF" : `${colorsCollection[index]}`,
                    color: mainType === main && "#000",
                    border: mainType === main && "1px solid Green",
                  }}
                >
                  {main}
                </button>
              ))}

              <p>Choose Your Toppings: </p>
              {data.topppings.map((topping, index) => (
                <button
                  className="maker-inner-button"
                  key={index}
                  onClick={() => {
                    setToppings([...toppings, topping]);
                    setFinalStack([
                      ...finalStack.slice(0, 1),
                      `${LOCAL_URL}/${data.images
                        .filter((item) => item.name === topping)
                        .map((item) => item.src)}`,
                      ...finalStack.slice(1, finalStack.length),
                    ]);
                  }}
                  style={{ backgroundColor: `${colorsCollection[index]}` }}
                >
                  {topping}
                </button>
              ))}
            </>
          )}
        </div>
        <div className="maker-item">
          <input
            type="text"
            className="maker-input"
            value={sandwichName}
            onChange={(event) => setSandwichName(event.target.value)}
            maxLength="18"
            placeholder="Name this Order: "
          />
          <div className="sandwich-card">
            {finalStack.map((item, index) => (
              <img key={index} src={item} width="100px" />
            ))}
          </div>
        </div>
        <div className="maker-item">
          <h2>Description</h2>
          <p>Your Order Includes: </p>
          <p>
            Type Of Bun: <b>{bunType}</b>
          </p>
          <p>
            Main Piece: <b>{mainType}</b>
          </p>
          <p>All toppings:</p>
          <ul>
            {toppingsDisplayReverse.map((toppings, index) => (
              <li key={index}>
                - {toppings} &nbsp;
                <small
                  onClick={() => handleDeleteTopping(index)}
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
              </li>
            ))}
          </ul>
          {bunType && mainType && sandwichName && (
            <button onClick={() => handleMakeOrder()}>
              Order {sandwichName}
            </button>
          )}
          {showAlert && (
            <div
              style={{
                backgroundColor: "#ccff99",
                color: "darkgreen",
                border: "1px solid darkgreen",
                padding: "1rem 2rem",
                width: "100%",
                borderRadius: "5px",
                marginTop: "2rem"
              }}
            >
              Order "{sandwichName}" was added!, redirecting to orders...
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MakeOrderView;
