import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../store";
import Navbar from "../components/Navbar";

const LoginView = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(username && password){
      const userRequest = await fetch(`${SERVER_URL}/API/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });
      const user = await userRequest.json();
      console.log(user);
      dispatch(setLogin({user: user.user, token: user.token}))
    } else {
      alert("There is some authentication error, try filling your data again")
      setUsername("");
      setPassword("");
    }
  }
  return (
    <>
      <Navbar />
      <form onSubmit={(event) => handleSubmit(event)} className="form">
        <div>
          <h1>Login</h1>
        </div>
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
      </form>
    </>
  );
};

export default LoginView;
