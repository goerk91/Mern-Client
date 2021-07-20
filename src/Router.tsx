import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/auth/Login";
import AuthContext from "./context/AuthContext";
import Customers from "./components/customers/Customers";
import Home from "./components/Home/Home";

export default function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {loggedIn === false && (
          <>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/customer">
              <Customers />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}
