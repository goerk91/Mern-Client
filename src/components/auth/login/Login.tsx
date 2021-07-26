import React, { useState, SyntheticEvent, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  interface IErrorMessage {
    errorMessage: string;
  }

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const loginData = {
        email: email,
        password: password,
      };
      await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      }).then((res) => {
        if (!res.ok) {
          res
            .json()
            .then((err: IErrorMessage) => setErrorMessage(err.errorMessage));
        } else {
          getLoggedIn();
          history.push("/");
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <h2>Login to your Account</h2>
      </div>
      <form className="form" onSubmit={login}>
        <div className="form-control">
          <label>Email*</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <label>Password*</label>
        <div className="form-control">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errorMessage && (
            <small>
              <FontAwesomeIcon
                className="icon error"
                icon={faExclamationCircle}
                size="lg"
              />
              {errorMessage}
            </small>
          )}
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
