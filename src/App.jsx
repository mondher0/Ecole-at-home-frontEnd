/* eslint-disable no-unused-vars */
import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import ChercherUnCours from "./Pages/ChercherUnCours";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="/chercher-un-cours" element={<ChercherUnCours/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
