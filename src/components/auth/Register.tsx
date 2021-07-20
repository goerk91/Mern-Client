import React, { useState, SyntheticEvent, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerify, setPasswordVerify] = useState<string>("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const register = async (e: SyntheticEvent) => {
    e.preventDefault();
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
      });
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Register a new Account</h1>
      <form onSubmit={register}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="Verify your Password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordVerify}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
