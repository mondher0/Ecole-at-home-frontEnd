/* eslint-disable no-unused-vars */
import React from "react";
import "../css/MesCours.css";
import { useState, useContext } from "react";
import UpComingCourses from "../Components/UpComingCourses/UpComingCourses";
import { GlobalContext } from "../context/GlobalContext";

const MesCours = () => {
  const { userInfo } = useContext(GlobalContext);
  const { prenom, role } = userInfo;
  console.log(userInfo);
  const [sideLinks, setSideLinks] = useState("");
  return (
    <>
      <div className="container">
        <div className="side_nav inside">
          <h3 className="welcome">
            Bonjour, {role?.toUpperCase()} {prenom?.toUpperCase()}
            <div className="berger">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </h3>
          <ul>
            <li
              className={sideLinks === "cours_venir" ? "selected" : ""}
              onClick={() => {
                setSideLinks("cours_venir");
              }}
            >
              <img src="../assets/side_nav01.svg" />
              Cours à venir
            </li>
            <li
              className={sideLinks === "cours_passés" ? "selected" : ""}
              onClick={() => {
                setSideLinks("cours_passés");
              }}
            >
              <img src="../assets/courses.svg" />
              Cours passés
            </li>

            <li
              className={sideLinks === "disponibilités" ? "selected" : ""}
              onClick={() => {
                setSideLinks("disponibilités");
              }}
            >
              <img src="../assets/clock_calender.svg" />
              Disponibilités
            </li>

            <li
              className={sideLinks === "abonnement" ? "selected" : ""}
              onClick={() => {
                setSideLinks("abonnement");
              }}
            >
              <img src="../assets/two_users.svg" />
              Abonnement
            </li>
            <li
              className={sideLinks === "facture" ? "selected" : ""}
              onClick={() => {
                setSideLinks("facture");
              }}
            >
              <img src="../assets/euro.svg" />
              Facture
            </li>
            <li
              className={sideLinks === "paiement" ? "selected" : ""}
              onClick={() => {
                setSideLinks("paiement");
              }}
            >
              <img src="../assets/card.svg" />
              Paiement
            </li>
            <li
              className={sideLinks === "notifications" ? "selected" : ""}
              onClick={() => {
                setSideLinks("notifications");
              }}
            >
              <img src="../assets/bell.svg" />
              Notifications
            </li>
            <li
              className={sideLinks === "parametres" ? "selected" : ""}
              onClick={() => {
                setSideLinks("parametres");
              }}
            >
              <img src="../assets/settings.svg" />
              Parametres
            </li>
          </ul>
        </div>

        <div className="main_section">
          {sideLinks === "cours_venir" ? <UpComingCourses /> : null}
          {sideLinks === "cours_passés" ? <div>cours_passés</div> : null}
          {sideLinks === "disponibilités" ? <div>disponibilités</div> : null}
          {sideLinks === "abonnement" ? <div>abonnement</div> : null}
          {sideLinks === "facture" ? <div>facture</div> : null}
          {sideLinks === "paiement" ? <div>paiementr</div> : null}
          {sideLinks === "notifications" ? <div>notifications</div> : null}
          {sideLinks === "parametres" ? <div>parametresr</div> : null}
        </div>
      </div>
    </>
  );
};

export default MesCours;
