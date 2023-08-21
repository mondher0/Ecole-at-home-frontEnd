/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import AbonnementCard from "../Components/AbonnmentCard/AbonnementCard";
import { baseURl } from "../utils/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/TeacherRating.css";
import RatingContainer from "../Components/RatingContainer/RatingContainer";

const TeacherRating = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  console.log(id);

  // get abonnement by id
  const getAbonnement = async () => {
    try {
      const response = await axios.get(`${baseURl}/abonnement/${id}`);
      console.log(response);
      setCourse(response.data);
      console.log(course);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAbonnement();
  }, []);
  return (
    <>
      <div className="rating-container">
        <AbonnementCard course={course} etat="venir" cas="rating" />
        <h1>
          Avis sur {course?.professeur?.user?.nom}{" "}
          {course?.professeur?.user?.prenom}
        </h1>
      </div>
      <div className="rating-cards">
        <RatingContainer />
        <RatingContainer />
      </div>
    </>
  );
};

export default TeacherRating;
