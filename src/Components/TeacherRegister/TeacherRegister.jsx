/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { baseURl } from "../../utils/utils";
import "../../css/loader.css";

const TeacherRegister = () => {
  const {
    handleRegisterTeacher,
    setNom,
    setPrenom,
    setEmail,
    setPassword,
    setCodePostal,
    setVille,
    setAddress,
    setPhoneNumber,
    setDiplome,
    codePostal,
    ville,
    error,
    isLoading,
  } = useContext(AuthContext);

  return (
    <div className="parent_sign_up container professor_sign_up">
      <fieldset>
        <legend>Céer un compte professeur</legend>
        <form onSubmit={handleRegisterTeacher}>
          <div className="input_container half">
            <label htmlFor="Nom">Nom</label>
            <input
              required
              type={"text"}
              name="lastName"
              onChange={(e) => {
                setNom(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="Prénom">Prénom</label>
            <input
              required
              type={"text"}
              name="firstName"
              onChange={(e) => {
                setPrenom(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="Diplome">Diplome</label>
            <input
              type={"text"}
              name="Diplome"
              onChange={(e) => {
                setDiplome(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="Adresse">Adresse</label>
            <input
              type={"text"}
              name="Adresse"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Email</label>
            <input
              required
              type={"email"}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="Telephone">Téléphone </label>
            <input
              type={"phone"}
              name="Telephone"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="password">Mot de passe</label>
            <input
              required
              type={"password"}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="Ville">Ville</label>

            <input
              type="text"
              name="Ville"
              onChange={(e) => {
                setVille(e.target.value);
              }}
            />
          </div>
          <div className="input_container half">
            <label htmlFor="Code_postale">Code postale</label>
            <input
              type="number"
              name="Code_postale"
              onChange={(e) => {
                setCodePostal(e.target.value);
              }}
            />
          </div>
          <ul>
            <li>
              <input required type="checkbox" />
              Jaccepte les <a>&nbsp;conditions&nbsp;</a>
              <a>dutilisation&nbsp;</a> de l’ecoleathome
            </li>
            <li>
              <input required type="checkbox" />
              Se souvenir de mon identifiant
            </li>
          </ul>
          {error && <h5 className="form_error">{error}</h5>}
          <button className="login">
            {" "}
            {isLoading ? (
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              "Inscription"
            )}
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default TeacherRegister;
