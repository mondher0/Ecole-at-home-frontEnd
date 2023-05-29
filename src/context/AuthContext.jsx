/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
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

  const baseURl = "http://localhost:9999/api/auth";

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
      const response = await axios.post(`${baseURl}/register-eleve`, data);
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
        `${baseURl}/register-proffesseur`,
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
      const response = await axios.post(`${baseURl}/register-parent`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleRegisterStudent,
        handleRegisterTeacher,
        handleRegisterParent,
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
        codePostal,
        ville,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
