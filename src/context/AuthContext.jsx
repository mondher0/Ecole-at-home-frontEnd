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
  const baseURlAuth = `${baseURl}/auth`;

  //Register student
  const handleRegisterStudent = async (e) => {
    try {
      e.preventDefault();
      const data = {
        email: email,
        password: password,
        prenom: prenom,
        nom: nom,
      };
      const response = await axios.post(`${baseURlAuth}/register-eleve`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Register teacher
  const handleRegisterTeacher = async (e) => {
    try {
      e.preventDefault();

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
    } catch (error) {
      console.log(error);
    }
  };

  // Register parent
  const handleRegisterParent = async (e) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  // Login
  const handleLogin = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(`${baseURlAuth}/login`, data);
      localStorage.setItem("token", response.data.access_token);
      window.location.href = "/";
      checkUserLoggedIn();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
      console.log(error);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
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
        handleLogout,
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
        codePostal,
        ville,
        isLogged,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
