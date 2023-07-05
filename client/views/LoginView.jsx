import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../store";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const LoginView = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handleError = () => {
    setNotFound(true);
    setTimeout(() => {
      setNotFound(false);
    }, 3000);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username && password) {
      let userRequest;
      try {
        userRequest = await fetch(`${SERVER_URL}/API/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        if (userRequest.status === 401) {
          handleError();
        }
      } catch (err) {
        handleError();
      }
      if (userRequest) {
        const user = await userRequest.json();
        dispatch(setLogin({ user: user.user, token: user.token }));
      } else {
        console.log("notn");
      }
    } else {
      alert("There is some authentication error, try filling your data again");
      setUsername("");
      setPassword("");
    }
  };
  return (
    <>
      <Navbar />
      <form onSubmit={(event) => handleSubmit(event)} className="form">
        <div>
          <h1>Login</h1>
        </div>
        <section id="alert" style={{ display: notFound ? "block" : "none" }}>
          Username or password Incorrect try again
        </section>
        <label htmlFor="username">Enter an Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Enter a password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <button type="submit" disabled={!(username && password)}>
          Submit
        </button>

        <small>Do not have an account yet? </small>
        <Link to="/register" style={{ color: "orange" }}>
          Register Here
        </Link>
      </form>
    </>
  );
};

export default LoginView;
