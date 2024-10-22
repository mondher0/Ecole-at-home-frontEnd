/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { Parent, supprimer, edit, hide } from "../../assets/index";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance, { baseURl } from "../../utils/utils";

const EditParent = () => {
  const navigate = useNavigate();
  const [pageAction, setPageAction] = useState("Modifier");
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [parentInfo, setParentInfo] = useState({});
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  console.log(id);

  // get parent info
  const getParentInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/parent/admin/${id}`);
      setParentInfo(response?.data);
      console.log(parentInfo);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // delete enfant
  const deleteEnfant = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${baseURl}/enfant/admin/${id}`
      );
      console.log(response);
      getParentInfo();
    } catch (error) {
      console.log(error);
    }
  };

  // update parent info
  const updateParentInfo = async (e) => {
    e.preventDefault();
    const data = {
      nom: parentInfo?.user?.nom,
      prenom: parentInfo?.user?.prenom,
      email: parentInfo?.user?.email,
      phone: parentInfo?.phoneNumber,
      adress: parentInfo?.address,
      codePostal: parentInfo?.codePostal,
      ville: parentInfo?.ville,
    };
    try {
      setError(false);
      setIsLoaded(true);
      const response = await axiosInstance.patch(
        `${baseURl}/parent/admin/${id}`,
        data
      );
      console.log(response);
      setIsLoaded(false);
      setToggleSubmit(false);
      getParentInfo();
    } catch (error) {
      setIsLoaded(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getParentInfo();
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
        <span>Parent</span>
        <span>{">"}</span>
        <span>
          {parentInfo?.user?.nom} {parentInfo?.user?.prenom}
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
                value={parentInfo?.user?.nom}
                onChange={(e) => {
                  setParentInfo({
                    ...parentInfo,
                    user: { ...parentInfo?.user, nom: e.target.value },
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
                value={parentInfo?.user?.prenom}
                onChange={(e) => {
                  setParentInfo({
                    ...parentInfo,
                    user: { ...parentInfo?.user, prenom: e.target.value },
                  });
                }}
              />
            </div>
            <div className="input_container2 half">
              <label>Téléphone</label>
              <input
                disabled={inputsDisabled}
                type="number"
                placeholder="01124548870"
                value={parentInfo?.phoneNumber}
                onChange={(e) => {
                  setParentInfo({
                    ...parentInfo,
                    phoneNumber: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input_container2 half">
              <label>Email</label>
              <input
                disabled={inputsDisabled}
                type="email"
                placeholder="imane@gmail.com"
                value={parentInfo?.user?.email}
                onChange={(e) => {
                  setParentInfo({
                    ...parentInfo,
                    user: { ...parentInfo?.user, email: e.target.value },
                  });
                }}
              />
            </div>
            <div className="input_container2 half">
              <label>Adresse </label>
              <input
                disabled={inputsDisabled}
                type="text"
                placeholder="test test"
                value={parentInfo?.address}
                onChange={(e) => {
                  setParentInfo({
                    ...parentInfo,
                    address: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input_container2 half">
              <label>Code postale</label>
              <input
                disabled={inputsDisabled}
                type="text"
                placeholder="test"
                value={parentInfo?.codePostal}
                onChange={(e) => {
                  setParentInfo({
                    ...parentInfo,
                    codePostal: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input_container2 half">
              <label>Ville</label>
              <input
                disabled={inputsDisabled}
                type="text"
                placeholder="test test"
                value={parentInfo?.ville}
                onChange={(e) => {
                  setParentInfo({
                    ...parentInfo,
                    ville: e.target.value,
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

      {parentInfo?.enfants?.length > 0 && (
        <h4 className="admin_edit_title">Elève inscrits</h4>
      )}
      <div className="eleve_cards_container">
        {parentInfo?.enfants?.map((eleve) => (
          <>
            <div className="user_type_card">
              <img src={Parent} />
              {eleve.nom} {eleve.prenom}
              <div className="bg"></div>
              <div className="tools">
                <button
                  type="button"
                  className="delete"
                  onClick={() => {
                    setShowDeletePopUp({
                      id: eleve.id,
                      info: `${eleve.nom} ${eleve.prenom}`,
                    });
                  }}
                >
                  <img
                    src={supprimer}
                    style={{
                      marginTop: "20px",
                    }}
                  />
                </button>
                <button
                  type="button"
                  className="edit"
                  onClick={() => {
                    navigate(`edit-enfant/${eleve.id}`);
                  }}
                >
                  <img
                    src={edit}
                    style={{
                      marginTop: "20px",
                    }}
                  />
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
      {showDeletePopUp && (
        <div className="pop_up_container">
          <div className="pop_up edit etat delete">
            <div className="prof_edit_top"></div>
            <div className="edit_etat delete">
              <p className="delete_text">
                Etes vous sûr de vouloir supprimer
                <span>{showDeletePopUp.info}</span>?
              </p>
            </div>
            <button
              style={{
                backgroundColor: "#0078D4",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "25px",
                cursor: "pointer",
                marginTop: "20px",
                width: "120px",
                textAlign: "center",
              }}
              onClick={() => {
                deleteEnfant(showDeletePopUp.id);
                setShowDeletePopUp(false);
              }}
            >
              Confirmer
            </button>
            <img
              className="hide_btn"
              src={hide}
              onClick={() => {
                setShowDeletePopUp(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditParent;
