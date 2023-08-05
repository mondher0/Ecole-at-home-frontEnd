/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance, { baseURl } from "../../utils/utils";

const EditEntreprise = () => {
  const [pageAction, setPageAction] = useState("Modifier");
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [profInfo, setProfInfo] = useState();
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const { id } = useParams();

  // get prof info
  const getProfInfo = async () => {
    try {
      const response = await axios.get(`${baseURl}/professeurs/${id}`);
      setProfInfo(response.data);
      setEmail(response.data.user.email);
      setNom(response.data.user.nom);
      setPrenom(response.data.user.prenom);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // update prof info
  const updateProfInfo = async (e) => {
    e.preventDefault();
    try {
      const data = {
        siret: profInfo.siret,
        nomEntreprise: profInfo.nomEntreprise,
        adress: profInfo.address,
        codePostal: profInfo.codePostal,
        ville: profInfo.ville,
        email: email,
        phone: profInfo.phoneNumber,
        nom: nom,
        prenom: prenom,
      };
      const response = await axiosInstance.patch(
        `${baseURl}/professeurs/admin/${id}`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfInfo();
  }, []);

  const handleModifierClick = () => {
    if (pageAction === "Modifier") {
      setPageAction("Enregistrer");
      setInputsDisabled(false);
      setToggleSubmit(true);
    } else {
      setPageAction("Modifier");
      setInputsDisabled(true);
    }
  };
  return (
    <div className="admin_edit_page">
      <h3 className="current_page">
        <span>Elèves</span>
        <span>{">"}</span>
        <span>
          {nom} {prenom}
        </span>
      </h3>
      <form
        style={{
          margin: "50px",
        }}
        onSubmit={updateProfInfo}
      >
        <div className="admin_inputs_cards">
          <div className="admin_inputs">
            <div className="input_container2 half">
              <label htmlFor="Nom">Nom</label>
              <input
                id="Nom"
                disabled={inputsDisabled}
                type="text"
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Prénom ">Prénom </label>
              <input
                id="Prénom "
                disabled={inputsDisabled}
                type="text"
                value={prenom}
                onChange={(e) => {
                  setPrenom(e.target.value);
                }}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Téléphone">Téléphone</label>
              <input
                id="Téléphone"
                disabled={inputsDisabled}
                type="text"
                value={profInfo?.phoneNumber}
                onChange={(e) => {
                  setProfInfo({
                    ...profInfo,
                    phoneNumber: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Email">Email</label>
              <input
                id="Email"
                disabled={inputsDisabled}
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Adresse  ">Adresse </label>
              <input
                id="Adresse  "
                disabled={inputsDisabled}
                type="text"
                value={profInfo?.address}
                onChange={(e) => {
                  setProfInfo({
                    ...profInfo,
                    address: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Code postale">Code postale</label>
              <input
                id="Code postale"
                disabled={inputsDisabled}
                type="text"
                value={profInfo?.codePostal}
                onChange={(e) => {
                  setProfInfo({
                    ...profInfo,
                    codePostal: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Ville">Ville</label>
              <input
                id="Ville"
                disabled={inputsDisabled}
                type="text"
                value={profInfo?.ville}
                onChange={(e) => {
                  setProfInfo({
                    ...profInfo,
                    ville: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="admin_inputs_cards">
          <div
            className="admin_inputs"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="input_container2 half"
              style={{
                width: "100%",
              }}
            >
              <label htmlFor="Ville">Siret</label>
              <input
                id="Ville"
                disabled={inputsDisabled}
                type="text"
                value={profInfo?.siret}
                onChange={(e) => {
                  setProfInfo({
                    ...profInfo,
                    siret: e.target.value,
                  });
                }}
              />
            </div>
            <div
              className="input_container2 half"
              style={{
                width: "100%",
              }}
            >
              <label htmlFor="Ville">Nom entreprise</label>
              <input
                id="Ville"
                disabled={inputsDisabled}
                type="text"
                value={profInfo?.nomEntreprise}
                onChange={(e) => {
                  setProfInfo({
                    ...profInfo,
                    nomEntreprise: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        {toggleSubmit && (
          <button className="cta green" onClick={handleModifierClick}>
            Enregistrer
          </button>
        )}
      </form>
      {!toggleSubmit && (
        <button
          className={pageAction === "Enregistrer" ? "cta green" : "cta"}
          onClick={handleModifierClick}
        >
          {pageAction}
        </button>
      )}
    </div>
  );
};

export default EditEntreprise;
