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
        <h1 style={{marginTop:"2rem"}}>Create your own fictional order</h1>
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
          This web app was created using:<br/>
          <ul style={{marginTop: "1rem"}}>
            <li>- Node JS</li>
            <li>- Express JS</li>
            <li>- MongoDB</li>
            <li>- JSONWebToken</li>
            <li>- Other packages</li>
          </ul>
          <p style={{marginTop: "1rem"}}>And, </p>
          <ul style={{marginTop: "1rem"}}>
            <li>- Vite</li>
            <li>- React JS</li>
            <li>- Fetch API</li>
          </ul> 
        </p>
        <h3>Contact</h3>
        <p>Contact at <a href="https://github.com/gscruz627">GitHub</a>.</p>
      </div>
    </>
  );
};

export default HomeView;
