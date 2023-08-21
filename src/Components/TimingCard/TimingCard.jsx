/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { baseURl } from "../../utils/utils";

const TimingCard = ({ item }) => {
  const navigate = useNavigate();
  const { id } = item;
  const { userInfo } = useContext(GlobalContext);
  const { role } = userInfo;
  const { isLogged } = useContext(AuthContext);
  const { eleveProfile } = userInfo;
  const { parentProfile } = userInfo;
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
  const getTiming = async () => {
    const response = await fetch(`${baseURl}/timing-item`);
    const timingData = await response.json();
    setTimings(timingData);
  };

  // Subscribe in a course
  const handleSubscribe = async (id) => {
    try {
      if (!isLogged) {
        navigate("/login");
        return;
      }
      if (eleveProfile?.status === "test") {
        const res = await axiosInstance.get(
          `${baseURl}/payment/get-payment-methods`
        );
        console.log(res);
        if (res.data.data?.length === 0) {
          navigate(`/payment/${id}`);
          return;
        }
      }
      const response = await axiosInstance.patch(
        `${baseURl}/abonnement/subscribe-abonnement/student/${id}`
      );
      console.log(response);
      alert("Vous êtes inscrit dans ce cours");
    } catch (error) {
      console.log(error);
    }
  };

  // subscribe in a course of parent
  const handleSubscribeParent = async (id) => {
    try {
      if (!isLogged) {
        navigate("/login");
        return;
      }
      const data = {
        enfantId: 12,
      };
      if (parentProfile?.status == "test") {
        const res = await axiosInstance.get(
          `${baseURl}/payment/get-payment-methods`
        );
        console.log(res);
        if (res.data.data?.length === 0) {
          navigate(`/payment/${id}`);
          return;
        }
      }
      const response = await axiosInstance.patch(
        `${baseURl}/abonnement/subscribe-abonnement/parent/${id}`,
        data
      );
      console.log(response);
      alert("Vous êtes inscrit dans ce cours");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTiming();
  }, []);

  return (
    <div className="time_card">
      <div
        className="info_section"
        onClick={() => {
          navigate(`/rating/${id}`);
        }}
      >
        <img className="avatare" src={`${baseURl}${item.professeur.imgUrl}`} />
        <div className="text_section">
          <h3>
            {item.professeur.user.nom} {item.professeur.user.prenom}
          </h3>
          <h4>{item.professeur.diplome}</h4>
          <ul>
            <li>
              <img src="./assets/Star.svg" />
              {item.professeur.note ? item.professeur.note.toFixed(1) : "0.0"}
            </li>
          </ul>
          <ul className="tags">
            <li>
              <img src="./assets/tag1.svg" />
              {item?.matiere?.name ?? ""}
            </li>
            <li>
              <img src="./assets/tag2.svg" />
              {item.matiere.niveau.name ?? ""}
            </li>
          </ul>
        </div>
      </div>
      <div className="days_section">
        <div className="day">
          <h5 className="day_name">{item.day}</h5>
          <div
            className="time_blocks"
            onClick={() => {
              if (role === "student") {
                handleSubscribe(item.id);
              } else {
                handleSubscribeParent(item.id);
              }
            }}
          >
            <>
              <h3 className="the_time">
                {item.timing.start_hour} - {item.timing.end_hour}
              </h3>
              <h5 className="places">{item.nbrEleve}places</h5>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimingCard;
