/* eslint-disable no-unused-vars */
import React from "react";

const DisponiblitéForm = () => {
  return (
    <div className="pop_up_container">
      <div className="pop_up">
        <img className="hide_btn" src="../assets/x.svg" onClick={() => {
            document.getElementById("favDialog").close();
        }}/>
        <form className="dispo_form">
          <div className="input_container">
            <label htmlFor="Matière">Matière</label>
            <select value="" name="Matière">
              <option value="">Séléctionner</option>
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="Niveau">Niveau</label>
            <select value="" name="Niveau">
              <option>Séléctioner</option>
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="Classe">Classe</label>
            <select value="" name="Classe">
              <option value="">Séléctioner</option>
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="Jour">Jour</label>
            <select value="" name="dayOfWeek">
              <option>lundi</option>
              <option>mardi</option>
              <option>mercredi</option>
              <option>jeudi</option>
              <option>vendredi</option>
              <option>samedi</option>
              <option>dimanche</option>
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="timing">Horraire</label>
            <select value="" required name="timing">
              <option value="">Séléctioner</option>
            </select>
          </div>
          <button className="submit_btn">Envoyer une demande</button>
        </form>
      </div>
    </div>
  );
};

export default DisponiblitéForm;
