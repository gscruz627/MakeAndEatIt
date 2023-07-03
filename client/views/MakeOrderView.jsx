import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../src/App.css";
import data from "../public/data.json";
const LOCAL_URL = import.meta.env.VITE_LOCAL_URL;

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

  const handleDeleteTopping = (index) => {
    setFinalStack([...finalStack.slice(0,index+1), ...finalStack.slice(index+2, finalStack.length)])
    index = toppings.length - index - 1;
    console.log(index);
    setToppings([...toppings.filter((topping, Lindex) => Lindex !== index)])
  }
  const toppingsDisplayReverse = toppings.slice().reverse();
  console.log(toppings);
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
                setFinalStack([
                  `${LOCAL_URL}/${data.images
                    .filter((item) => item.name === bread)
                    .map((item) => item.src[0])}`,
                  ...finalStack.slice(1, finalStack.length - 1),
                  `${LOCAL_URL}/${data.images
                    .filter((item) => item.name === bread)
                    .map((item) => item.src[1])}`,
                ]);
              }}
              className="maker-inner-button"
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
                        `${LOCAL_URL}/${data.images.filter( (item) => item.name === main).map((item)=>item.src)}`,
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
            maxLength="50"
            placeholder="Name this Order: "
          />
          <div className="sandwich-card">
            {finalStack.map((item) => (
              <img src={item} width="100px"/>
            ))}
          </div>
        </div>
        <div className="maker-item">
          <h2>Description</h2>
          <p>Your Order Includes: </p>
          <p>Type Of Bun: <b>{bunType}</b></p>
          <p>Main Piece: <b>{mainType}</b></p>
          <p>
            All toppings:
          </p>
          <ul>
            {toppingsDisplayReverse.map((toppings, index) => (
              <li>- {toppings} <small onClick={ () => handleDeleteTopping(index)}>&times;</small></li>
            ))}
          </ul>
          <button onClick={() => handleMakeOrder()}>
            Order {sandwichName}
          </button>
        </div>
      </section>
    </>
  );
};

export default MakeOrderView;
