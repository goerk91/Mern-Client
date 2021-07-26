import React from "react";
import Router from "./Router";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
