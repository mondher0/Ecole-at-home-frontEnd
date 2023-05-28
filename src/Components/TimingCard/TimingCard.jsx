/* eslint-disable no-unused-vars */
import React from "react";

const TimingCard = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const jours = {
    Monday: "Lundi",
    Tuesday: "Mardi",
    Wednesday: "Mercredi",
    Thursday: "Jeudi",
    Friday: "Vendredi",
    Saturday: "Samedi",
    Sunday: "Dimanche",
  };
  return (
    <div className="time_card">
      <div className="info_section">
        <img className="avatare" src="./assets/avatare.png" />
        <div className="text_section">
          <h3></h3>
          <h4></h4>
          <ul>
            <li>
              <img src="./assets/Star.svg" />
              4.8
            </li>
            <li>112 avis</li>
          </ul>
          <p>
            <span>Expériences</span> : 80 éleves , 50 heures
          </p>
          <ul className="tags">
            <li>
              <img src="./assets/tag1.svg" />
            </li>
            <li>
              <img src="./assets/tag2.svg" />
            </li>
          </ul>
        </div>
      </div>

      <div className="days_section">
        {days.map((day) => (
          <div className="day" key={day}>
            <h5 className="day_name">{jours[day]}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimingCard;
