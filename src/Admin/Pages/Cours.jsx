/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/PopUp.css";
import axiosInstance, { baseURl } from "../../utils/utils";

const Cours = () => {
  let [tab, setTab] = useState("Professeurs");
  let [showEtat, setShowEtat] = useState(false);
  const [cours, setCours] = useState([]);
  const [etat2, setEtat2] = useState("");
  const [niveaux, setNiveaux] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [niveau, setNiveau] = useState("");
  const [matiere, setMatiere] = useState("");
  const [etat, setEtat] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [profName, setProfName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpy, setIsEmpy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  let Navigate = useNavigate();

  // get cours
  const getCours = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/cours/admin?page=${currentPage}&pageSize=5&${
          etat ? `status=${etat}` : ""
        }${profName ? `&professeurName=${profName}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}${
          matiere ? `&matiere=${matiere}` : ""
        }${niveau ? `&niveau=${niveau}` : ""}`
      );
      console.log(response);
      if (response?.data?.newResults?.length === 0) {
        setIsEmpy(true);
      }
      setCours(response.data?.newResults);
      setPages(response?.data?.count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // get niveaux
  const getNiveaux = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/niveau`);
      console.log(response);
      setNiveaux(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get matières
  const getMatieres = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/matiere`);
      console.log(response);
      setMatieres(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // update cours
  const updateCours = async (id, status) => {
    try {
      const data = {
        status: status,
      };
      const response = await axiosInstance.patch(
        `${baseURl}/cours/admin/status/${id}`,
        data
      );
      console.log(response);
      getCours();
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
    console.log(currentPage);
    if (currentPage === Math.ceil(pages / 5)) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getNiveaux();
    getMatieres();
  }, []);

  useEffect(() => {
    getCours();
  }, [tab, etat, startDate, endDate, profName, matiere, niveau, currentPage]);

  const columnsParent = [
    "ID",
    "ID Abonnement",
    "Professeur",
    "Date",
    "Matière",
    "Niveau",
    "Parent",
    "Elève",
    "Etat Cours",
  ];

  const columnsElève = [
    "ID",
    "Professeur",
    "Date",
    "Matière",
    "Niveau",
    "ID Abonnement",
    "Elève",
    "Email",
    "Etat Cours",
  ];

  const columnsProfesseur = [
    "ID",
    "Professeur",
    "Date",
    "Matière",
    "Niveau",
    "ID Abonnement",
    "Eleve inscrits",
    "Etat",
  ];

  return (
    <div className="admin_section abonnements">
      <div className="admin_sections_header">
        <h2 className="admin_section_title tabs">
          <span
            className={tab === "Professeurs" ? "active" : ""}
            onClick={() => setTab("Professeurs")}
          >
            Professeurs
          </span>
          <span
            className={tab === "Eleve" ? "active" : ""}
            onClick={() => setTab("Eleve")}
          >
            Elèves
          </span>
          <span
            className={tab === "Parent" ? "active" : ""}
            onClick={() => setTab("Parent")}
          >
            Parents
          </span>
        </h2>
        <div className="admin_time_filter">
          <div className="radio_container">
            <label>Professeur</label>
            <div className="date_picker_container">
              <input
                type="text"
                placeholder="Prenom"
                onChange={(e) => {
                  setProfName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="radio_container">
            <label>Du:</label>
            <div className="date_picker_container">
              <input
                type="date"
                onChange={(e) => {
                  const data = e.target.value + "T00:00:00.000Z";
                  setStartDate(data);
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
                  const data = e.target.value + "T23:59:59.999Z";
                  setEndDate(data);
                }}
              />
              <img src="../assets/clock_calender.svg" />
            </div>
          </div>
          <div className="radio_container">
            <label>Niveau</label>
            <div className="date_picker_container">
              <select
                onChange={(e) => {
                  if (e.target.value === "") {
                    setNiveau("");
                    return;
                  }
                  setNiveau(e.target.value);
                }}
              >
                <option value="">Tous</option>
                {niveaux.map((niveau) => (
                  <option key={niveau.id} value={niveau?.name}>
                    {niveau?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="radio_container">
            <label>Matière</label>
            <div className="date_picker_container">
              <select
                onChange={(e) => {
                  if (e.target.value === "") {
                    setMatiere("");
                    return;
                  }
                  setMatiere(e.target.value);
                }}
              >
                <option value="">Tous</option>
                {matieres.map((matiere) => (
                  <option key={matiere.id} value={matiere?.name}>
                    {matiere?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="radio_container">
            <label>Etat</label>
            <div className="date_picker_container">
              <select
                onChange={(e) => {
                  setEtat(e.target.value);
                }}
              >
                <option value="">Tous</option>
                <option value="programme">Programmé</option>
                <option value="annule">Annulé</option>
                <option value="termine">Terminé</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {tab === "Eleve"
                ? columnsElève.map((column) => <th key={column}>{column}</th>)
                : tab === "Parent"
                ? columnsParent.map((column) => <th key={column}>{column}</th>)
                : columnsProfesseur.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {tab === "Professeurs"
              ? cours.map((course) => (
                  <tr key={course.id}>
                    <td onClick={() => Navigate(`/admin/${tab}/edit`)}>
                      {course.id}
                    </td>
                    <td>
                      {course.abonnement.professeur.user.prenom +
                        " " +
                        course.abonnement.professeur.user.nom}
                    </td>
                    <td>
                      {course.abonnement.day}{" "}
                      {course.abonnement.timing.start_hour +
                        "-" +
                        course.abonnement.timing.end_hour}
                    </td>
                    <td>{course.abonnement.matiere.name}</td>
                    <td>{course.abonnement.matiere.niveau.name}</td>
                    <td>{course.abonnement?.id}</td>
                    <td>
                      {course.abonnement.abonnes?.map((abonne) => (
                        <span
                          key={abonne.id}
                          style={{
                            display: "block",
                          }}
                        >
                          {abonne.email}
                        </span>
                      ))}
                    </td>
                    <td className="">
                      <div>
                        <button className="btn btn-danger">
                          <img
                            src="../assets/admin_edit.svg"
                            onClick={() =>
                              setShowEtat({
                                id: course.id,
                                profName:
                                  course.abonnement.professeur.user.prenom +
                                  " " +
                                  course.abonnement.professeur.user.nom,
                                timing:
                                  course.abonnement.timing.start_hour +
                                  "-" +
                                  course.abonnement.timing.end_hour,
                                etat: course.status,
                              })
                            }
                          />
                        </button>
                        <span>{course.status}</span>
                      </div>
                    </td>
                  </tr>
                ))
              : tab === "Eleve"
              ? cours.map((course) => {
                  return course.abonnement?.abonnes?.length > 0
                    ? course.abonnement?.abonnes?.map(
                        (abonne) => (
                          console.log(abonne),
                          (
                            <tr key={course.id}>
                              <td
                                onClick={() => Navigate(`/admin/${tab}/edit`)}
                              >
                                {course.id}
                              </td>
                              <td>
                                {course.abonnement.professeur.user.prenom +
                                  " " +
                                  course.abonnement.professeur.user.nom}
                              </td>
                              <td>
                                {course.abonnement.day}{" "}
                                {course.abonnement.timing.start_hour +
                                  "-" +
                                  course.abonnement.timing.end_hour}
                              </td>
                              <td>{course.abonnement.matiere.name}</td>
                              <td>{course.abonnement.matiere.niveau.name}</td>
                              <td>{course.abonnement.id}</td>
                              <td>{abonne.nom + " " + abonne.prenom}</td>
                              <td>{abonne.email}</td>
                              <td className="">
                                <div>
                                  <button className="btn btn-danger">
                                    <img
                                      src="../assets/admin_edit.svg"
                                      onClick={() =>
                                        setShowEtat({
                                          id: course.id,
                                          profName:
                                            course.abonnement.professeur.user
                                              .prenom +
                                            " " +
                                            course.abonnement.professeur.user
                                              .nom,
                                          timing:
                                            course.abonnement.timing
                                              .start_hour +
                                            "-" +
                                            course.abonnement.timing.end_hour,
                                          etat: course.status,
                                        })
                                      }
                                    />
                                  </button>
                                  <span>{course.status}</span>
                                </div>
                              </td>
                            </tr>
                          )
                        )
                      )
                    : (console.log("no abonne"),
                      (
                        <>
                          <tr key={course.id}>
                            <td onClick={() => Navigate(`/admin/${tab}/edit`)}>
                              {course.id}
                            </td>
                            <td>
                              {course.abonnement.professeur.user.prenom +
                                " " +
                                course.abonnement.professeur.user.nom}
                            </td>
                            <td>
                              {course.abonnement.day}{" "}
                              {course.abonnement.timing.start_hour +
                                "-" +
                                course.abonnement.timing.end_hour}
                            </td>
                            <td>{course.abonnement.matiere.name}</td>
                            <td>{course.abonnement.matiere.niveau.name}</td>
                            <td>{course.abonnement.id}</td>
                            <td>-</td>
                            <td>-</td>
                            <td className="">
                              <div>
                                <button className="btn btn-danger">
                                  <img
                                    src="../assets/admin_edit.svg"
                                    onClick={() =>
                                      setShowEtat({
                                        id: course.id,
                                        profName:
                                          course.abonnement.professeur.user
                                            .prenom +
                                          " " +
                                          course.abonnement.professeur.user.nom,
                                        timing:
                                          course.abonnement.timing.start_hour +
                                          "-" +
                                          course.abonnement.timing.end_hour,
                                        etat: course.status,
                                      })
                                    }
                                  />
                                </button>
                                <span>{course.status}</span>
                              </div>
                            </td>
                          </tr>
                        </>
                      ));
                })
              : cours.map((row) => {
                  return (
                    row?.abonnement?.enfants?.length > 0 &&
                    row?.abonnement?.enfants?.map((enfant) => {
                      console.log("helloopoff");
                      return (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row?.abonnement?.id}</td>
                          <td>
                            {row?.abonnement?.professeur?.user?.nom}{" "}
                            {row?.abonnement?.professeur?.user?.prenom}
                          </td>
                          <td>
                            {row?.abonnement?.day}
                            {row?.abonnement?.timing?.start_hour} -{" "}
                            {row?.abonnement?.timing?.end_hour}
                          </td>
                          <td>{row?.abonnement?.matiere.niveau.name}</td>
                          <td>{row?.abonnement?.matiere.name}</td>
                          <td>
                            {enfant?.parent?.user?.nom}{" "}
                            {enfant?.parent?.user?.prenom}
                          </td>
                          <td>
                            {enfant?.nom} {enfant?.prenom}
                          </td>
                          <td className={row.etat}>
                            <div>
                              <button className="btn btn-danger">
                                <img
                                  src="../assets/admin_edit.svg"
                                  onClick={() =>
                                    setShowEtat({
                                      id: row.id,
                                      profName:
                                        row?.abonnement?.professeur?.user?.nom + " " +
                                        row?.abonnement?.professeur?.user
                                          ?.prenom,
                                      etat: row.status,
                                      timing:
                                        row.abonnement.day +
                                        " " +
                                        row.abonnement?.timing.start_hour +
                                        " - " +
                                        row.abonnement?.timing.end_hour,
                                    })
                                  }
                                />
                              </button>
                              <span>{row?.status}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
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
            {tab === "Professeurs"
              ? "Aucun professeur trouvé"
              : tab === "Eleve"
              ? "Aucun élève trouvé"
              : "Aucun parent trouvé"}
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
              // disabled={pages === 0 ? 1 : Math.ceil(pages / 5)}
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
          <li style={{ color: "#38B6FF" }}>Inscrit: 0</li>
          <li style={{ color: "#004AAD" }}>Confirmé: 0</li>
          <li style={{ color: "#4DC643" }}>Validé: 3</li>
          <li style={{ color: "#FF914D" }}>Bloqué: 1</li>
        </ul>
      </div>

      {showEtat && (
        <div className="pop_up_container">
          <div className="pop_up edit etat">
            <div className="edit_etat center">
              <label>Professeur: {showEtat.profName}</label>
              <label>Date: {showEtat.timing}</label>
              <label>
                Etat cours actuel: <span className="grey">{showEtat.etat}</span>
              </label>
              <div className="radio_container">
                <label>Etat à changer:</label>
                <div className="date_picker_container">
                  <select
                    onChange={(e) => {
                      setEtat2(e.target.value);
                    }}
                  >
                    <option value="programme">Programmé</option>
                    <option value="annule">Annulé</option>
                    <option value="termine">Terminé</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => {
                  updateCours(showEtat.id, etat2);
                  setShowEtat(false);
                }}
              >
                Confirmer
              </button>
            </div>
            <img
              className="hide_btn"
              onClick={() => setShowEtat(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cours;
