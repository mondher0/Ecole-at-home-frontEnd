/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import TitleCoursPopUp from "../TitleCoursPopPup/TitleCoursPopUp";

const CourseCard = ({ course }) => {
  console.log(course);
  const { userInfo } = useContext(GlobalContext);
  const { role, prenom, nom } = userInfo;
  const { abonnement, createdAt, zoomMeetingJoinUrl } = course;

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

  return (
    <div className="cours_card">
      <img className="avatare" src="../assets/avatare.png" />
      <div className="info">
        <h4 className="bold">
          {nom} {prenom}
        </h4>
        <h4>{role}</h4>
        <ul className="tags">
          <li>
            <img src="../assets/tag1.svg" />
            {abonnement.matiere.name}
          </li>
          <li>
            <img src="../assets/tag2.svg" />
            {abonnement.classe.name}
          </li>
          <li>
            <img src="../assets/clock_calender_bg.svg" />
            {abonnement.day} 18:00 - 19:00
          </li>
        </ul>
        <div className="btns">
          {role === "teacher" ? (
            <button
              className="green"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("demCours").showModal();
              }}
            >
              Démarrer le cours
            </button>
          ) : (
            <a
              href={zoomMeetingJoinUrl}
              className="green"
              target="_blank"
              rel="noreferrer"
            >
              Assiter au cours
            </a>
          )}

          <button className="red">Annuler</button>
        </div>
      </div>
      <h2 className="date">{dateFormated}</h2>
      <dialog style={{ border: 0, borderRadius: "20px" }} id="demCours">
        <TitleCoursPopUp startUrl={course.zoomMeetingStartUrl} id={course.id} />
      </dialog>
    </div>
  );
};

export default CourseCard;
