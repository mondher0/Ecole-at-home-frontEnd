/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance, { baseURl } from "../../utils/utils";

const EditEleve = () => {
  const [pageAction, setPageAction] = useState("Modifier");
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const { id } = useParams();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [codePostale, setCodePostale] = useState("");
  const [ville, setVille] = useState("");

  console.log(id);

  // update eleve info
  const updateEleve = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nom: nom,
        prenom: prenom,
        phone: telephone,
        email: email,
        adress: adresse,
        codePostal: codePostale,
        ville: ville,
      };
      const response = await axiosInstance.patch(
        `${baseURl}/eleve/admin/${id}`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
        <span>Nicholas Patrick</span>
      </h3>
      <form onSubmit={updateEleve}>
        <div className="admin_inputs_cards">
          <div className="admin_inputs">
            <div className="input_container2 half">
              <label htmlFor="Nom">Nom</label>
              <input
                id="Nom"
                disabled={inputsDisabled}
                type="text"
                placeholder="Patrick"
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Prénom ">Prénom </label>
              <input
                id="Prénom "
                disabled={inputsDisabled}
                type="text"
                placeholder="Nicholas"
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Téléphone">Téléphone</label>
              <input
                id="Téléphone"
                disabled={inputsDisabled}
                type="number"
                placeholder="01124548870"
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Email">Email</label>
              <input
                id="Email"
                disabled={inputsDisabled}
                type="email"
                placeholder="imane@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Adresse  ">Adresse </label>
              <input
                id="Adresse  "
                disabled={inputsDisabled}
                type="text"
                placeholder="test test"
                onChange={(e) => setAdresse(e.target.value)}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Code postale">Code postale</label>
              <input
                id="Code postale"
                disabled={inputsDisabled}
                type="text"
                placeholder="test"
                onChange={(e) => setCodePostale(e.target.value)}
              />
            </div>
            <div className="input_container2 half">
              <label htmlFor="Ville">Ville</label>
              <input
                id="Ville"
                disabled={inputsDisabled}
                type="text"
                placeholder="test test"
                onChange={(e) => setVille(e.target.value)}
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

export default EditEleve;
