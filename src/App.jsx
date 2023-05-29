/* eslint-disable no-unused-vars */
import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import ChercherUnCours from "./Pages/ChercherUnCours";
import ChooseUserType from "./Pages/ChooseUserType";
import Insecription from "./Pages/Insecription";
import ChooseKids from "./Pages/ChooseKids";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="/chercher-un-cours" element={<ChercherUnCours />} />
          <Route path="/choose_user_type" element={<ChooseUserType />} />
          <Route path="/inscription/:userType" element={<Insecription />} />
          <Route path="/choose-your-kid" element={<ChooseKids />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
