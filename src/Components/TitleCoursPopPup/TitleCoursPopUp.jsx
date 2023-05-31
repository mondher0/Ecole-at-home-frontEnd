/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./TitleCoursPopUp.css";
import { useState } from "react";
import axiosInstance from "../../utils/utils";

const TitleCoursPopUp = ({ id, startUrl }) => {
  const baseUrl = "http://localhost:9999/api";
  const [title, setTitle] = useState("");

  // Redirct to zoom url
  const redirctToZoomUrl = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosInstance.patch(
        `${baseUrl}/meet?coursId=${id}&title=${title}`,
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
      <div className="pop_up">
        <img
          className="hide_btn"
          src="../assets/x.svg"
          onClick={() => {
            document.getElementById("demCours").close();
          }}
        />

        <form className="dispo_form" onSubmit={redirctToZoomUrl}>
          <h3>Insérer un titre pour votre cours</h3>
          <div className="input_container">
            <label htmlFor="meetTitle">Titre</label>
            <input
              type="text"
              required
              name="meetTitle"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <button className="submit_btn">Envoyer une demande</button>
        </form>
      </div>
    </div>
  );
};

export default TitleCoursPopUp;
