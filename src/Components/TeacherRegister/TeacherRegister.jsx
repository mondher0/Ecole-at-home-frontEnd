/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const TeacherRegister = () => {
  const [villes, setVilles] = useState([]);
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
  } = useContext(AuthContext);
  // get villes and code postales
  const getVillesAndCodePostales = async () => {
    try {
      const response = await fetch("http://localhost:9999/api/ville");
      const data = await response.json();
      console.log(data);
      setVilles(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVillesAndCodePostales();
  }, []);

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
          <div className="input_container quarter">
            <label htmlFor="Ville">Ville</label>
            <select
              id="Ville"
              name="Ville"
              value={ville}
              onChange={(e) => {
                setVille(e.target.value);
              }}
            >
              <option value="">Selectionner</option>
              {villes.map((ville) => {
                return (
                  <option key={ville.id} value={ville.ville}>
                    {ville.ville}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_container quarter">
            <label htmlFor="Code_postale">Code postale</label>
            <select
              id="Code_postale"
              name="Code_postale"
              value={codePostal}
              onChange={(e) => {
                setCodePostal(e.target.value);
              }}
            >
              <option value="">Selectionner</option>
              {villes.map((ville) => {
                return (
                  <option key={ville.id} value={ville.codePostal}>
                    {ville.codePostal}
                  </option>
                );
              })}
            </select>
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
          <h5 className="form_error"></h5>
          <button className="login_btn">Inscription</button>
        </form>
      </fieldset>
    </div>
  );
};

export default TeacherRegister;
