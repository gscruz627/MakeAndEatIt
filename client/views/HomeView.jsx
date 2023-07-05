import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeView = () => {
  const isAuth = useSelector((state) => state.token);
  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>Create your own fictional order</h1>
        <Link to="/makeorder"><button>BEGIN</button></Link>
        <img src="/cap1.png" />
        <img src="/cap2.png" />
        <h3>Description</h3>
        <p>
          You can create sandwiches mixing the many ingredients of choice, you
          may choose the type of bread used, the main piece, it being, regular
          burgers, chicken patties, etc. You can then choose toppings, and
          visually see the sandwich. You can also see a list of your orders.
        </p>
        <h3>Technical Description</h3>
        <p>
          This web app was created using Express JS and MongoDB in the Backend,
          as well as security and tools packages such as jsonwebtoken, mongoose,
          helmet, etc. In the Front End this app uses React JS, compiled via
          Vite, and using the Fetch API.
        </p>
        <h3>Contact</h3>
        <p>Contact at <a href="https://github.com/gscruz627">GitHub</a>.</p>
      </div>
      <Link to="/makeorder">Build a new Order</Link>
    </>
  );
};

export default HomeView;
