/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Parent, img } from "../../assets/index";
import AddingEnfantForm from "../AddingEnfantForm/AddingEnfantForm";
import axiosInstance, { baseURl } from "../../utils/utils";
import "./settings.css";
import "../../css/loader.css";

const Settings = () => {
  const { userInfo } = useContext(GlobalContext);
  console.log(userInfo);
  const { role } = userInfo;
  const [email, setEmail] = useState(userInfo.email);
  const [nom, setNom] = useState(userInfo.nom);
  const [prenom, setPrenom] = useState(userInfo.prenom);
  const [iban, setIban] = useState("");
  const [telephone, setTelephone] = useState(
    role === "parent"
      ? userInfo.parentProfileEntity.phoneNumber
      : role === "teacher"
      ? userInfo.proffesseurProfile.phoneNumber
      : role === "student"
      ? userInfo.eleveProfile.phoneNumber
      : ""
  );
  console.log(telephone);
  const [adresse, setAdresse] = useState(
    role === "parent"
      ? userInfo.parentProfileEntity.address
      : role === "teacher"
      ? userInfo.proffesseurProfile.address
      : role === "student" && userInfo.eleveProfile.address
  );
  const [ville, setVille] = useState(
    role === "parent"
      ? userInfo.parentProfileEntity.ville
      : role === "teacher"
      ? userInfo.proffesseurProfile.ville
      : role === "student" && userInfo.eleveProfile.ville
  );
  const [codePostal, setCodePostal] = useState(
    role === "parent"
      ? userInfo.parentProfileEntity.codePostal
      : role === "teacher"
      ? userInfo.proffesseurProfile.codePostal
      : role === "student" && userInfo.eleveProfile.codePostal
  );
  const [password, setPassword] = useState("");

  const [enfants, setEnfants] = useState();
  const [enfantState, setEnfantState] = useState();

  const [nomEntreprise, setNomEntreprise] = useState(
    userInfo?.proffesseurProfile?.nomEntreprise
  );
  const [siret, setSiret] = useState(userInfo?.proffesseurProfile?.siret);
  const [settingsLoader, setSettingsLoader] = useState(false);
  const [settingsError, setSettingsError] = useState(false);
  const [ibanError, setIbanError] = useState(false);
  const [ibanLoader, setIbanLoader] = useState("");

  // update student
  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      setSettingsError(false);
      setSettingsLoader(true);
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
      setSettingsLoader(false);
      console.log(response);
    } catch (error) {
      setSettingsLoader(false);
      setSettingsError(true);
      console.log(error);
    }
  };

  // update professeur
  const updateProfesseur = async (e) => {
    e.preventDefault();
    try {
      setSettingsError(false);
      setSettingsLoader(true);
      const data = {
        email: email,
        prenom: prenom,
        nom: nom,
        phoneNumber: telephone,
        adresse: adresse,
        ville: ville,
        codePostal: codePostal,
        siret: siret,
        nomEntreprise: nomEntreprise,
      };
      if (password) {
        data.password = password;
      }
      const response = await axiosInstance.patch(
        `${baseURl}/users/update-professeur`,
        data
      );
      console.log(response);
      setSettingsLoader(false);
    } catch (error) {
      setSettingsLoader(false);
      setSettingsError(true);
      console.log(error);
    }
  };

  // upload image of professeur
  const uploadImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = await axiosInstance.post(
        `${baseURl}/professeurs/profile-image`,
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // submit iban
  const submitIban = async (e) => {
    e.preventDefault();
    try {
      setIbanError(false);
      setIbanLoader(true);
      const response = await axiosInstance.post(
        `${baseURl}/payment/add-bank-account`,
        {
          iban: iban,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      setIbanLoader(false);
      setIbanError(true);
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
        <form onSubmit={role === "teacher" ? updateProfesseur : updateStudent}>
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
              placeholder="Telephone"
              type={"text"}
              name="email"
              value={telephone}
              onChange={(e) => {
                setTelephone(e.target.value);
              }}
            />
          </div>
          <div className="input_container half">
            <label htmlFor="email">Adresse</label>
            <input
              style={{
                color: "black",
                fontWeight: "bold",
              }}
              placeholder="Adress"
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
              placeholder="Ville"
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
              placeholder="Code postal"
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
          {role === "teacher" && (
            <>
              <div className="input_container half">
                <label htmlFor="email">Siret</label>
                <input
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                  placeholder="Siret"
                  type={"text"}
                  name="email"
                  value={siret}
                  onChange={(e) => {
                    setSiret(e.target.value);
                  }}
                ></input>
              </div>
              <div className="input_container half">
                <label htmlFor="email">Nom entreprise</label>
                <input
                  style={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                  placeholder="Nom entreprise"
                  type={"text"}
                  name="email"
                  value={nomEntreprise}
                  onChange={(e) => {
                    setNomEntreprise(e.target.value);
                  }}
                ></input>
              </div>
            </>
          )}
          <button
            style={{
              width: "200px",
              marginTop: "10px",
            }}
          >
            {settingsLoader ? (
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            ) : settingsError ? (
              "Error"
            ) : (
              "Enregistre"
            )}
          </button>
        </form>
      </fieldset>
      {role === "teacher" && (
        <fieldset
          style={{
            marginTop: "20px",
          }}
        >
          <form
            style={{
              gap: "10px",
            }}
            onSubmit={submitIban}
          >
            <div
              className="input_container half"
              style={{
                marginTop: "10px",
              }}
            >
              <label htmlFor="email">Iban</label>
              <input
                style={{
                  color: "black",
                  fontWeight: "bold",
                }}
                type="text"
                name="iban"
                placeholder="iban"
                onChange={(e) => {
                  setIban(e.target.value);
                }}
              ></input>
            </div>
            <button
              style={{
                width: "200px",
              }}
            >
              {ibanLoader ? (
                <div className="spinner-container">
                  <div className="loading-spinner"></div>
                </div>
              ) : ibanError ? (
                "Error"
              ) : (
                "Enregistre"
              )}
            </button>
          </form>
        </fieldset>
      )}
      {role === "teacher" && (
        <div
          className="media"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderRadius: "12px",
            border: " 1px solid #ddd",
            outline: "none",
            width: "80%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            className="image"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              outline: "none",
              margin: "20px",
              height: "200px",
              position: "relative",
            }}
          >
            <input
              type="file"
              id="image"
              name="image"
              size="60px"
              style={{
                opacity: "0",
                marginLeft: "200px",
                position: "absolute",
                top: "40px",
              }}
              onChange={(e) => {
                uploadImage(e);
              }}
            />
            <img
              src={img}
              alt="image"
              style={{
                width: "50px",
                margin: "0",
              }}
            />
            <p className="photo">Modifier la photo</p>
          </div>
        </div>
      )}

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
              alignItems: "center",
              justifyContent: "center",
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
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
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
        </>
      )}
      <dialog style={{ border: 0, borderRadius: "20px" }} id="demCours">
        <AddingEnfantForm cas="parent-add" setEnfantState={setEnfantState} />
      </dialog>
    </div>
  );
};

export default Settings;
