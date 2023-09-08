/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import AbonnementCard from "../Components/AbonnmentCard/AbonnementCard";
import { CloudClick, desc_img01, teacher } from "../assets/index";
import "../css/HowDoesItWork.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance, { baseURl } from "../utils/utils";
import { GlobalContext } from "../context/GlobalContext";

const Reserver = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [enfants, setEnfants] = useState([]);
  const [enfant, setEnfant] = useState();
  const [showEssaiePopUp, setShowEssaiePopUp] = useState(false);
  const [showChooseEnfantPoPup, setShowChooseEnfantPopUp] = useState(false);
  const { userInfo } = useContext(GlobalContext);
  const { role } = userInfo;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  // get abonnement by id
  const getAbonnement = async () => {
    try {
      const response = await axios.get(`${baseURl}/abonnement/${id}`);
      console.log(response);
      setCourse(response.data);
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

  // handle subscribe to cours essai student
  const subscribeToCoursEssaiStudent = async () => {
    try {
      setDisabled(true);
      setError(false);
      setLoading(true);
      const response = await axiosInstance.patch(
        `${baseURl}/abonnement/subscribe-abonnement/student/${id}`
      );
      console.log(response);
      setLoading(false);
      setShowEssaiePopUp(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  // handle subscribe to cours essai parent
  const subscribeToCoursEssaiParent = async () => {
    try {
      setError(false);
      setLoading(true);
      const response = await axiosInstance.patch(
        `${baseURl}/abonnement/subscribe-abonnement/parent/${id}`,
        {
          enfantId: parseInt(enfant),
        }
      );
      console.log(response);
      setLoading(false);
      setShowChooseEnfantPopUp(false);
      setShowEssaiePopUp(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getAbonnement();
    if (role === "parent") {
      getEnfants();
    }
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: "20px",
        }}
      >
        <AbonnementCard course={course} etat="venir" cas="rating" />
        <fieldset
          className="how_does_it_work"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "none",
          }}
        >
          <legend>Comment ca marche ?</legend>
          <div className="steps">
            <div className="step">
              <p>Le cours se déroule chaque semaine le même jour et horaire</p>
              <img src={desc_img01} />
            </div>
            <div className="step">
              <p>Annuler le cours à tout moment sans aucun frais</p>
              <img src={CloudClick} />
            </div>
            <div className="step">
              <p>
                Le cours est disponible en vidéo à la fin du cours sur tablette,
                téléphone et ordinateur
              </p>
              <img src={teacher} />
            </div>
            <div className="step">
              <p>Résilier votre abonnement à tout moment</p>
              <img src={CloudClick} />
            </div>
          </div>
          <button
            style={{
              marginTop: "20px",
            }}
            onClick={() => {
              if (role === "student") {
                subscribeToCoursEssaiStudent();
              } else {
                setShowChooseEnfantPopUp({ id: id });
              }
            }}
          >
            {loading
              ? "Chargement..."
              : error
              ? "Erreur"
              : " Réserver le cours d’essai"}
          </button>
        </fieldset>
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
                navigate("/mes-cours");
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
              disabled={disabled}
              onClick={() => {
                subscribeToCoursEssaiParent();
              }}
            >
              {loading ? "Chargement..." : error ? "Erreur" : "Continuer"}
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

export default Reserver;
