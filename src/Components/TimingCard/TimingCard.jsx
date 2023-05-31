/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/utils";

const TimingCard = ({ item }) => {
  const { userInfo } = useContext(GlobalContext);
  const {eleveProfile} = userInfo;
  console.log(item);
  const [timings, setTimings] = useState([]);
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

  //Get Timing
  const baseURl = "http://localhost:9999/api";
  const getTiming = async () => {
    const response = await fetch(`${baseURl}/timing-item`);
    const timingData = await response.json();
    console.log(timingData);
    setTimings(timingData);
  };

  // Subscribe in a course
  const handleSubscribe = async (id) => {
    try {
      if (eleveProfile.status !== "test") {
        const response = await axiosInstance.patch(
          `${baseURl}/abonnement/subscribe-abonnement/student/${id}`
        );
        const data = await response.data;
        console.log(data);
        alert("Vous êtes inscrit dans ce cours");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getTiming();
  }, []);

  return (
    <div className="time_card">
      <div className="info_section">
        <img className="avatare" src="./assets/avatare.png" />
        <div className="text_section">
          <h3>
            {item.user.nom} {item.user.prenom}
          </h3>
          <h4>{item.user.role}</h4>
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
              {item.abonnements[0]?.matiere?.name ?? ""}
            </li>
            <li>
              <img src="./assets/tag2.svg" />
              {item.abonnements[0]?.classe?.name ?? ""}
            </li>
          </ul>
        </div>
      </div>
      <div className="days_section">
        {days.map((day) => (
          <div className="day" key={day}>
            <h5 className="day_name">{jours[day]}</h5>
            {item.abonnements.map((abonnement) =>
              abonnement.day === day ? (
                <div className="time_blocks">
                  {timings.map((timing) =>
                    abonnement.timing.start_hour === timing.start_hour ? (
                      <>
                        <h3 className="the_time" onClick={() => {
                          handleSubscribe(abonnement.id)
                        }} >
                          {abonnement.timing.start_hour}-{" "}
                          {abonnement.timing.end_hour}
                        </h3>
                        <h5 className="places">5places</h5>
                      </>
                    ) : (
                      ""
                    )
                  )}
                </div>
              ) : (
                ""
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimingCard;
