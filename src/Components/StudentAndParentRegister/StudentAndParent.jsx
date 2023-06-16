/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentAndParent = (type) => {
  const { handleRegisterStudent, setNom, setPrenom, setEmail, setPassword } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/choose-your-kid");
  };

  return (
    <div className="parent_sign_up container">
      <fieldset>
        <legend>
          {type.type === "Student"
            ? "Créer un compte élève"
            : "Créer un compte parent"}
        </legend>
        <form
          onSubmit={
            type.type == "Student" ? handleRegisterStudent : handleNavigate
          }
        >
          <div className="input_container">
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
          <div className="input_container">
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
          <div className="input_container">
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
          <div className="input_container">
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
          <ul className="accept">
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
          <h5 className="form_error"></h5>
          <p>
            Site conforme règlement général sur la protection des données RGPD{" "}
          </p>
          <button className="login">Inscription</button>
        </form>
      </fieldset>
    </div>
  );
};

export default StudentAndParent;
