import React from "react";
import "../src/App.css";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLargeScreen = useMediaQuery("md");
  const isAuth = useSelector((state) => state.token);
  return (
    <nav>
      {isLargeScreen && isAuth && (
        <Link to="/orders">
          <h3>My Orders</h3>
        </Link>
      )}
      {isLargeScreen && !isAuth && (
        <Link to="/register">
          <h3>Register</h3>
        </Link>
      )}
      {isLargeScreen && <h1>Make And Eat It</h1>}
      {isLargeScreen && isAuth && <h3>{user.username}</h3>}
      {isLargeScreen && !isAuth && (
        <Link to="/login">
          <h3>Login</h3>
        </Link>
      )}
      {!isLargeScreen && <h1>Make and Eat It</h1>}
      <div>
      {!isLargeScreen && !isAuth && (
        <Link to="/register">
            <h3>Register</h3>
        </Link>
      )}
      {!isLargeScreen && !isAuth && (
        <Link to="/login">
            <h3>Login</h3>
        </Link>
      )}
      </div>
      <div>
      {!isLargeScreen && isAuth && (
        <h3>{user.username}</h3>
      )}
      {!isLargeScreen && isAuth && (
        <Link to="/orders"><h3>Orders</h3></Link>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
