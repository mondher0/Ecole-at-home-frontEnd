/* eslint-disable no-unused-vars */
import { React, useState } from "react";

const EditParent = () => {
  const [pageAction, setPageAction] = useState("Modifier");
  const [inputsDisabled, setInputsDisabled] = useState(true);

  const handleModifierClick = () => {
    if (pageAction === "Modifier") {
      setPageAction("Enregistrer");
      setInputsDisabled(false);
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
        <span>Nicholas Patrick</span>
      </h3>
      <h4 className="admin_edit_title">Informations personnelles</h4>
      <div className="admin_inputs_cards">
        <div className="admin_inputs">
          <div className="input_container2 half">
            <label>Nom</label>
            <input
              disabled={inputsDisabled}
              type="text"
              placeholder="Patrick"
            />
          </div>
          <div className="input_container2 half">
            <label>Prénom </label>
            <input
              disabled={inputsDisabled}
              type="text"
              placeholder="Nicholas"
            />
          </div>
          <div className="input_container2 half">
            <label>Téléphone</label>
            <input
              disabled={inputsDisabled}
              type="text"
              placeholder="01124548870"
            />
          </div>
          <div className="input_container2 half">
            <label>Email</label>
            <input
              disabled={inputsDisabled}
              type="text"
              placeholder="imane@gmail.com"
            />
          </div>
          <div className="input_container2 half">
            <label>Adresse </label>
            <input
              disabled={inputsDisabled}
              type="text"
              placeholder="test test"
            />
          </div>
          <div className="input_container2 half">
            <label>Code postale</label>
            <input disabled={inputsDisabled} type="text" placeholder="test" />
          </div>
          <div className="input_container2 half">
            <label>Ville</label>
            <input
              disabled={inputsDisabled}
              type="text"
              placeholder="test test"
            />
          </div>
        </div>
      </div>

      <h4 className="admin_edit_title">Elève inscrits</h4>
      <div className="eleve_cards_container">
        <div className="user_type_card">
          <img src="../assets/Parent.svg" />
          Khaled
          <div className="bg"></div>
          <div className="tools">
            <button type="button" className="delete">
              <img src="../assets/delete.svg" />
            </button>
            <button type="button" className="edit">
              <img src="../assets/edite.svg" />
            </button>
          </div>
        </div>

        <div className="user_type_card">
          <img src="../assets/Parent.svg" />
          Khaled
          <div className="bg"></div>
          <div className="tools">
            <button type="button" className="delete">
              <img src="../assets/delete.svg" />
            </button>
            <button type="button" className="edit">
              <img src="../assets/edite.svg" />
            </button>
          </div>
        </div>

        <div className="user_type_card">
          <img src="../assets/Parent.svg" />
          Khaled
          <div className="bg"></div>
          <div className="tools">
            <button type="button" className="delete">
              <img src="../assets/delete.svg" />
            </button>
            <button type="button" className="edit">
              <img src="../assets/edite.svg" />
            </button>
          </div>
        </div>
      </div>

      <button
        className={pageAction === "Enregistrer" ? "cta green" : "cta"}
        onClick={handleModifierClick}
      >
        {pageAction}
      </button>
    </div>
  );
};

export default EditParent;
