/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../Css/ResponsiveTable.css";
import "../Css/BoardPage.css";
import "../Components/AdminContainer/AdminContainer.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/utils";
import { baseURl } from "../../utils/utils";
import "../../css/loader.css";
import Multiselect from "multiselect-react-dropdown";

const Profeseurs = () => {
  let [showProfInfo, setShowProfInfo] = useState(false);
  let [showProfEtat, setShowProfEtat] = useState(false);
  const [professeurs, setProfesseurs] = useState();
  const [bloqueCount, setBloqueCount] = useState();
  const [confirmeCount, setConfirmeCount] = useState();
  const [inscritCount, setInscritCount] = useState();
  const [valideCount, setValideCount] = useState();
  const [etat, setEtat] = useState();
  const [etat2, setEtat2] = useState();
  const [profNom, setProfNom] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpy, setIsEmpy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  let Navigate = useNavigate();
  const columns = [
    "Professeur",
    "Date d’inscription",
    "Email",
    "Téléphone",
    "Diplome",
    "Etat",
    "Action",
  ];
  const style = {
    width: "300px",
  };

  // get professeurs
  const getPronfesseurs = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/professeurs/admin/search?pageSize=5&page=${currentPage}&${
          etat2 ? `status=${etat2}` : ""
        }${profNom ? `&name=${profNom}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}`
      );
      console.log(response);
      setProfesseurs(response.data?.items);
      setPages(response.data?.totalCount);
      if (response.data?.items.length === 0) {
        setIsEmpy(true);
      }
      setBloqueCount(response.data?.bloqueCount);
      setConfirmeCount(response.data?.confirmeCount);
      setInscritCount(response.data?.inscritCount);
      setValideCount(response.data?.valideCount);
      console.log(response.data.items);
      console.log(professeurs);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // change prof status
  const changeProfStatus = async (id, status) => {
    try {
      const data = {
        status: status,
      };
      const response = await axiosInstance.patch(
        `${baseURl}/professeurs/admin/status/${id}`,
        data
      );
      getPronfesseurs();
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
    getPronfesseurs();
  }, [etat, startDate, endDate, profNom, etat2, currentPage]);

  return (
    <div className="admin_section">
      <div className="admin_sections_header">
        <h2 className="admin_section_title">Professeurs</h2>
        <div className="admin_time_filter">
          <div className="radio_container">
            <label>Professeur</label>
            <div className="date_picker_container">
              <input
                type="text"
                placeholder="Prenom"
                onChange={(e) => {
                  setProfNom(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="radio_container">
            <label>Etat</label>
            <div className="date_picker_container">
              <select
                onChange={(e) => {
                  setEtat2(e.target.value);
                }}
              >
                <option value="">Choisir</option>
                <option value="inscrit">Inscrit</option>
                <option value="confirme">Confirmé</option>
                <option value="valide">Validé</option>
                <option value="bloque">Bloqué</option>
              </select>
            </div>
          </div>
          <div className="radio_container">
            <label>Du:</label>
            <div className="date_picker_container">
              <input
                type="date"
                onChange={(e) => {
                  const date = e.target.value + "T00:00:00.000Z";
                  console.log(date);
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
            {professeurs?.map((prof) => {
              const { createdAt } = prof.user;
              const dateObject = new Date(createdAt);
              const year = dateObject.getUTCFullYear();
              const month = dateObject.getUTCMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month.
              const day = dateObject.getUTCDate();
              // Format the date as a string in "YYYY-MM-DD" format
              const formattedDate = `${year}-${month
                .toString()
                .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
              console.log(prof.id);
              return (
                <tr key={prof.id}>
                  <td
                    onClick={() =>
                      Navigate(`/admin/Profeseurs/edit/${prof?.id}`)
                    }
                  >
                    {prof?.user?.nom} {prof.user.prenom}
                  </td>
                  <td>{formattedDate}</td>
                  <td>{prof.user.email}</td>
                  <td>{prof.phoneNumber}</td>
                  <td>{prof.diplome}</td>
                  <td className="status">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button className="btn btn-danger">
                        <img
                          src="../assets/admin_edit.svg"
                          onClick={() => {
                            setShowProfEtat({
                              id: prof.id,
                              etat: prof.status,
                              nom: prof.user.nom,
                              prenom: prof.user.prenom,
                              diplome: prof.diplome,
                            });
                            console.log(showProfEtat);
                          }}
                        />
                      </button>
                      <span
                        className="status"
                        style={{
                          color: "#004AAD",
                        }}
                      >
                        {prof.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-primary">
                      <img
                        src="../assets/aye.svg"
                        onClick={() => setShowProfInfo(true)}
                      />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        Navigate(`/admin/professeurs/edit/${prof?.id}`);
                      }}
                    >
                      <img src="../assets/entreprise_icon.svg" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isLoading && (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}
        {isError && (
          <h1
            style={{
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            Erreur de chargement
          </h1>
        )}

        {isEmpy && (
          <h1
            style={{
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            Aucun professeur trouvé
          </h1>
        )}
        <div className="table_pagination_bar">
          <div
            className="pagination_btns"
            style={{
              gap: "10px",
            }}
          >
            <button
              className="pagination_arrow"
              disabled={currentPage === 1}
              onClick={goToPreviousPage}
            >
              <img
                src="../assets/arrow.svg"
                style={{
                  height: "20px",
                }}
              />
            </button>
            <button className="pagination_btn selected">{currentPage}</button>
            <button
              className="pagination_arrow right"
              onClick={goToNextPage}
              disabled={currentPage == Math.ceil(pages / 5)}
            >
              <img
                src="../assets/arrow.svg"
                style={{
                  height: "20px",
                }}
              />
            </button>
          </div>
        </div>
        <ul
          className="table_resume_bar"
          style={{
            marginTop: "20px",
          }}
        >
          <li style={{ color: "#0078D4" }}>Professeur:</li>
          <li style={{ color: "#38B6FF" }}>Inscrit: {inscritCount}</li>
          <li style={{ color: "#004AAD" }}>Confirmé: {confirmeCount}</li>
          <li style={{ color: "#4DC643" }}>Validé: {valideCount}</li>
          <li style={{ color: "#FF914D" }}>Bloqué: {bloqueCount}</li>
        </ul>
      </div>

      {showProfInfo && (
        <div className="pop_up_container">
          <div className="pop_up edit">
            <div className="parent_sign_up container professor_sign_up">
              <legend>PProf</legend>
              <form>
                <div
                  className="input_container"
                  style={{
                    height: "fit-content",
                  }}
                >
                  <label htmlFor="Niveau">Niveau</label>
                  <Multiselect
                    options={[]}
                    style={{
                      multiselectContainer: style,
                      searchBox: {
                        border: "none",
                      },
                    }}
                    displayValue="name"
                  />
                </div>
                <div
                  className="input_container"
                  style={{
                    height: "fit-content",
                  }}
                >
                  <label htmlFor="Niveau">Niveau</label>
                  <Multiselect
                    options={[]}
                    style={{
                      multiselectContainer: style,
                      searchBox: {
                        border: "none",
                      },
                    }}
                    displayValue="name"
                  />
                </div>
                <div
                  className="input_container"
                  style={{
                    height: "fit-content",
                  }}
                >
                  <label htmlFor="Niveau">Niveau</label>
                  <Multiselect
                    options={[]}
                    style={{
                      multiselectContainer: style,
                      searchBox: {
                        border: "none",
                      },
                    }}
                    displayValue="name"
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="Matière">Nombre de cours maximum</label>
                  <input type="number" name="Nombre" placeholder="Entrer" />
                </div>
              </form>
            </div>
            <img
              className="hide_btn"
              onClick={() => setShowProfInfo(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}

      {showProfEtat && (
        <div className="pop_up_container">
          <div className="pop_up edit etat">
            <div className="prof_edit_top">
              <img src="../assets/empty_avatar.png" />
              <div className="text">
                <h2 className="user_name">
                  {showProfEtat.nom} {showProfEtat.prenom}
                </h2>
                <span>{showProfEtat.diplome}</span>
              </div>
            </div>
            <div className="edit_etat">
              <label>
                Etat actuel:{" "}
                <span className="Inscrit">{showProfEtat.etat}</span>
              </label>
              <div className="radio_container">
                <label>Etat à changer:</label>
                <div className="date_picker_container">
                  <select
                    onChange={(e) => {
                      setEtat(e.target.value);
                    }}
                  >
                    <option value="">Choisir</option>
                    <option value="inscrit">Inscrit</option>
                    <option value="confirme">Confirmé</option>
                    <option value="valide">Validé</option>
                    <option value="bloque">Bloqué</option>
                  </select>
                </div>
              </div>
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
                console.log(etat);
                changeProfStatus(showProfEtat.id, etat);
                setShowProfEtat(false);
              }}
            >
              Confirmer
            </button>
            <img
              className="hide_btn"
              onClick={() => setShowProfEtat(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profeseurs;
