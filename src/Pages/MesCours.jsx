/* eslint-disable no-unused-vars */
import React from "react";
import "../css/MesCours.css";
import { useState, useContext } from "react";
import UpComingCourses from "../Components/UpComingCourses/UpComingCourses";
import { GlobalContext } from "../context/GlobalContext";
import Notification from "../Components/Notification/Notification";
import Disponibilité from "../Components/Disponibilité/Disponibilité";
import Facture from "../Components/Facture/Facture";
import Settings from "../Components/Settings/Settings";
import Status from "../Components/Status/Status";
import PastCourse from "../Components/PastCourse/PastCourse";
import Abonnement from "../Components/Abonnment/Abonnment";
import AddingCart from "../Components/AddingCart/AddingCart";
import PaymentProf from "../Components/PaymentProf/PaymentProf";
const MesCours = () => {
  const { userInfo } = useContext(GlobalContext);
  const { prenom, role, nom } = userInfo;
  console.log(userInfo);
  const [sideLinks, setSideLinks] = useState("");
  console.log(role);
  return (
    <>
      <div className="container">
        <div className="side_nav inside">
          <h3 className="welcome">
            Bonjour, {role?.toUpperCase()} {prenom?.toUpperCase()}
          </h3>
          <ul>
            <li
              className={sideLinks === "cours_venir" ? "selected" : ""}
              onClick={() => {
                setSideLinks("cours_venir");
              }}
            >
              <img src="../assets/side_nav01.svg" />
              <span> Cours à venir</span>
            </li>
            <li
              className={sideLinks === "cours_passés" ? "selected" : ""}
              onClick={() => {
                setSideLinks("cours_passés");
              }}
            >
              <img src="../assets/courses.svg" />
              <span> Cours passés</span>
            </li>
            {role === "teacher" && (
              <li
                className={sideLinks === "disponibilités" ? "selected" : ""}
                onClick={() => {
                  setSideLinks("disponibilités");
                }}
              >
                <img src="../assets/clock_calender.svg" />
                <span> Disponibilités</span>
              </li>
            )}
            {role === "parent" ||
              (role === "student" && (
                <li
                  className={sideLinks === "abonnement" ? "selected" : ""}
                  onClick={() => {
                    setSideLinks("abonnement");
                  }}
                >
                  <img src="../assets/two_users.svg" />
                  <span> Abonnement</span>
                </li>
              ))}
            {role === "student" ||
              (role === "parent" && (
                <li
                  className={sideLinks === "abonnement" ? "selected" : ""}
                  onClick={() => {
                    setSideLinks("abonnement");
                  }}
                >
                  <img src="../assets/two_users.svg" />
                  <span> Abonnement</span>
                </li>
              ))}
            {role === "parent" ||
              (role === "student" && (
                <li
                  className={sideLinks === "facture" ? "selected" : ""}
                  onClick={() => {
                    setSideLinks("facture");
                  }}
                >
                  <img src="../assets/euro.svg" />
                  <span> Facture</span>
                </li>
              ))}
            {role === "student" ||
              (role === "parent" && (
                <li
                  className={sideLinks === "facture" ? "selected" : ""}
                  onClick={() => {
                    setSideLinks("facture");
                  }}
                >
                  <img src="../assets/euro.svg" />
                  <span> Facture</span>
                </li>
              ))}

            {role === "parent" ||
              (role === "student" && (
                <li
                  className={sideLinks === "paiement" ? "selected" : ""}
                  onClick={() => {
                    setSideLinks("paiement");
                  }}
                >
                  <img src="../assets/card.svg" />
                  <span> Paiement</span>
                </li>
              ))}

            {role === "student" ||
              (role === "parent" && (
                <li
                  className={sideLinks === "paiement" ? "selected" : ""}
                  onClick={() => {
                    setSideLinks("paiement");
                  }}
                >
                  <img src="../assets/card.svg" />
                  <span> Paiement</span>
                </li>
              ))}
            {role === "teacher" && (
              <li
                className={sideLinks === "paiement" ? "selected" : ""}
                onClick={() => {
                  setSideLinks("paiementTeacher");
                }}
              >
                <img src="../assets/card.svg" />
                <span> Paiement</span>
              </li>
            )}
            <li
              className={sideLinks === "notifications" ? "selected" : ""}
              onClick={() => {
                setSideLinks("notifications");
              }}
            >
              <img src="../assets/bell.svg" />
              <span> Notifications</span>
            </li>
            {role === "teacher" && (
              <li
                className={sideLinks === "status" ? "selected" : ""}
                onClick={() => {
                  setSideLinks("status");
                }}
              >
                <img src="../assets/status.svg" />
                <span> Status</span>
              </li>
            )}

            <li
              className={sideLinks === "parametres" ? "selected" : ""}
              onClick={() => {
                setSideLinks("parametres");
              }}
            >
              <img src="../assets/settings.svg" />
              <span> Paramètres</span>
            </li>
          </ul>
        </div>

        <div className="main_section">
          {!sideLinks && (
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1D1D1D",
                marginTop: "2rem",
              }}
            >
              Bienvenue{" "}
              <span
                style={{
                  color: "#FF6B00",
                }}
              >
                {prenom} {nom}
              </span>{" "}
              dans votre espace personnel
            </p>
          )}
          {sideLinks === "cours_venir" ? <UpComingCourses /> : null}
          {sideLinks === "cours_passés" ? <PastCourse /> : null}
          {sideLinks === "disponibilités" ? <Disponibilité /> : null}
          {sideLinks === "abonnement" ? <Abonnement /> : null}
          {sideLinks === "facture" ? <Facture /> : null}
          {sideLinks === "paiement" ? <AddingCart /> : null}
          {sideLinks === "notifications" ? <Notification /> : null}
          {sideLinks === "status" ? <Status /> : null}
          {sideLinks === "parametres" ? <Settings /> : null}
          {sideLinks === "paiementTeacher" ? <PaymentProf /> : null}
        </div>
      </div>
    </>
  );
};

export default MesCours;
