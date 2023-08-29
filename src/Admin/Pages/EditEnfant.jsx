/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance, { baseURl } from "../../utils/utils";

const EditEnfant = () => {
  const [pageAction, setPageAction] = useState("Modifier");
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [enfantInfo, setEnfantInfo] = useState({});
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  console.log(id);

  // get enfat info
  const getEnfantInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/enfant/admin/${id}`);
      setEnfantInfo(response?.data);
      console.log(enfantInfo);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // update parent info
  const updateParentInfo = async (e) => {
    e.preventDefault();
    const data = {
      nom: enfantInfo?.nom,
      prenom: enfantInfo?.prenom,
      email: enfantInfo?.email,
    };
    try {
      setError(false);
      setIsLoaded(true);
      const response = await axiosInstance.patch(
        `${baseURl}/enfant/admin/${id}`,
        data
      );
      console.log(response);
      setIsLoaded(false);
      setToggleSubmit(false);
      getEnfantInfo();
    } catch (error) {
      setIsLoaded(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getEnfantInfo();
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
        <span>Enfant</span>
        <span>{">"}</span>
        <span>
          {enfantInfo?.nom} {enfantInfo?.prenom}
        </span>
      </h3>
      <h4 className="admin_edit_title">Informations personnelles</h4>
      <div className="admin_inputs_cards">
        <form onSubmit={updateParentInfo}>
          <div className="admin_inputs">
            <div className="input_container2 half">
              <label>Nom</label>
              <input
                disabled={inputsDisabled}
                type="text"
                placeholder="Patrick"
                value={enfantInfo?.nom}
                onChange={(e) => {
                  setEnfantInfo({
                    ...enfantInfo,
                    nom: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input_container2 half">
              <label>Prénom </label>
              <input
                disabled={inputsDisabled}
                type="text"
                placeholder="Nicholas"
                value={enfantInfo?.prenom}
                onChange={(e) => {
                  setEnfantInfo({
                    ...enfantInfo,
                    prenom: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input_container2 half">
              <label>Email</label>
              <input
                disabled={inputsDisabled}
                type="email"
                placeholder="email"
                value={enfantInfo?.email}
                onChange={(e) => {
                  setEnfantInfo({
                    ...enfantInfo,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          {toggleSubmit && (
            <button
              className="cta green"
              onClick={handleModifierClick}
              style={{
                marginTop: "20px",
              }}
            >
              {isLoaded ? "Chargement..." : error ? "Erreur" : "Enregistrer"}
            </button>
          )}
        </form>
        {!toggleSubmit && (
          <button
            className={pageAction === "Enregistrer" ? "cta green" : "cta"}
            onClick={handleModifierClick}
            style={{
              width: "200px",
            }}
          >
            {pageAction}
          </button>
        )}
      </div>
    </div>
  );
};

export default EditEnfant;
