/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { baseURl } from "../utils/utils";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [diplome, setDiplome] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [nomEnfant, setNomEnfant] = useState("");
  const [prenomEnfant, setPrenomEnfant] = useState("");
  const [emailEnfant, setEmailEnfant] = useState("");
  const [isAuth, setIsAuth] = useState({ userInfo: null, isLogged: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [adminPassword, setAdminPassword] = useState();
  const [disabled, setDisabled] = useState(false);
  const baseURlAuth = `${baseURl}/auth`;

  //Register student
  const handleRegisterStudent = async (e) => {
    try {
      setDisabled(true);
      setIsLoading(true);
      setError(false);
      e.preventDefault();
      const data = {
        email: email,
        password: password,
        prenom: prenom,
        nom: nom,
      };
      const response = await axios.post(`${baseURlAuth}/register-eleve`, data);
      console.log(response);
      setDisabled(false);
      window.location.href = "/verify-email";
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message);
      setDisabled(false);
      console.log(error);
    }
  };

  // Register teacher
  const handleRegisterTeacher = async (e) => {
    try {
      setDisabled(true);
      e.preventDefault();
      setError(false);
      setIsLoading(true);
      const data = {
        email: email,
        password: password,
        prenom: prenom,
        nom: nom,
        diplome: diplome,
        phoneNumber: phoneNumber,
        address: address,
        ville: ville,
        codePostal: codePostal,
      };
      const response = await axios.post(
        `${baseURlAuth}/register-proffesseur`,
        data
      );
      console.log(response);
      localStorage.setItem("token", response.data.access_token);
      setDisabled(false);
      window.location.href = "/prof-dispo";
    } catch (error) {
      setIsLoading(false);
      setDisabled(false);
      setError(error.response?.data.message);
      console.log(error);
    }
  };

  // Register parent
  const handleRegisterParent = async (e) => {
    try {
      setDisabled(true);
      setError(false);
      setIsLoading(true);
      const enfants = [
        {
          nom: nomEnfant,
          prenom: prenomEnfant,
          email: emailEnfant,
        },
      ];
      e.preventDefault();
      const data = {
        email: email,
        password: password,
        prenom: prenom,
        nom: nom,
        enfants: enfants,
      };
      const response = await axios.post(`${baseURlAuth}/register-parent`, data);
      console.log(response);
      setDisabled(false);
      window.location.href = "/verify-email";
    } catch (error) {
      setIsLoading(false);
      setDisabled(false);
      setError(error.response?.data.message);
      console.log(error);
    }
  };

  // Login
  const handleLogin = async (e) => {
    try {
      setError(false);
      setDisabled(true);
      setIsLoading(true);
      e.preventDefault();
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${baseURlAuth}/login`, data);
      console.log(response);

      if (
        response.data.role === "teacher" &&
        response.data.status !== "valide"
      ) {
        console.log("teacher not valide");
        window.location.href = "/wait-admin";
        return;
      }
      if (response.data.status === "bloque") {
        window.location.href = "/bloque-account";
        return;
      }
      localStorage.setItem("token", response.data.access_token);
      if (response.data.status === "suspendu") {
        window.location.href = "/suspendre-account";
        return;
      }
      setDisabled(false);
      window.location.href = "/";
      checkUserLoggedIn();
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message);
      setDisabled(false);
      console.log(error);
    }
  };

  // handle admin login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setError(false);
    setIsLoading(true);
    try {
      const data = {
        email: adminEmail,
        password: adminPassword,
      };
      const response = await axios.post(`${baseURl}/auth/login`, data);
      console.log(response);
      localStorage.setItem("token", response.data.access_token);
      setDisabled(false);
      window.location.href = "/admin/board";
      checkUserLoggedIn();
    } catch (error) {
      setIsLoading(false);
      setDisabled(false);
      setError(error.response?.data.message);
      console.log(error);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    setIsAuth({ userInfo: null, isLogged: false });
  };

  // admin logout
  const handleAdminLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
    setIsAuth({ userInfo: null, isLogged: false });
  };

  // check if user is logged in
  const checkUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      setIsAuth({ userInfo: jwtDecode(token), isLogged: true });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkUserLoggedIn();
    }
  }, []);

  const { userInfo, isLogged } = isAuth;
  console.log(isLogged);
  return (
    <AuthContext.Provider
      value={{
        handleRegisterStudent,
        handleRegisterTeacher,
        handleRegisterParent,
        handleLogin,
        handleAdminLogin,
        handleLogout,
        handleAdminLogout,
        checkUserLoggedIn,
        setNom,
        setPrenom,
        setEmail,
        setPassword,
        setDiplome,
        setPhoneNumber,
        setAddress,
        setVille,
        setCodePostal,
        setNomEnfant,
        setPrenomEnfant,
        setEmailEnfant,
        setIsLoading,
        setAdminEmail,
        setAdminPassword,
        codePostal,
        ville,
        isLogged,
        isLoading,
        error,
        nomEnfant,
        prenomEnfant,
        emailEnfant,
        disabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
