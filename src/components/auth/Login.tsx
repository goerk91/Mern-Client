import React, { useState, SyntheticEvent } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const loginData = {
        email: email,
        password: password,
      };
      fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login to your Account</h1>
      <form onSubmit={login}>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
