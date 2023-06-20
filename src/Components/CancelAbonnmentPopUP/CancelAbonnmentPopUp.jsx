/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../TitleCoursPopPup/TitleCoursPopUp.css";
import { useState } from "react";
import axiosInstance from "../../utils/utils";
import { baseURl } from "../../utils/utils";

const CancelAbonnmentPopUp = ({ id, startUrl }) => {
  const [title, setTitle] = useState("");

  // Redirct to zoom url
  const redirctToZoomUrl = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosInstance.patch(
        `${baseURl}/meet?coursId=${id}&title=${title}`,
        {}
      );
      console.log(response);
      window.open(startUrl, "_blank");
      document.getElementById("demCours").close();
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
            Etre vous sur d’annluer le cours :
          </p>
          <p
            style={{
              marginBottom: "20px",
            }}
          >
            Guy Hawkins Math
          </p>
          <p>Lundi 18:00 - 20:00 </p>
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
          >
            Oui
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelAbonnmentPopUp;
