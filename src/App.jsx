/* eslint-disable no-unused-vars */
import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import ChercherUnCours from "./Pages/ChercherUnCours";
import ChooseUserType from "./Pages/ChooseUserType";
import Insecription from "./Pages/Insecription";
import ChooseKids from "./Pages/ChooseKids";
import Login from "./Pages/Login";
import MesCours from "./Pages/MesCours";
import AdminContainer from "./Admin/Components/AdminContainer/AdminContainer";
import BoardPage from "./Admin/Pages/BoardPage";
import Profeseurs from "./Admin/Pages/Professeurs";
import EleveParent from "./Admin/Pages/EleveParent";
import EditEleve from "./Admin/Pages/EditEleve";
import EditParent from "./Admin/Pages/EditParent";
import EmailsPage from "./Admin/Pages/Emails";
import EditMail from "./Admin/Pages/EditEmail";
import Abonnements from "./Admin/Pages/Abonnements";

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
          <Route path="/login" element={<Login />} />
          <Route path="/mes-cours" element={<MesCours />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/admin" element={<AdminContainer />}>
          <Route path="/admin/board" element={<BoardPage />} />
          <Route path="/admin/professeurs" element={<Profeseurs />} />
          <Route path="/admin/eleve-parent" element={<EleveParent />} />
          <Route path="/admin/Parent/edit" element={<EditParent />} />
          <Route path="/admin/Eleve/edit" element={<EditEleve />} />
          <Route path="/admin/Emails" element={<EmailsPage />} />
          <Route path="/admin/Email/edit" element={<EditMail />} />
          <Route path="/admin/abonnements" element={<Abonnements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
