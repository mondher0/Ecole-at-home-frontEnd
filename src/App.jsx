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
import Cours from "./Admin/Pages/Cours";
import Paiment from "./Admin/Pages/Paiment";
import Avis from "./Admin/Pages/Avis";
import Historique from "./Admin/Pages/Historique";
import Settings from "./Admin/Pages/Settings";
import EditEntreprise from "./Admin/Pages/EditEntreprise";
import AdminLogin from "./Admin/Pages/AdminLogin";
import Payment from "./Pages/Payment";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import LoginProtectedRoute from "./Components/ProtectedRoutes/LoginProtectedRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import NewPassword from "./Pages/NewPassword";
import AdminProtectedRoute from "./Admin/Components/AdminProtectedRoute";
import AdminLoginProtectedRoute from "./Admin/Components/AdminLoginProtectedRoute";
import AddEmail from "./Admin/Pages/addEmail";
import EmailConfirmation from "./Pages/EmailConfirmation";
import TeacherRating from "./Pages/TeacherRating";
import EditEnfant from "./Admin/Pages/EditEnfant";
import AdminForgotPassowrd from "./Admin/Pages/AdminForgotPassword";
import ProfInfo from "./Components/ProfInfo/ProfInfo";
import WaitAdmin from "./Pages/WaitAdmin";
import BloqueAccont from "./Pages/BloqueAccont";
import SuspendreAccount from "./Pages/SuspendreAccount";
import SuccesPayment from "./Pages/SuccesPayment";
import FailPayment from "./Pages/FailPayment";
import Apropos from "./Pages/Apropos";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="/chercher-un-cours" element={<ChercherUnCours />} />
          <Route path="/rating/:id" element={<TeacherRating />} />
          <Route path="/choose_user_type" element={<ChooseUserType />} />
          <Route path="/inscription/:userType" element={<Insecription />} />
          <Route path="/choose-your-kid" element={<ChooseKids />} />
          <Route
            path="/prof-dispo"
            element={
              <ProtectedRoute>
                <ProfInfo />
              </ProtectedRoute>
            }
          />
          <Route path="/wait-admin" element={<WaitAdmin />} />
          <Route path="/bloque-account" element={<BloqueAccont />} />
          <Route path="/suspendre-account" element={<SuspendreAccount />} />
          <Route
            path="/carte-ajoutee"
            element={
              <ProtectedRoute>
                <SuccesPayment />
              </ProtectedRoute>
            }
          />
          <Route path="/carte-non-ajoutee" element={<FailPayment />} />
          <Route
            path="/login"
            element={
              <LoginProtectedRoute>
                <Login />
              </LoginProtectedRoute>
            }
          />
          <Route
            path="/mes-cours"
            element={
              <ProtectedRoute>
                <MesCours />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route path="/a-propos" element={<Apropos />} />
          <Route
            path="/forgot-password"
            element={
              <LoginProtectedRoute>
                <ForgotPassword />
              </LoginProtectedRoute>
            }
          />
          <Route
            path="/new-password"
            element={
              <LoginProtectedRoute>
                <NewPassword />
              </LoginProtectedRoute>
            }
          />
          <Route path="/verify-email" element={<EmailConfirmation />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
        <Route
          path="/admin/login"
          element={
            <AdminLoginProtectedRoute>
              <AdminLogin />
            </AdminLoginProtectedRoute>
          }
        />
        <Route
          path="/admin/forgot-password"
          element={
            <LoginProtectedRoute>
              <AdminForgotPassowrd />
            </LoginProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminContainer />
            </AdminProtectedRoute>
          }
        >
          <Route path="/admin/board" element={<BoardPage />} />
          <Route path="/admin/professeurs" element={<Profeseurs />} />
          <Route path="/admin/eleve-parent" element={<EleveParent />} />
          <Route path="/admin/Parent/edit/:id" element={<EditParent />} />
          <Route
            path="/admin/Parent/edit/:id/edit-enfant/:id"
            element={<EditEnfant />}
          />
          <Route path="/admin/Eleve/edit/:id" element={<EditEleve />} />
          <Route path="/admin/Emails" element={<EmailsPage />} />
          <Route path="/admin/Email/edit/:id" element={<EditMail />} />
          <Route path="/admin/abonnements" element={<Abonnements />} />
          <Route path="/admin/cours" element={<Cours />} />
          <Route path="/admin/paiment" element={<Paiment />} />
          <Route path="/admin/avis" element={<Avis />} />
          <Route path="/admin/historique" element={<Historique />} />
          <Route path="/admin/parametres" element={<Settings />} />
          <Route
            path="/admin/professeurs/edit/:id"
            element={<EditEntreprise />}
          />
          <Route path="/admin/ajouter-email" element={<AddEmail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
