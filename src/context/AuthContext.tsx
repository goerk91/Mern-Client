import React, { useState, createContext, useEffect, ReactNode } from "react";

const AuthContext = createContext({
  authenticated: false,
  reRenderAuthStatus: (): void => {},
});

interface IProps {
  children: ReactNode;
}

const AuthContextProvider = (props: IProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  console.log(loggedIn);
  async function getLoggedIn() {
    const loggedInRes = await fetch("http://localhost:5000/auth/loggedIn", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setLoggedIn(data));
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated: loggedIn, reRenderAuthStatus: getLoggedIn }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
