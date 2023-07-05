import React from "react";
import "../src/App.css";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../store";

const Navbar = () => {
  const isLargeScreen = useMediaQuery("md");
  const isAuth = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      {isLargeScreen && (
        <Link to="/">
          <h1>Make And Eat It</h1>
        </Link>
      )}
      {isLargeScreen && isAuth && (
        <>
          <span>
            <h3 style={{ display: "inline" }}>
              {user.username} &nbsp;
              <i
                className="fa-solid fa-right-from-bracket"
                onClick={() => {
                  dispatch(setLogout());
                }}
                style={{ backgroundColor: "transparent", cursor: "pointer" }}
              ></i>
            </h3>
          </span>
        </>
      )}
      {isLargeScreen && !isAuth && (
        <Link to="/login">
          <h3>Login</h3>
        </Link>
      )}
      {!isLargeScreen && (
        <Link to="/">
          <h1>Make and Eat It</h1>
        </Link>
      )}
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
      <div style={{marginTop: "10px"}}>
        {!isLargeScreen && isAuth && (
          <>
            <h3 style={{ display: "inline" }}>
              {user.username} &nbsp;
              <i
                className="fa-solid fa-right-from-bracket"
                onClick={() => {
                  dispatch(setLogout());
                }}
                style={{ backgroundColor: "transparent", cursor: "pointer" }}
              ></i>
            </h3>
          </>
        )}
        {!isLargeScreen && isAuth && (
          <Link to="/orders">
            <h3>Orders</h3>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
