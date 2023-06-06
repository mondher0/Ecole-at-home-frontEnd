/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";

const SubscriptionDetails = ({ id }) => {
  const [professeur, setProfesseur] = useState();
  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // filter the abonnment in the professeur profile
  const filterAbonnement = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://localhost:9999/api/professeurs?page=1&pageSize=10`
      );
      const professeurs = res.data;
      console.log(professeurs);
      professeurs.items.forEach((item) => {
        if (item.abonnements.length > 0) {
          console.log(item);
          console.log(item.user.nom);
          item.abonnements.forEach((abonnement) => {
            if (abonnement.id == id) {
              console.log(abonnement);
              console.log(id);
              console.log(abonnement.id);
              setProfesseur(abonnement);
              setInfo({
                diplome: item.diplome,
                nom: item.user.nom,
                prenom: item.user.nom,
              });
            }
          });
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
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
            <img className="avatar" src="../assets/avatare.png" />
            <h3 className="next_cours">
              <img src="../assets/clock_calender.svg" />
              Prochain cours : Lundi 15 avril 2022
            </h3>
          </div>
          <div className="the_details">
            <div className="text_section left">
              <h3>
                {info?.nom} {info?.prenom}
              </h3>
              <h4>{info?.diplome}</h4>
              <ul
                style={{
                  marginBottom: "1rem",
                }}
              >
                <li>
                  <img src="../assets/Star.svg" />
                  4.8
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
                  {professeur?.matiere?.name}
                </li>
                <li>
                  <img src="../assets/tag2.svg" />
                  {professeur?.classe.nivau?.name}
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
        </fieldset>
      )}
    </>
  );
};

export default SubscriptionDetails;
