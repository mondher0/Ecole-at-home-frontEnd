/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance, { baseURl } from "../../utils/utils";
import { useEffect } from "react";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  console.log(id);

  // get eleve info
  const getEleveInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/eleve/admin/${id}`);
      console.log(response);
      setNom(response.data.user.nom);
      setPrenom(response.data.user.prenom);
      setTelephone(response.data.phoneNumber);
      setEmail(response.data.user.email);
      setAdresse(response.data.address);
      setCodePostale(response.data.codePostal);
      setVille(response.data.ville);
    } catch (error) {
      console.log(error);
    }
  };

  // update eleve info
  const updateEleve = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setIsLoaded(true);
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
      setIsLoaded(false);
      setToggleSubmit(false);
      getEleveInfo();
    } catch (error) {
      setIsLoaded(false);
      setError(true);
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

  useEffect(() => {
    getEleveInfo();
  }, []);
  return (
    <div className="admin_edit_page">
      <h3 className="current_page">
        <span>Elèves</span>
        <span>{">"}</span>
        <span>
          {nom} {prenom}
        </span>
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
                value={nom}
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
                value={prenom}
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
                value={telephone}
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
                value={email}
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
                value={adresse}
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
                value={codePostale}
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
                value={ville}
              />
            </div>
          </div>
        </div>
        {toggleSubmit && (
          <button className="cta green" onClick={handleModifierClick}>
            {isLoaded ? "Chargement..." : error ? "Erreur" : "Enregistrer"}
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
