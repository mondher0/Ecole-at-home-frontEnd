/* eslint-disable no-unused-vars */
import React from "react";

const SubscriptionDetails = () => {
  return (
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
          <h3>Esther Howard</h3>
          <h4>Ingénieur en informatique</h4>
          <ul>
            <li>
              <img src="../assets/Star.svg" />
              4.8
            </li>
            <li>112 avis</li>
          </ul>
          <p>
            <span>Expériences</span> : 80 éleves , 50 heures
          </p>
          <ul className="tags">
            <li>
              <img src="../assets/tag1.svg" />
              Math
            </li>
            <li>
              <img src="../assets/tag2.svg" />
              Terminal
            </li>
          </ul>
          <h5>
            <img src="../assets/clock_calender_bg.svg" />
            <h3 className="the_time">Lundi 08:00 - 10:00</h3>
          </h5>
        </div>
        <div className="right text_section">
          <h3>
            Tarif unique <span>14 €/h</span>
          </h3>
          <h3 className="list_title">Comment ca marche:</h3>
          <ul className="text_list">
            <li>
              Le cours se déroule chaque semaine le <span>même jour</span> et{" "}
              <span>horaire</span>
            </li>
            <li>
              <span>Annuler</span> le cours à tout moment sans aucun frais
            </li>
            <li>
              Le cours est disponible en <span>vidéo</span> à la fin du cours
              sur tablette, téléphone et ordinateur
            </li>
            <li>Résilier votre abonnement à tout moment</li>
          </ul>
        </div>
      </div>
    </fieldset>
  );
};

export default SubscriptionDetails;
