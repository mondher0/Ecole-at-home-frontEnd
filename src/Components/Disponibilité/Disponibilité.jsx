/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./Disponibilité.css";
import DisponiblitéForm from "../DisponibilitéForm/DisponiblitéForm";
import axiosInstance, { baseURl } from "../../utils/utils";
import { deleteDispo, editDispo } from "../../assets";
import "../../css/loader.css";
import EditDispoForm from "../EditDispoForm/EditDispoForm";
import EditDispoPopUp from "../EditDispoForm/EditDispoPopUp";

const Disponibilité = () => {
  const [dispos, setDispos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [showedit, setShowedit] = useState("");

  // translate day to french
  function translateDayToFrench(day) {
    const dayTranslations = {
      Monday: "Lundi",
      Tuesday: "Mardi",
      Wednesday: "Mercredi",
      Thursday: "Jeudi",
      Friday: "Vendredi",
      Saturday: "Samedi",
      Sunday: "Dimanche",
    };

    return dayTranslations[day] || "Unknown";
  }

  // get disponibilité
  const getDispos = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/professeurs/connected/abonnement?page=${currentPage}&pageSize=5`
      );
      console.log(response);
      setDispos(response.data.items);
      setPages(response.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  // delete disponibilité
  const deleteDisponibilité = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${baseURl}/abonnement/${id}`
      );
      console.log(response);
      getDispos();
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination handlers
  const goToPreviousPage = () => {
    if (currentPage === pages / currentPage) {
      return;
    }
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getDispos();
  }, [currentPage]);
  return (
    <>
      <div className="dispos_page">
        <h2 className="main_title">Mes disponibilité</h2>
        <button
          className="add_dispo_btn"
          onClick={() => {
            document.getElementById("favDialog").showModal();
          }}
        >
          <img src="../assets/plus_calender.svg" />
          Ajouter disponibilité
        </button>
        <div className="dispos_container">
          <ul className="the_head">
            <li>Etat</li>
            <li>Matière</li>
            <li>Niveau</li>
            <li>Jour de la semaine</li>
            <li>Horaire</li>
            <li>Action</li>
          </ul>
          {loading ? (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            <h2>Une erreur est survenue</h2>
          ) : null}
          {dispos?.map((dispo) => {
            const { day } = dispo;
            const dayInFrench = translateDayToFrench(day);
            return (
              <>
                <ul
                  className="the_head"
                  key={dispo.id}
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <li>{dispo.status}</li>
                  <li>{dispo.matiere.name}</li>
                  <li>{dispo.matiere.niveau.name}</li>
                  <li>{dayInFrench}</li>
                  <li>
                    {dispo.timing.start_hour}-{dispo.timing.end_hour}
                  </li>
                  <li>
                    <img
                      src={editDispo}
                      alt="edit"
                      onClick={() => {
                        setShowedit(dispo.id);
                      }}
                    />
                    <img
                      src={deleteDispo}
                      alt="edit"
                      onClick={() => {
                        deleteDisponibilité(dispo.id);
                      }}
                    />
                  </li>
                </ul>
                {showedit === dispo.id ? (
                  <EditDispoPopUp dispo={dispo} setShowedit={setShowedit} />
                ) : null}
              </>
            );
          })}
          <ul className="the_head">
            <li style={{ justifyContent: "space-around", padding: "5px" }}>
              <button
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                }}
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
              >
                <img src="../assets/prev.svg" />
              </button>
              Page: {currentPage}
              <button
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                }}
                onClick={goToNextPage}
                disabled={currentPage == Math.ceil(pages / 5)}
              >
                <img src="../assets/next.svg" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <dialog style={{ border: 0, borderRadius: "20px" }} id="favDialog">
        <DisponiblitéForm />
      </dialog>
    </>
  );
};

export default Disponibilité;
