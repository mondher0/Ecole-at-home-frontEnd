/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import TitleCoursPopUp from "../TitleCoursPopPup/TitleCoursPopUp";
import axiosInstance, { baseURl } from "../../utils/utils";

const CourseCard = ({ course, etat, rol, zoomMeetingJoinUrl }) => {
  console.log(etat);
  console.log(course);
  const { userInfo } = useContext(GlobalContext);
  const { role, prenom, nom } = userInfo;
  const { abonnement, createdAt } = course;
  const [url, setUrl] = useState();
  const [vemeoUrl, setVemeoUrl] = useState();
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
  // cancel course
  const cancelCourse = async () => {
    try {
      const response = await axiosInstance.patch(
        `${baseURl}/cours/cancel/${course.id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // get zoom meeting start url
  const getZoomMeetingStartUrl = async (id) => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/cours/assister/${id}`
      );
      console.log(response);
      setUrl(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  // get vemeo video url
  const getVimeoVideoUrl = async (id) => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/cours/voir-enregistrement/${id}`
      );
      console.log(response);
      setVemeoUrl(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (etat === "venir") {
      getZoomMeetingStartUrl(course.id);
    }
    if (etat !== "venir") {
      getVimeoVideoUrl(course.id);
    }
  }, []);

  return (
    <div className="cours_card">
      <img className="avatare" src={`${abonnement.professeur.imgUrl}`} />
      <div className="info">
        <h4 className="bold">
          {abonnement.professeur.user.nom} {abonnement.professeur.user.prenom}
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
            {abonnement.matiere?.niveau?.name}
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
                <a
                  href={url}
                  className="green"
                  target="_blank"
                  rel="noreferrer"
                >
                  Démarrer le cours
                </a>
              ) : (
                <a
                  href={url}
                  className="green"
                  target="_blank"
                  rel="noreferrer"
                >
                  Assiter au cours
                </a>
              )}
              {rol === "teacher" && (
                <button
                  className="red"
                  onClick={() => {
                    cancelCourse();
                  }}
                >
                  Annuler
                </button>
              )}
            </>
          ) : (
            <a
              className="green"
              href={vemeoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Voir l{"'"}enregistrement
            </a>
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
