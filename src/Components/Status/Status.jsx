/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import { baseURl } from "../../utils/utils";
import ProfCard from "./ProfCard";
import RatingContainer from "../RatingContainer/RatingContainer";
import "../../css/loader.css";

const Status = () => {
  const { userInfo } = useContext(GlobalContext);
  const { proffesseurProfile } = userInfo;
  const { id } = proffesseurProfile;
  const [ratings, setRating] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // get prof ratings
  const getProfRatings = async () => {
    try {
      setLoading(true);
      setError(false);
      setIsEmpty(false);
      const response = await axios.get(
        `${baseURl}/rating/professeur/${id}?page=1&pageSize=10`
      );
      console.log(response);
      setRating(response.data?.ratings);
      if (response.data?.ratings.length === 0) {
        setIsEmpty(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getProfRatings();
  }, []);

  return (
    <>
      <ProfCard prof={userInfo} />
      <p
        style={{
          color: "#0078D4",
          fontFamily: "Roboto",
          fontSize: "22px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Tous les avis{" "}
      </p>
      {loading && (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      {error && (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Erreur de chargement
        </h2>
      )}
      {isEmpty && (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Aucun avis
        </h2>
      )}
      {ratings?.map(
        (rate) =>
          rate.status !== "PENDING" && (
            <RatingContainer rating={rate} key={rate.id} />
          )
      )}
    </>
  );
};

export default Status;
