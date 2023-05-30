/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SearchProvider from "./context/SearchContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import GlobalProvider from "./context/GlobalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <GlobalProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </GlobalProvider>
  </AuthProvider>
);
