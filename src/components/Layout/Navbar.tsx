import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogoutBtn from "../auth/LogoutBtn";
import "./navbar.css";

export default function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="nav-container">
      <div className="menu">
        <Link to="/">Home</Link>
      </div>
      {loggedIn === false && (
        <>
          <div className="menu">
            <Link to="/register">Register</Link>
          </div>
          <div className="menu">
            <Link to="/login">Log in</Link>
          </div>
        </>
      )}
      {loggedIn === true && (
        <>
          <div className="menu">
            <Link to="/customer">Customer</Link>
          </div>
          <LogoutBtn />
        </>
      )}
    </div>
  );
}
