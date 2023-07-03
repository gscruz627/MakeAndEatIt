import { useState, useEffect } from "react";
import "../src/App.css";
import Navbar from "../components/Navbar.jsx";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/index.js";

const RegisterView = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const [isUsernameOk, setIsUsernameOk] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [isPasswordOk, setIsPasswordOk] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
  useEffect(() => {
    if (username.length >= 3) {
      setIsUsernameOk(true);
    } else {
      setIsUsernameOk(false);
      setPassword("");
    }
  }, [username]);
  useEffect(() => {
    if (password.length > 6 && password !== username) {
      setIsPasswordOk(true);
    } else {
      setIsPasswordOk(false);
      setPasswordTwo("");
    }
    if (password === passwordTwo) {
      setDoPasswordsMatch(true);
    } else {
      setDoPasswordsMatch(false);
    }
  }, [password, passwordTwo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isUsernameOk && isPasswordOk && doPasswordsMatch){
      const userRequest = await fetch(`${SERVER_URL}/API/auth/register`, {
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
      dispatch(setLogin({user: user.user, token: user.token}))
    } else {
      alert("There is some authentication error, try filling your data again")
      setUsername("");
      setPassword("");
      setPasswordTwo("");
      setIsPasswordOk(false);
      setIsPasswordOk(false);
      setDoPasswordsMatch(false);
    }
  }
  return (
    <>
      <Navbar />
      <form onSubmit={(event) => handleSubmit(event)} className="form">
        <div>
          <h1>Register</h1>
        </div>
        <label htmlFor="username">Enter an Username: </label>
        <small>Username should have 3+ characters</small>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        {isUsernameOk && (
          <>
            <label htmlFor="password">Enter a password: </label>
            <small>Password should have 6+ characters</small>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            {isPasswordOk && (
              <>
              <label htmlFor="passwordTwo">Confirm Your Password: </label>
              <input
                type="password"
                id="password"
                value={passwordTwo}
                onChange={(event) => setPasswordTwo(event.target.value)}
              ></input>
              </>
            )}
            <button type="submit" disabled={!(isPasswordOk && doPasswordsMatch)}>
              Submit
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default RegisterView;
