/* eslint-disable react-hooks/exhaustive-deps */
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
  const { parentProfileEntity } = userInfo;
  const [timings, setTimings] = useState([]);
  const [enfants, setEnfants] = useState();
  const [enfant, setEnfant] = useState();
  const [showEssaiePopUp, setShowEssaiePopUp] = useState();
  const [showChooseEnfantPoPup, setShowChooseEnfantPopUp] = useState(false);
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
      console.log(eleveProfile.status);
      if (eleveProfile?.status === "confirme") {
        setShowEssaiePopUp(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // subscribe in a course of parent
  const handleSubscribeParent = async (id) => {
    setShowChooseEnfantPopUp(false);
    console.log(enfant);
    try {
      if (!isLogged) {
        navigate("/login");
        return;
      }
      const data = {
        enfantId: parseInt(enfant),
      };
      if (parentProfileEntity?.status == "test") {
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
      if (parentProfileEntity?.status === "confirme") {
        setShowEssaiePopUp(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get enfants of the parent
  const getEnfants = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/enfant`);
      console.log(response);
      setEnfants(response.data.enfants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTiming();
    if (role === "parent") {
      getEnfants();
    }
  }, []);

  return (
    <>
      <div className="time_card">
        <div
          className="info_section"
          onClick={() => {
            navigate(`/rating/${id}`);
          }}
        >
          <img
            className="avatare"
            src={`${baseURl}${item.professeur.imgUrl}`}
          />
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
                if (!isLogged) {
                  navigate("/login");
                  return;
                }
                if (role === "student") {
                  handleSubscribe(item.id);
                }
                if (role === "parent") {
                  setShowChooseEnfantPopUp({
                    id: item.id,
                  });
                } else {
                  return;
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
      {showEssaiePopUp && (
        <div className="pop_up_container">
          <div className="pop_up edit etat delete">
            <div className="prof_edit_top">
              <div className="text">
                <h2>Essai gratuit!</h2>
              </div>
            </div>
            <div className="edit_etat delete">
              <p className="delete_text">
                Profitez de 2 heures de cours gratuites
              </p>
            </div>
            <button
              style={{
                backgroundColor: "#0078D4",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "25px",
                cursor: "pointer",
                marginTop: "20px",
                width: "120px",
                textAlign: "center",
              }}
              onClick={() => {
                setShowEssaiePopUp(false);
              }}
            >
              Continuer
            </button>
            <img
              className="hide_btn"
              src="../assets/x.svg"
              onClick={() => {
                setShowEssaiePopUp(false);
              }}
            />
          </div>
        </div>
      )}
      {showChooseEnfantPoPup && (
        <div className="pop_up_container">
          <div className="pop_up edit etat delete">
            <div className="prof_edit_top">
              <div className="text">
                <h2>Choissisier un enfant</h2>
              </div>
            </div>
            <div className="input_container">
              <label htmlFor="Matière">Enfant</label>
              <select
                name="Matière"
                onChange={(e) => {
                  setEnfant(e.target.value);
                }}
              >
                <option value="">Séléctioner un enfant</option>
                {enfants?.map((enfant) => {
                  return (
                    <option key={enfant.id} value={enfant.id}>
                      {enfant.nom} {enfant.prenom}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              style={{
                backgroundColor: "#0078D4",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "25px",
                cursor: "pointer",
                marginTop: "20px",
                width: "120px",
                textAlign: "center",
              }}
              onClick={() => {
                handleSubscribeParent(showChooseEnfantPoPup.id);
              }}
            >
              Continuer
            </button>
            <img
              className="hide_btn"
              src="../assets/x.svg"
              onClick={() => {
                setShowChooseEnfantPopUp(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TimingCard;
