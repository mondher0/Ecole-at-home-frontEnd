/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Parent } from "../../assets/index";
import AddingEnfantForm from "../AddingEnfantForm/AddingEnfantForm";
import axiosInstance, { baseURl } from "../../utils/utils";

const Settings = () => {
  const { userInfo } = useContext(GlobalContext);
  console.log(userInfo);
  const { role } = userInfo;
  const [email, setEmail] = useState(userInfo.email);
  const [nom, setNom] = useState(userInfo.nom);
  const [prenom, setPrenom] = useState(userInfo.prenom);
  const [telephone, setTelephone] = useState(
    role === "parent"
      ? userInfo.parentProfileEntity.phoneNumber
      : userInfo.eleveProfile.phoneNumber
  );
  const [adresse, setAdresse] = useState(
    role === "parent"
      ? userInfo.parentProfileEntity.address
      : userInfo.eleveProfile.adresse
  );
  const [ville, setVille] = useState(
    role === "parent"
      ? userInfo.parentProfileEntity.ville
      : userInfo.eleveProfile.ville
  );
  const [codePostal, setCodePostal] = useState(
    role === "parent"
      ? userInfo.parentProfileEntity.codePostal
      : userInfo.eleveProfile.codePostal
  );
  const [password, setPassword] = useState("");

  const [enfants, setEnfants] = useState();
  const [enfantState, setEnfantState] = useState();

  // update student
  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        prenom: prenom,
        nom: nom,
        phoneNumber: telephone,
        adresse: adresse,
        ville: ville,
        codePostal: codePostal,
      };
      if (password) {
        data.password = password;
      }
      const response = await axiosInstance.patch(
        `${baseURl}/users/update`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // get enfants of the parent
  const getEnfants = async () => {
    if (role !== "parent") return;
    try {
      const response = await axiosInstance.get(`${baseURl}/enfant`);
      console.log(response);
      setEnfants(response.data.enfants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnfants();
  }, [enfantState]);

  return (
    <div className="Settings">
      <fieldset>
        <form onSubmit={updateStudent}>
          <div className="input_container half">
            <label htmlFor="Nom">Nom</label>
            <input
              placeholder="kk"
              type={"text"}
              name="Nom"
              value={nom}
              onChange={(e) => {
                setNom(e.target.value);
              }}
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="Prénom">Prénom</label>
            <input
              placeholder="kk"
              type={"text"}
              name="Prénom"
              value={prenom}
              style={{
                color: "black",
                fontWeight: "bold",
              }}
              onChange={(e) => {
                setPrenom(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Email</label>
            <input
              // disabled={false}
              style={{
                color: "black",
                fontWeight: "bold",
              }}
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Téléphone</label>
            <input
              style={{
                color: "black",
                fontWeight: "bold",
              }}
              placeholder="kk"
              type={"number"}
              name="email"
              value={telephone}
              onChange={(e) => {
                setTelephone(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Adresse</label>
            <input
              style={{
                color: "black",
                fontWeight: "bold",
              }}
              placeholder="kk"
              type={"text"}
              name="email"
              value={adresse}
              onChange={(e) => {
                setAdresse(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Ville</label>
            <input
              style={{
                color: "black",
                fontWeight: "bold",
              }}
              placeholder="kk"
              type={"text"}
              name="email"
              value={ville}
              onChange={(e) => {
                setVille(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Code postal</label>
            <input
              style={{
                color: "black",
                fontWeight: "bold",
              }}
              placeholder="kk"
              type={"number"}
              name="email"
              value={codePostal}
              onChange={(e) => {
                setCodePostal(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Mot de passe</label>
            <input
              style={{
                color: "black",
                fontWeight: "bold",
              }}
              placeholder="Password"
              type={"password"}
              name="email"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <button
            style={{
              width: "200px",
              marginTop: "10px",
            }}
          >
            Enregistre
          </button>
        </form>
      </fieldset>
      {role === "parent" && (
        <>
          <h1
            style={{
              marginTop: "20px",
            }}
          >
            Mes Enfants
          </h1>
          <div
            className="enfants"
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {enfants &&
              enfants.map((enfant) => {
                return (
                  <div
                    key={enfant.id}
                    className="user_type_card"
                    style={{
                      marginBottom: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <img src={Parent} />
                    {enfant.nom} {enfant.prenom}
                    <div className="bg"></div>
                    <div className="tools"></div>
                  </div>
                );
              })}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("demCours").showModal();
                }}
                style={{
                  padding: "10px",
                  border: "2px solid #0078D4",
                  borderRadius: "30px",
                  backgroundColor: "transparent",
                  color: "#0078D4",
                }}
              >
                Ajouter un enfant
              </button>
            </div>
          </div>
        </>
      )}
      <dialog style={{ border: 0, borderRadius: "20px" }} id="demCours">
        <AddingEnfantForm cas="parent-add" setEnfantState={setEnfantState} />
      </dialog>
    </div>
  );
};

export default Settings;
