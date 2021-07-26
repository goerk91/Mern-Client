import React, { useState, createContext, useEffect, ReactNode } from "react";
/* Frage: Wenn die Seite schnell refreshed/gerendert wird, wird register und Login kurz eingeblendet,
 aufgrund des default values, hier loggedIn = false. Wie lässt sich das vermeiden?
*/

const AuthContext = createContext({
  loggedIn: false,
  getLoggedIn: (): void => {},
});

interface IProps {
  children: ReactNode;
}

const AuthContextProvider = (props: IProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  async function getLoggedIn() {
    await fetch("http://localhost:5000/auth/loggedIn", {
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
      value={{ loggedIn: loggedIn, getLoggedIn: getLoggedIn }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
