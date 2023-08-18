/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../TitleCoursPopPup/TitleCoursPopUp.css";
import { useState } from "react";
import axiosInstance from "../../utils/utils";
import { baseURl } from "../../utils/utils";

const CancelAbonnmentPopUp = ({ day, startUrl, text, info, id }) => {
  const [title, setTitle] = useState("");
  console.log(id);
  console.log(info);
  console.log(day);

  // Cancel abonnement for student
  const cancelAbonnmentStudent = async () => {
    try {
      console.log(info.id);
      const response = await axiosInstance.patch(
        `${baseURl}/eleve/abonnement/cancel/${info.id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Cancel abonnement for enfant
  const cancelAbonnmentEnfant = async () => {
    try {
      console.log(id);
      const data = {
        enfantId: parseInt(id),
      };
      console.log(data);
      const response = await axiosInstance.patch(
        `${baseURl}/parent/abonnement/cancel/${info.id}`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pop_up_container">
      <div
        className="pop_up"
        style={{
          width: "35%",
          height: "33%",
          color: "black",
          fontWeight: "bold",
        }}
      >
        <img
          className="hide_btn"
          src="../assets/x.svg"
          onClick={() => {
            document.getElementById("demCours").close();
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
            justifyContent: "space-around",
            height: "100%",
          }}
        >
          <p
            style={{
              marginBottom: "20px",
            }}
          >
            {text}
          </p>
          <p
            style={{
              marginBottom: "20px",
            }}
          >
          {info.professeur.user.nom} {info.professeur.user.prenom}
          </p>
          <p>
            {day} {info.timing.start_hour}-{info.timing.end_hour}{" "}
          </p>
        </div>
        <div className="btns">
          <button
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
              color: "#0078D4",
            }}
            onClick={() => {
              document.getElementById("demCours").close();
            }}
          >
            Non
          </button>
          <button
            style={{
              backgroundColor: "#0078D4",
              boxShadow: "none",
            }}
            onClick={() => {
              if (!id) {
                cancelAbonnmentStudent();
                document.getElementById("demCours").close();
              }
              if (id) {
                cancelAbonnmentEnfant();
                document.getElementById("demCours").close();
              }
            }}
          >
            Oui
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelAbonnmentPopUp;
