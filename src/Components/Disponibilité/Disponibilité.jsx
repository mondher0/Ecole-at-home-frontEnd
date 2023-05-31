/* eslint-disable no-unused-vars */
import React from "react";
import "./Disponibilité.css";
import DisponiblitéForm from "../DisponibilitéForm/DisponiblitéForm";

const Disponibilité = () => {
  return (
    <>
      <div className="dispos_page">
        <h2 className="main_title">Mes disponibilité</h2>
        <button
          className="add_dispo_btn"
          onClick={() => {
            document.getElementById("favDialog").showModal();
          }}
        >
          <img src="../assets/plus_calender.svg" />
          Ajouter disponibilité
        </button>
        <div className="dispos_container">
          <ul className="the_head">
            <li>Etat</li>
            <li>Matière</li>
            <li>Niveau</li>
            <li>Jour de la semaine</li>
            <li>Horraire</li>
            <li>Action</li>
          </ul>
          <ul className="the_head">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li style={{ justifyContent: "space-around", padding: "5px" }}>
              <div style={{ cursor: "pointer" }}>
                <img src="../assets/prev.svg" />
              </div>
              page:
              <div style={{ cursor: "pointer" }}>
                <img src="../assets/next.svg" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <dialog style={{ border: 0, borderRadius: "20px" }} id="favDialog">
        <DisponiblitéForm />
      </dialog>
    </>
  );
};

export default Disponibilité;
