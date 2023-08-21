/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import AbonnementCard from "../Components/AbonnmentCard/AbonnementCard";
import { baseURl } from "../utils/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/TeacherRating.css";
import RatingContainer from "../Components/RatingContainer/RatingContainer";
import "../css/loader.css";

const TeacherRating = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [profId, setProfId] = useState();
  const [rating, setRating] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log(id);

  // get abonnement by id
  const getAbonnement = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURl}/abonnement/${id}`);
      console.log(response);
      const res = await axios.get(
        `${baseURl}/rating/professeur/${response.data.professeur?.id}?page=1&pageSize=10`
      );
      console.log(res);
      setCourse(response.data);
      setRating(res.data.ratings);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getAbonnement();
  }, []);
  return (
    <>
      {loading ? (
        <div
          className="spinner-container"
          style={{
            marginTop: "100px",
          }}
        >
          <div className="loading-spinner"></div>
        </div>
      ) : error ? (
        <p>Error de chargement</p>
      ) : (
        <>
          <div className="rating-container">
            <AbonnementCard course={course} etat="venir" cas="rating" />
            <h1>
              Avis sur {course?.professeur?.user?.nom}{" "}
              {course?.professeur?.user?.prenom}
            </h1>
          </div>
          <div className="rating-cards">
            {rating?.map(
              (rate) =>
                rate.status !== "PENDING" && (
                  <RatingContainer rating={rate} key={rate.id} />
                )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TeacherRating;
