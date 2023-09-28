/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import EssaieCard from "../Components/EssaieCard/EssaieCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance, { baseURl } from "../utils/utils";
import { GlobalContext } from "../context/GlobalContext";
import { AuthContext } from "../context/AuthContext";

const AbonnmentDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [enfants, setEnfants] = useState([]);
  const [enfant, setEnfant] = useState();
  const [showChooseEnfantPoPup, setShowChooseEnfantPopUp] = useState(false);
  const { userInfo } = useContext(GlobalContext);
  const { parentProfileEntity } = userInfo;
  const { eleveProfile } = userInfo;
  const { isLogged } = useContext(AuthContext);
  const { role } = userInfo;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);

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

  // subscribe in a course of parent
  const handleSubscribeParent = async () => {
    console.log(enfant);
    try {
      if (!isLogged) {
        navigate("/login");
        return;
      }
      const data = {
        enfantId: parseInt(enfant),
      };
      if (parentProfileEntity?.status === "suspendu") {
        navigate("/suspendre-account");
        return;
      }
      setDisabled(true);
      setLoading(true);
      setError(false);
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

      setLoading(false);
      setDisabled(false);
      setShowSuccessPopUp(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      setDisabled(false);
      console.log(error);
    }
  };
  // Subscribe in a course
  const handleSubscribe = async () => {
    console.log(id);
    try {
      if (!isLogged) {
        navigate("/login");
        return;
      }
      if (eleveProfile?.status === "suspendu") {
        navigate("/suspendre-account");
        return;
      }
      if (eleveProfile?.status === "confirme") {
        navigate(`/reserver-coure-essaie/${id}`);
        return;
      }
      setDisabled(true);
      setError(false);
      setLoading(true);
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

      setShowSuccessPopUp(true);
      setLoading(false);
      setDisabled(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setDisabled(false);
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
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <EssaieCard course={course} etat="venir" cas="rating" />
        <button
          style={{
            backgroundColor: "#0078D4",
            color: "white",
            border: "none",
            padding: "20px 20px",
            borderRadius: "25px",
            cursor: "pointer",
            marginTop: "20px",
            width: "511px",
            textAlign: "center",
            fontWeight: "bold",
          }}
          onClick={() => {
            if (role === "student") {
              handleSubscribe();
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
      </div>
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
                handleSubscribeParent();
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
      {showSuccessPopUp && (
        <div className="pop_up_container">
          <div className="pop_up edit etat delete">
            <div className="prof_edit_top">
              <div className="text">
                <h2>Félicitations</h2>
              </div>
            </div>
            <div className="edit_etat delete">
              <p className="delete_text">Vous êtes maintenant abonné !</p>
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
                setShowSuccessPopUp(false);
              }}
            >
              Continuer
            </button>
            <img
              className="hide_btn"
              src="../assets/x.svg"
              onClick={() => {
                setShowSuccessPopUp(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AbonnmentDetailsPage;
