/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CancelAbonnmentPopUp from "../CancelAbonnmentPopUP/CancelAbonnmentPopUp";
import { baseURl } from "../../utils/utils";

const AbonnementCard = ({ course, etat, id }) => {
  console.log(etat);
  console.log(course);
  const { userInfo } = useContext(GlobalContext);
  const { role, prenom, nom } = userInfo;
  const { abonnement, createdAt, zoomMeetingJoinUrl } = course;
  console.log(course);

  // get date
  const date = new Date(createdAt);
  const day = date.getDate();
  let month = date.getMonth();
  const year = date.getFullYear();
  const monthes = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Julliet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const formatedMonth = monthes[month];
  const dateFormated = `${day} ${formatedMonth} ${year}`;
  console.log(abonnement);
  console.log(userInfo);
  console.log(role);

  return (
    <div className="cours_card">
      <img className="avatare" src={`${baseURl}${course?.professeur?.imgUrl}`} />
      <div className="info">
        <h4 className="bold">missing from back</h4>
        <h4>{course?.professeur?.diplome}</h4>
        <div
          className="avis"
          style={{
            width: "40%",
            display: "flex",
            alignItems: "space-between",
            marginTop: "10px",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "50%",
            }}
          >
            <img src="../assets/Star.svg" />
            <p
              style={{
                color: "#3E4958",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              4.8
            </p>
          </div>

          <span
            style={{
              color: "#3E4958",

              fontSize: "14px",
            }}
          >
            112 avis
          </span>
        </div>
        <p
          style={{
            color: "#3E4958",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          <span>Expériences</span> : 80 éleves , 50 heures
        </p>
        <ul
          className="tags"
          style={{
            marginTop: "10px",
          }}
        >
          <li>
            <img src="../assets/tag1.svg" />
            missing from backend
          </li>
          <li>
            <img src="../assets/tag2.svg" />
            missing from backend
          </li>
          <li>
            <img src="../assets/clock_calender_bg.svg" />
            {course.day} 18:00 - 19:00
          </li>
        </ul>
        <div className="btns">
          <>
            <button
              style={{
                width: "100%",
              }}
              className="red"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("demCours").showModal();
              }}
            >
              Annuler l`abonnement
            </button>
          </>
        </div>
      </div>
      <h2 className="date">{dateFormated}</h2>
      <dialog style={{ border: 0, borderRadius: "20px" }} id="demCours">
        <CancelAbonnmentPopUp
          startUrl={course.zoomMeetingStartUrl}
          day={course.day}
          text="Etre vous sur d’annluer l’abonnement :"
          info={course}
          id={id}
        />
      </dialog>
    </div>
  );
};

export default AbonnementCard;
