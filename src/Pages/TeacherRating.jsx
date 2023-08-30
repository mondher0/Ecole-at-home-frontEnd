/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import AbonnementCard from "../Components/AbonnmentCard/AbonnementCard";
import axiosInstance, { baseURl } from "../utils/utils";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/TeacherRating.css";
import RatingContainer from "../Components/RatingContainer/RatingContainer";
import "../css/loader.css";
import { notColoredStar } from "../assets";
import { AuthContext } from "../context/AuthContext";
import "../css/loader.css";

const TeacherRating = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [profId, setProfId] = useState();
  const [rating, setRating] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [firstNote, setFirstNote] = useState(false);
  const [secondNote, setSecondNote] = useState(false);
  const [thirdNote, setThirdNote] = useState(false);
  const [fourthNote, setFourthNote] = useState(false);
  const [fifthNote, setFifthNote] = useState(false);
  const [note, setNote] = useState(0);
  const [comment, setComment] = useState("");
  const { isLogged } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

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
      setProfId(response.data.professeur?.id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  // send rating
  const sendRating = async (e) => {
    e.preventDefault();
    try {
      if (!isLogged) {
        navigate("/login");
        return;
      }
      setIsError(false);
      setIsLoading(true);
      const data = {
        note: note,
        comment: comment,
        professeurId: profId,
      };
      console.log(data);
      const response = await axiosInstance.post(`${baseURl}/rating`, data);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
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
          <div className="rating-input">
            <form onSubmit={sendRating}>
              <div
                className="input_container"
                style={{
                  borderRadius: "23px",
                  border: "1px solid rgba(45, 57, 76, 0.3)",
                }}
              >
                <input
                  type={"text"}
                  name="email"
                  placeholder="Ajouter un commentaire"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
              <div className="btns">
                <div className="stars">
                  {firstNote ? (
                    <img
                      src="../assets/Star.svg"
                      className="cmnt hover"
                      onClick={() => {
                        setFifthNote(false);
                        setFourthNote(false);
                        setThirdNote(false);
                        setSecondNote(false);
                        setNote(1);
                      }}
                    />
                  ) : (
                    <img
                      src={notColoredStar}
                      className="cmnt hover"
                      onClick={() => {
                        setFirstNote(true);
                        setNote(1);
                      }}
                    />
                  )}
                  {secondNote ? (
                    <img
                      src="../assets/Star.svg"
                      className="cmnt hover"
                      onClick={() => {
                        setFifthNote(false);
                        setFourthNote(false);
                        setThirdNote(false);
                        setNote(2);
                      }}
                    />
                  ) : (
                    <img
                      src={notColoredStar}
                      className="cmnt hover"
                      onClick={() => {
                        setFirstNote(true);
                        setSecondNote(true);
                        setNote(2);
                      }}
                    />
                  )}
                  {thirdNote ? (
                    <img
                      src="../assets/Star.svg"
                      className="cmnt hover"
                      onClick={() => {
                        setFifthNote(false);
                        setFourthNote(false);
                        setNote(3);
                      }}
                    />
                  ) : (
                    <img
                      src={notColoredStar}
                      className="cmnt hover"
                      onClick={() => {
                        setFirstNote(true);
                        setSecondNote(true);
                        setThirdNote(true);
                        setNote(3);
                      }}
                    />
                  )}
                  {fourthNote ? (
                    <img
                      src="../assets/Star.svg"
                      className="cmnt hover"
                      onClick={() => {
                        setFifthNote(false);
                        setNote(4);
                      }}
                    />
                  ) : (
                    <img
                      src={notColoredStar}
                      className="cmnt hover"
                      onClick={() => {
                        setFirstNote(true);
                        setSecondNote(true);
                        setThirdNote(true);
                        setFourthNote(true);
                        setNote(4);
                      }}
                    />
                  )}
                  {fifthNote ? (
                    <img src="../assets/Star.svg" className="cmnt hover" />
                  ) : (
                    <img
                      src={notColoredStar}
                      className="cmnt hover"
                      onClick={() => {
                        setFirstNote(true);
                        setSecondNote(true);
                        setThirdNote(true);
                        setFourthNote(true);
                        setFifthNote(true);
                        setNote(5);
                      }}
                    />
                  )}
                </div>
                <button className="rating_btn">
                  {isLoading ? (
                    <div className="spinner-container">
                      <div className="loading-spinner"></div>
                    </div>
                  ) : isError ? (
                    "Réessayer"
                  ) : (
                    "Envoyer"
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default TeacherRating;
