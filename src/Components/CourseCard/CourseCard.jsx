/* eslint-disable no-unused-vars */
import React from "react";

const CourseCard = () => {
  return (
    <div className="cours_card">
      <img className="avatare" src="../assets/avatare.png" />
      <div className="info">
        <h4 className="bold"></h4>
        <h4></h4>
        <ul className="tags">
          <li>
            <img src="../assets/tag1.svg" />
          </li>
          <li>
            <img src="../assets/tag2.svg" />
          </li>
          <li>
            <img src="../assets/clock_calender_bg.svg" /> 18:00 - 19:00
          </li>
        </ul>
        <div className="btns">
          <button className="green">Démarrer le cours</button>
          <button className="red">Annuler</button>
        </div>
        <h2 className="username">
          <img src="../assets/Parent.svg" />
          Rafik
        </h2>
      </div>
      <h2 className="date">17 octobre 2022</h2>
      <dialog
        style={{ border: 0, borderRadius: "20px" }}
        id="demCours"
      ></dialog>
    </div>
  );
};

export default CourseCard;
