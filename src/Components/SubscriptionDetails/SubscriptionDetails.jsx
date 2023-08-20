/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance, { baseURl } from "../../utils/utils";

const SubscriptionDetails = ({ id }) => {
  const [professeur, setProfesseur] = useState();
  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState();

  // filter the abonnment in the professeur profile
  const filterAbonnement = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseURl}/abonnement/${id}`);
      console.log(res);
      setProfesseur(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  // redirect to stripe
  const redirectToStripe = async () => {
    try {
      const res = await axiosInstance.get(
        `${baseURl}/payment/add-payment-method`
      );
      console.log(res);
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filterAbonnement();
  }, []);
  return (
    <>
      {isLoading ? (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading...
        </h1>
      ) : isError ? (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Error...
        </h1>
      ) : (
        <fieldset className="payment_fs">
          <legend>Détails de l’abonnement</legend>
          <div className="avatar_nextC">
            <img
              className="avatar"
              src={`${baseURl}${professeur?.professeur.imgUrl}`}
            />
            <h3 className="next_cours">
              <img src="../assets/clock_calender.svg" />
              Prochain cours : {professeur?.day} {}
              {professeur?.timing?.start_hour} - {professeur?.timing?.end_hour}
            </h3>
          </div>
          <div className="the_details">
            <div className="text_section left">
              <h3>
                {professeur?.professeur.user.nom}{" "}
                {professeur?.professeur.user.prenom}
              </h3>
              <h4>{professeur?.professeur.diplome}</h4>
              <ul
                style={{
                  marginBottom: "1rem",
                }}
              >
                <li>
                  <img src="../assets/Star.svg" />
                  {professeur?.professeur.note
                    ? professeur?.professeur.note.toFixed(1)
                    : "0.0"}
                </li>
                <li>112 avis</li>
              </ul>
              <p>
                <span>Expériences</span> : 80 éleves , 50 heures
              </p>
              <ul
                className="tags"
                style={{
                  marginBottom: "1rem",
                }}
              >
                <li>
                  <img src="../assets/tag1.svg" />
                  {professeur?.matiere.name}
                </li>
                <li>
                  <img src="../assets/tag2.svg" />
                  {professeur?.matiere.niveau.name}
                </li>
              </ul>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <img src="../assets/clock_calender_bg.svg" />
                <h3 className="the_time">
                  {professeur?.day} {}
                  {professeur?.timing?.start_hour} -{" "}
                  {professeur?.timing?.end_hour}
                </h3>
              </div>
            </div>
            <div className="right text_section">
              <h3>
                Tarif unique <span>14 €/h</span>
              </h3>
              <h3 className="list_title">Comment ca marche:</h3>
              <ul className="text_list">
                <li>
                  Le cours se déroule chaque semaine le <span>même jour</span>{" "}
                  et <span>horaire</span>
                </li>
                <li>
                  <span>Annuler</span> le cours à tout moment sans aucun frais
                </li>
                <li>
                  Le cours est disponible en <span>vidéo</span> à la fin du
                  cours sur tablette, téléphone et ordinateur
                </li>
                <li>Résilier votre abonnement à tout moment</li>
              </ul>
            </div>
          </div>
          <button
            onClick={() => {
              redirectToStripe();
            }}
          >
            Continuer avec stripe
          </button>
        </fieldset>
      )}
    </>
  );
};

export default SubscriptionDetails;
