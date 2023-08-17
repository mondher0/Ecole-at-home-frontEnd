/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import TitleCoursPopUp from "../TitleCoursPopPup/TitleCoursPopUp";
import { baseURl } from "../../utils/utils";

const CourseCard = ({ course, etat }) => {
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
      <img
        className="avatare"
        src={`${baseURl}${abonnement.professeur.imgUrl}`}
      />
      <div className="info">
        <h4 className="bold">
          {nom} {prenom}
        </h4>
        <h4>{abonnement?.professeur?.diplome}</h4>
        <ul
          className="tags"
          style={{
            marginTop: "10px",
          }}
        >
          <li>
            <img src="../assets/tag1.svg" />
            {abonnement.matiere.name}
          </li>
          <li>
            <img src="../assets/tag2.svg" />
            missing from back
          </li>
          <li>
            <img src="../assets/clock_calender_bg.svg" />
            {abonnement.day} {abonnement.timing.start_hour} -{" "}
            {abonnement.timing.end_hour}
          </li>
        </ul>
        <div className="btns">
          {etat === "venir" ? (
            <>
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
            </>
          ) : (
            <button
              className="green"
              style={{
                width: "100%",
              }}
            >
              Voir lenregistrement{" "}
            </button>
          )}
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
