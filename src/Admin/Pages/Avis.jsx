/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/utils";
import { baseURl } from "../../utils/utils";
import { useEffect } from "react";

const Avis = () => {
  let [showAvis, setShowAvis] = useState(false);
  const [avis, setAvis] = useState();
  const [profNom, setProfNom] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  let Navigate = useNavigate();

  const columns = [
    "Professeur",
    "Parent",
    "Commentaire",
    "Date",
    "Note",
    "Etat",
    "Action",
  ];

  // get avis
  const getAvis = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/rating/?page=1&pageSize=5
        ${profNom ? `&professeurName=${profNom}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}`
      );
      console.log(response);
      setAvis(response.data?.ratings);
    } catch (error) {
      console.log(error);
    }
  };

  // change status of avis
  const changeStatus = async (id, status) => {
    try {
      const data = {
        status: status,
      };
      const response = await axiosInstance.patch(
        `${baseURl}/rating/${id}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAvis();
  }, [profNom, startDate, endDate]);
  return (
    <div className="admin_section abonnements">
      <div className="admin_sections_header">
        <h2 className="admin_section_title">Avis</h2>
        <div className="admin_time_filter">
          <div className="radio_container">
            <label>Professeur</label>
            <div className="date_picker_container">
              <input type="text" onChange={(e) => setProfNom(e.target.value)} />
            </div>
          </div>
          <div className="radio_container">
            <label>Du:</label>
            <div className="date_picker_container">
              <input
                type="date"
                onChange={(e) => {
                  const date = e.target.value + "T00:00:00.000Z";
                  setStartDate(date);
                }}
              />
              <img src="../assets/clock_calender.svg" />
            </div>
          </div>
          <div className="radio_container">
            <label>Au:</label>
            <div className="date_picker_container">
              <input
                type="date"
                onChange={(e) => {
                  const date = e.target.value + "T23:59:59.999Z";
                  setEndDate(date);
                }}
              />
              <img src="../assets/clock_calender.svg" />
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {avis?.map((avi) => {
              const { createdAt } = avi;
              const dateObject = new Date(createdAt);
              const year = dateObject.getUTCFullYear();
              const month = dateObject.getUTCMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month.
              const day = dateObject.getUTCDate();

              // Format the date as a string in "YYYY-MM-DD" format
              const formattedDate = `${year}-${month
                .toString()
                .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
              return (
                <tr key={avi.id}>
                  <td onClick={() => Navigate("/admin/Profeseurs/edit")}>
                    {avi.professeur.user.nom} {avi.professeur.user.prenom}
                  </td>
                  <td>
                    {avi.user.nom} {avi.user.prenom}
                  </td>
                  <td>{avi.comment}</td>
                  <td>{formattedDate}</td>
                  <td>{avi.note}</td>
                  <td className={avi.etat}>
                    {avi?.status === "PENDING" ? (
                      <>
                        <button
                          className="btn cta green"
                          onClick={() => {
                            changeStatus(avi.id, "VALIDE");
                          }}
                        >
                          Valider
                        </button>
                        <button
                          className="btn cta red"
                          onClick={() => {
                            changeStatus(avi.id, "SUPPRIME");
                          }}
                        >
                          Supprimer
                        </button>
                      </>
                    ) : null}
                    {avi?.status !== "PENDING" && <span>{avi.status}</span>}
                  </td>
                  <td>
                    <button className="btn btn-primary">
                      <img
                        src="../assets/aye.svg"
                        onClick={() =>
                          setShowAvis({
                            note: avi.note,
                            comment: avi.comment,
                            nom : avi.user.nom,
                            prenom : avi.user.prenom,
                          })
                        }
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="table_pagination_bar">
          <div className="pagination_btns">
            <button className="pagination_arrow">
              <img src="../assets/arrow.svg" />
            </button>
            <button className="pagination_btn selected">1</button>
            <button className="pagination_btn">2</button>
            <button className="pagination_btn">3</button>
            <button className="pagination_arrow right">
              <img src="../assets/arrow.svg" />
            </button>
          </div>
        </div>
      </div>

      {showAvis && (
        <div className="pop_up_container">
          <div className="pop_up edit etat avis">
            <div className="prof_edit_top avis">
              <img src="../assets/empty_avatar.png" />
              <div className="text">
                <h2 className="user_name">{showAvis.nom} {showAvis.prenom}</h2>
                <p>{showAvis.comment}</p>
              </div>
            </div>
            <div className="avis_bottom">
              <div className="rating_starts">
                {[...Array(showAvis.note)].map((index) => {
                  return <img src="../assets/admin_star.svg" key={index} />;
                })}
              </div>
            </div>
            <img
              className="hide_btn"
              onClick={() => setShowAvis(false)}
              src="../assets/x.svg"
              style={{
                marginTop: "0",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Avis;
