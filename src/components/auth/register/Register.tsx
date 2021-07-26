import React, { useState, SyntheticEvent, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "./register.css";

interface IErrorMessage {
  errorMessage: string;
}

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerify, setPasswordVerify] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const register = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Vor fetch", errorMessage);
    try {
      const registerData = {
        email: email,
        password: password,
        passwordVerify: passwordVerify,
      };
      await fetch("http://localhost:5000/auth/", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(registerData),
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
  // validate form in frontend
  return (
    <div className="register-container">
      <div className="header">
        <h2>Register a new Account</h2>
      </div>
      <form className="form" onSubmit={register}>
        <div className="form-control">
          <label>Email*</label>
          <input
            type="email"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
          />
        </div>
        <div className="form-control">
          <label>Password*</label>
          <input
            type="password"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="input"
            id="password"
          />
        </div>
        <div className="form-control">
          <label>Verify Password*</label>
          <input
            type="password"
            placeholder="Verify your Password"
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={passwordVerify}
            className="input"
            id="verifyPassword"
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
