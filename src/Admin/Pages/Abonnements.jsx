/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Commun.css";
import axiosInstance, { baseURl } from "../../utils/utils";
import axios from "axios";

const Abonnements = () => {
  let [tab, setTab] = useState("Professeurs");
  let [showEtatEn, setShowEtatEn] = useState(false);
  let [showEtat, setShowEtat] = useState(false);
  let [showAddLevel, setShowAddLevel] = useState(false);
  const [showAddMatiere, setShowAddMatiere] = useState(false);
  let [dat, setData] = useState("");
  let [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showDeleteNiveauPopup, setShowDeleteNiveauPopup] = useState(false);
  const [idNiveauMatier, setIdNiveauMatier] = useState("");
  const [abonnementInfo, setAbonnementInfo] = useState();
  const [abonnementInfoParent, setAbonnementInfoParent] = useState();
  const [abonnementInfoEleve, setAbonnementInfoEleve] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [profNom, setProfNom] = useState();
  const [eleveNom, setEleveNom] = useState();
  const [etat, setEtat] = useState();
  const [etat2, setEtat2] = useState();
  const [enregistrementState, setEnregistrementState] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpy, setIsEmpy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [niveaux, setNiveaux] = useState([]);
  const [niveau, setNiveau] = useState("");
  const [levels, setLevels] = useState([]);
  const [matiere, setMatiere] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [niveauId, setNiveauId] = useState("");
  const [currentPageNiveau, setCurrentPageNiveau] = useState(1);
  const [pagesNiveaux, setPagesNiveaux] = useState(1);
  const [levelName, setLevelName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [showEditMatiere, setShowEditMatiere] = useState(false);
  const [niveauMatiereLoading, setNiveauMatiereLoading] = useState(false);
  const [niveauMatiereError, setNiveauMatiereError] = useState(false);
  let Navigate = useNavigate();

  // get levels
  const getLevels = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/niveau`);
      console.log(response);
      setLevels(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get matiers
  const getMatiers = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/matiere`);
      console.log(response);
      setSubjects(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get abonnment info
  const getAbonnementInfo = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/abonnement/admin/search?page=${currentPage}&pageSize=5&${
          etat2 ? `status=${etat2}` : ""
        }${profNom ? `&professeurName=${profNom}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}${
          eleveNom ? `&abonneName=${eleveNom}` : ""
        }
        `
      );
      if (response?.data?.newResults?.length === 0) {
        setIsEmpy(true);
      }
      setAbonnementInfo(response?.data.newResults);
      setPages(response?.data?.count);
      console.log(abonnementInfo);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // get abonnment info parent
  const getAbonnementInfoParent = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/abonnement/admin/search?page=${currentPage}&pageSize=5&${
          etat2 ? `status=${etat2}` : ""
        }${profNom ? `&professeurName=${profNom}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}${
          eleveNom ? `&abonneName=${eleveNom}` : ""
        }
        `
      );
      if (response?.data?.newResults?.length === 0) {
        setIsEmpy(true);
      }
      setAbonnementInfoParent(response?.data.newResults);
      setPages(response?.data?.count);
      console.log(abonnementInfo);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // get abonnment info eleves
  const getAbonnementInfoEleve = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/abonnement/admin/search?page=${currentPage}&pageSize=5&${
          etat2 ? `status=${etat2}` : ""
        }${profNom ? `&professeurName=${profNom}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}${
          eleveNom ? `&abonneName=${eleveNom}` : ""
        }
        `
      );
      if (response?.data?.newResults?.length === 0) {
        setIsEmpy(true);
      }
      setAbonnementInfoEleve(response?.data.newResults);
      setPages(response?.data?.count);
      console.log(abonnementInfo);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // get niveaux et matieres
  const getNiveauxEtMatieres = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axios.get(
        `${baseURl}/niveau/matieres?page=${currentPageNiveau}&pageSize=5&${
          levelName ? `niveau=${levelName}` : ""
        }${subjectName ? `&matiere=${subjectName}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}
        `
      );
      console.log(response);
      setNiveaux(response?.data?.niveaux);
      setPagesNiveaux(response?.data?.count);
      if (response?.data?.length === 0) {
        setIsEmpy(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // edit matiere
  const editMatiere = async (id) => {
    try {
      setNiveauMatiereError(false);
      setNiveauMatiereLoading(true);
      const data = {
        name: matiere,
        niveauId: id.id,
      };
      console.log(data);
      console.log(id);
      const response = await axiosInstance.patch(
        `${baseURl}/matiere/${id.matiereId}`,
        data
      );
      console.log(response);
      setNiveauMatiereLoading(false);
      getNiveauxEtMatieres();
    } catch (error) {
      setNiveauMatiereLoading(false);
      setNiveauMatiereError(true);
      console.log(error);
    }
  };

  // delete niveau matiere
  const deleteNiveauMatiere = async (id) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(`${baseURl}/niveau/${id}`);
      console.log(response);
      getNiveauxEtMatieres();
    } catch (error) {
      console.log(error);
    }
  };

  // change abonnement status
  const changeAbonnementStatus = async (id, status) => {
    try {
      const updateData = {
        status: status,
      };
      const response = await axiosInstance.patch(
        `${baseURl}/abonnement/admin/status/${id}`,
        updateData
      );
      console.log(response);
      getAbonnementInfo();
    } catch (error) {
      console.log(error);
    }
  };

  // delete abonnement
  const deleteAbonnement = async (id) => {
    try {
      const response = await axios.delete(`${baseURl}/abonnement/${id}`);
      console.log(response);
      getAbonnementInfo();
    } catch (error) {
      console.log(error);
    }
  };

  // chagne enregistrement status
  const changeEnregistrementStatus = async (id, enregistrementState) => {
    console.log(enregistrementState);
    try {
      const updateData = {
        enregistrement: enregistrementState === "oui" ? true : false,
      };
      console.log(updateData);
      const response = await axiosInstance.patch(
        `${baseURl}/abonnement/admin/enregistrement/${id}`,
        updateData
      );
      console.log(response);
      getAbonnementInfo();
    } catch (error) {
      console.log(error);
    }
  };

  // add niveau
  const addNiveau = async () => {
    try {
      setNiveauMatiereError(false);
      setNiveauMatiereLoading(true);
      const data = {
        name: niveau,
      };
      const response = await axiosInstance.post(`${baseURl}/niveau`, data);
      console.log(response);
      getNiveauxEtMatieres();
      setShowAddLevel(false);
      setNiveauMatiereLoading(false);
    } catch (error) {
      setNiveauMatiereLoading(false);
      setNiveauMatiereError(true);
      console.log(error);
    }
  };

  // add matiere
  const addMatiere = async () => {
    try {
      setNiveauMatiereError(false);
      setNiveauMatiereLoading(true);
      const data = {
        name: matiere,
        niveauId: niveauId,
      };
      console.log(data);
      const response = await axiosInstance.post(`${baseURl}/matiere`, data);
      console.log(response);
      setNiveauMatiereLoading(false);
      getNiveauxEtMatieres();
    } catch (error) {
      setNiveauMatiereLoading(false);
      setNiveauMatiereError(true);
      console.log(error);
    }
  };

  // Pagination handlers
  const goToPreviousPage = () => {
    if (tab === "Niveaux&Matières") {
      setCurrentPageNiveau((prevPage) => prevPage - 1);
    } else {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    console.log(currentPage);
    if (currentPage === Math.ceil(pages / 5)) {
      return;
    }
    if (tab === "Niveaux&Matières") {
      if (currentPageNiveau === Math.ceil(pagesNiveaux / 5)) {
        return;
      }
      setCurrentPageNiveau((prevPage) => prevPage + 1);
    } else {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (tab === "Niveaux&Matières") {
      getMatiers();
      getNiveauxEtMatieres();
      getLevels();
    }
    if (tab === "Professeurs") {
      getAbonnementInfo();
    }
    if (tab === "Eleve") {
      getAbonnementInfoEleve();
    }
    if (tab === "Parent") {
      getAbonnementInfoParent();
    }
  }, [
    tab,
    startDate,
    endDate,
    eleveNom,
    profNom,
    etat2,
    currentPage,
    currentPageNiveau,
    levelName,
    subjectName,
  ]);

  const columnsParent = [
    "ID",
    "Professeur",
    "Date",
    "Niveau",
    "Matière",
    "Parent",
    "Email Parent",
    "Etat abonnement",
    "Enfant",
    "Email enfant",
  ];

  const columnsProfesseur = [
    "ID",
    "Professeur",
    "Date",
    "Matière",
    "Niveau",
    "Places",
    "ElevesInscrits",
    "Enregistrement",
    "Etat",
    "Action",
  ];

  const columnsElève = [
    "ID",
    "Professeur",
    "Date",
    "Matière",
    "Niveau",
    "Elève",
    "Email",
    "Etat Abonnement",
  ];

  const columnsNiveauMatière = ["Niveau", "Matière", "Date d'ajout", "Action"];
  return (
    <div className="admin_section abonnements">
      <div className="admin_sections_header">
        <h2 className="admin_section_title tabs">
          <span
            className={tab === "Professeurs" ? "active" : ""}
            onClick={() => {
              setTab("Professeurs");
              setCurrentPage(1);
              console.log(tab);
            }}
          >
            Professeurs
          </span>
          <span
            className={tab === "Niveaux&Matières" ? "active" : ""}
            onClick={() => {
              setTab("Niveaux&Matières");
              setCurrentPage(1);
              console.log(tab);
            }}
          >
            Niveaux&Matières
          </span>
          <span
            className={tab === "Eleve" ? "active" : ""}
            onClick={() => {
              setTab("Eleve");
              setCurrentPage(1);
              console.log(tab);
            }}
          >
            Elèves
          </span>
          <span
            className={tab === "Parent" ? "active" : ""}
            onClick={() => {
              setTab("Parent");
              setCurrentPage(1);
              console.log(tab);
            }}
          >
            Parents
          </span>
        </h2>
        <div className="admin_time_filter">
          {tab === "Professeurs" && (
            <div className="radio_container">
              <label>Professeur</label>
              <div className="date_picker_container">
                <input
                  type="text"
                  onChange={(e) => {
                    setProfNom(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          <div className="radio_container">
            <label>Du:</label>
            <div className="date_picker_container">
              <input
                type="date"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setStartDate("");
                    return;
                  }
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
                  if (e.target.value === "") {
                    setEndDate("");
                    return;
                  }
                  const date = e.target.value + "T23:59:59.999Z";
                  setEndDate(date);
                }}
              />
              <img src="../assets/clock_calender.svg" />
            </div>
          </div>
          {tab !== "Niveaux&Matières" && (
            <div className="radio_container">
              <label>Elève</label>
              <div className="date_picker_container">
                <input
                  type="text"
                  onChange={(e) => {
                    setEleveNom(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          {tab === "Niveaux&Matières" && (
            <>
              <div className="radio_container">
                <label>Niveau</label>
                <div className="date_picker_container">
                  <select
                    onChange={(e) => {
                      setLevelName(e.target.value);
                    }}
                  >
                    <option value="">Tous</option>
                    {levels?.map((level) => {
                      return (
                        <option key={level.id} value={level.name}>
                          {level.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="radio_container">
                <label>Matière</label>
                <div className="date_picker_container">
                  <select
                    onChange={(e) => {
                      setSubjectName(e.target.value);
                    }}
                  >
                    <option value="">Tous</option>
                    {subjects?.map((subject) => {
                      return (
                        <option key={subject.id} value={subject.name}>
                          {subject.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </>
          )}
          {tab !== "Niveaux&Matières" && (
            <div className="radio_container">
              <label>Etat</label>
              <div className="date_picker_container">
                <select
                  onChange={(e) => {
                    setEtat2(e.target.value);
                  }}
                >
                  <option>Tous</option>
                  <option value="propose">Propose</option>
                  <option value="valide">Valide</option>
                  <option value="test">Test</option>
                  <option value="teste">Testé</option>
                  <option value="abonne">Abonné</option>
                  <option value="suspendu">Suspendu</option>
                  <option value="disponible">Disponible</option>
                  <option value="resilie">Resilie</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {tab === "Niveaux&Matières" && (
        <div className="admin_sections_header">
          <h2
            className="admin_section_title"
            style={{
              color: " #0078D4",
            }}
          >
            Liste des niveaux/matières à enseigner :
          </h2>
          <button className="cta" onClick={() => setShowAddLevel(true)}>
            <img src="../assets/plus_calender.svg" />
            <span>Ajouter Niveau</span>
          </button>
          <button className="cta" onClick={() => setShowAddMatiere(true)}>
            <img src="../assets/plus_calender.svg" />
            <span>Ajouter Matière</span>
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {tab === "Eleve"
                  ? columnsElève.map((column) => <th key={column}>{column}</th>)
                  : tab === "Parent"
                  ? columnsParent.map((column) => (
                      <th key={column}>{column}</th>
                    ))
                  : tab === "Professeurs"
                  ? columnsProfesseur.map((column) => (
                      <th key={column}>{column}</th>
                    ))
                  : columnsNiveauMatière.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
              </tr>
            </thead>
            <tbody>
              {tab === "Professeurs" &&
                abonnementInfo?.map((abonnement) => {
                  return (
                    <tr key={abonnement.id}>
                      <td onClick={() => Navigate(`/admin/${tab}/edit`)}>
                        {abonnement.id}
                      </td>
                      <td>
                        {abonnement.professeur.user.nom +
                          " " +
                          abonnement.professeur.user.prenom}
                      </td>
                      <td>
                        {abonnement.day +
                          " " +
                          abonnement.timing.start_hour +
                          " - " +
                          abonnement.timing.end_hour}
                      </td>
                      <td>{abonnement.matiere.name}</td>
                      <td>{abonnement.matiere.niveau.name}</td>
                      <td>{abonnement.nbrEleve}</td>
                      <td>
                        {abonnement.abonnes.map((abonne) => {
                          return (
                            <span
                              key={abonne.id}
                              style={{
                                display: "block",
                              }}
                            >
                              {abonne.email}
                            </span>
                          );
                        })}
                      </td>
                      <td className={abonnement.etat}>
                        <div>
                          <button className="btn btn-danger">
                            <img
                              src="../assets/admin_edit.svg"
                              onClick={() =>
                                setShowEtatEn({
                                  id: abonnement.id,
                                  prof:
                                    abonnement.professeur.user.nom +
                                    " " +
                                    abonnement.professeur.user.prenom,
                                  timing:
                                    abonnement?.day +
                                    " " +
                                    abonnement.timing.start_hour +
                                    " - " +
                                    abonnement.timing.end_hour,
                                  etat: abonnement.enregistrement
                                    ? "OUI"
                                    : "NON",
                                })
                              }
                            />
                          </button>
                          <span>
                            {abonnement.enregistrement ? "OUI" : "NON"}
                          </span>
                        </div>
                      </td>
                      <td className={abonnement.status}>
                        <div>
                          <button className="btn btn-danger">
                            <img
                              src="../assets/admin_edit.svg"
                              onClick={() =>
                                setShowEtat({
                                  id: abonnement.id,
                                  prof:
                                    abonnement.professeur.user.nom +
                                    " " +
                                    abonnement.professeur.user.prenom,
                                  etat: abonnement.status,
                                  timing:
                                    abonnement.day +
                                    " " +
                                    abonnement.timing.start_hour +
                                    " - " +
                                    abonnement.timing.end_hour,
                                })
                              }
                            />
                          </button>
                          <span>{abonnement.status}</span>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setShowDeletePopup({
                              id: abonnement.id,
                              prof:
                                abonnement.professeur.user.nom +
                                " " +
                                abonnement.professeur.user.prenom,
                            });
                          }}
                        >
                          <img src="../assets/admin_delete.svg" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {tab === "Niveaux&Matières" &&
                niveaux.map((row) => {
                  const { createdAt } = row;
                  const dateObject = new Date(createdAt);
                  const year = dateObject.getUTCFullYear();
                  const month = dateObject.getUTCMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month.
                  const day = dateObject.getUTCDate();
                  // Format the date as a string in "YYYY-MM-DD" format
                  const formattedDate = `${year}-${month
                    .toString()
                    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                  return row.matieres.length > 0 ? (
                    row.matieres.map((matiere) => {
                      return (
                        <tr key={row.id}>
                          <td>{row.name}</td>
                          <td>{matiere.name}</td>
                          <td>{formattedDate}</td>
                          <td>
                            <button className="btn btn-primary">
                              <img
                                src="../assets/admin_edit.svg"
                                onClick={() =>
                                  setShowEditMatiere({
                                    id: row.id,
                                    matiereId: matiere.id,
                                  })
                                }
                              />
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                console.log(row.id);
                                setShowDeleteNiveauPopup({
                                  id: row.id,
                                });
                              }}
                            >
                              <img src="../assets/admin_delete.svg" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>-</td>
                      <td>{formattedDate}</td>
                      <td>
                        <button className="btn btn-primary">
                          <img
                            src="../assets/admin_edit.svg"
                            onClick={() => setShowEditMatiere(false)}
                          />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            console.log(row.id);
                            setShowDeleteNiveauPopup({
                              id: row.id,
                            });
                          }}
                        >
                          <img src="../assets/admin_delete.svg" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {tab === "Eleve" &&
                abonnementInfoEleve?.map((abonnement) => {
                  return abonnement?.abonnes?.length > 0
                    ? abonnement.abonnes.map((abonne) => {
                        console.log(abonne.role);
                        return (
                          <tr key={abonnement.id}>
                            <td>{abonnement.id}</td>
                            <td>
                              {abonnement.professeur.user.nom +
                                " " +
                                abonnement.professeur.user.prenom}
                            </td>
                            <td>
                              {abonnement.day +
                                " " +
                                abonnement.timing.start_hour +
                                " - " +
                                abonnement.timing.end_hour}
                            </td>
                            <td>{abonnement.matiere.name}</td>
                            <td>{abonnement.matiere.niveau.name}</td>
                            <td>{abonne.nom + " " + abonne.prenom}</td>
                            <td>{abonne.email}</td>
                            <td className={abonnement.status}>
                              <div>
                                <button className="btn btn-danger">
                                  <img
                                    src="../assets/admin_edit.svg"
                                    onClick={() =>
                                      setShowEtat({
                                        id: abonnement.id,
                                        prof:
                                          abonnement.professeur.user.nom +
                                          " " +
                                          abonnement.professeur.user.prenom,
                                        etat: abonnement.status,
                                        timing:
                                          abonnement.day +
                                          " " +
                                          abonnement.timing.start_hour +
                                          " - " +
                                          abonnement.timing.end_hour,
                                      })
                                    }
                                  />
                                </button>
                                <span>{abonnement.status}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : (console.log("hello"),
                      (
                        <>
                          <tr key={abonnement.id}>
                            <td>{abonnement.id}</td>
                            <td>
                              {abonnement.professeur.user.nom +
                                " " +
                                abonnement.professeur.user.prenom}
                            </td>
                            <td>
                              {abonnement.day +
                                " " +
                                abonnement.timing.start_hour +
                                " - " +
                                abonnement.timing.end_hour}
                            </td>
                            <td>{abonnement.matiere.name}</td>
                            <td>{abonnement.matiere.niveau.name}</td>
                            <td>-</td>
                            <td>-</td>
                            <td className={abonnement.status}>
                              <div>
                                <button className="btn btn-danger">
                                  <img
                                    src="../assets/admin_edit.svg"
                                    onClick={() =>
                                      setShowEtat({
                                        id: abonnement.id,
                                        prof:
                                          abonnement.professeur.user.nom +
                                          " " +
                                          abonnement.professeur.user.prenom,
                                        etat: abonnement.status,
                                        timing:
                                          abonnement.abonnement.day +
                                          " " +
                                          abonnement.abonnement.timing
                                            .start_hour +
                                          " - " +
                                          abonnement.abonnement.timing.end_hour,
                                      })
                                    }
                                  />
                                </button>
                                <span>{abonnement.status}</span>
                              </div>
                            </td>
                          </tr>
                        </>
                      ));
                })}
              {tab === "Parent" &&
                abonnementInfoParent?.map((row) => {
                  console.log(row);
                  return (
                    row?.enfants?.length > 0 &&
                    row?.enfants?.map((enfant) => {
                      console.log("helloopoff");
                      return (
                        enfant.deleted === false && (
                          <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>
                              {row?.professeur?.user.nom}{" "}
                              {row?.professeur?.user.prenom}
                            </td>
                            <td>
                              {row.day} {row?.timing?.start_hour}-
                              {row?.timing.end_hour}
                            </td>
                            <td>{row.matiere.niveau.name}</td>
                            <td>{row.matiere.name}</td>
                            <td>
                              {enfant?.parent?.user?.nom}{" "}
                              {enfant?.parent?.user?.prenom}
                            </td>
                            <td>{enfant?.parent?.user?.email}</td>
                            <td className={row.etat}>
                              <div>
                                <button className="btn btn-danger">
                                  <img
                                    src="../assets/admin_edit.svg"
                                    onClick={() =>
                                      setShowEtat({
                                        id: row.id,
                                        prof:
                                          row.professeur.user.nom +
                                          " " +
                                          row.professeur.user.prenom,
                                        etat: row.status,
                                        timing:
                                          row.day +
                                          " " +
                                          row.timing.start_hour +
                                          " - " +
                                          row.timing.end_hour,
                                      })
                                    }
                                  />
                                </button>
                                <span>{row?.status}</span>
                              </div>
                            </td>
                            <td>
                              {enfant?.nom} {enfant?.prenom}
                            </td>
                            <td>{enfant?.email}</td>
                          </tr>
                        )
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
                : tab === "Niveaux&Matières"
                ? "Aucun niveau/matière trouvé"
                : tab === "Eleve"
                ? "Aucun élève trouvé"
                : "Aucun parent trouvé"}
            </h1>
          )}
          {tab === "Niveaux&Matières" ? (
            <div className="table_pagination_bar">
              <div
                className="pagination_btns"
                style={{
                  gap: "10px",
                }}
              >
                <button
                  className="pagination_arrow"
                  disabled={currentPageNiveau === 1}
                  onClick={goToPreviousPage}
                >
                  <img
                    src="../assets/arrow.svg"
                    style={{
                      height: "20px",
                    }}
                  />
                </button>
                <button className="pagination_btn selected">
                  {currentPageNiveau}
                </button>
                <button
                  className="pagination_arrow right"
                  onClick={goToNextPage}
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
          ) : (
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
                <button className="pagination_btn selected">
                  {currentPage}
                </button>
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
          )}
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
      )}

      {showEtatEn && (
        <div className="pop_up_container">
          <div className="pop_up edit etat abonnements">
            <div className="edit_etat">
              <label>
                Abonnement: <span className="grey">{"#" + showEtatEn.id}</span>
              </label>
              <label>
                Professeur: <span className="grey">{showEtatEn.prof}</span>
              </label>
              <label>
                Date: <span className="grey">{showEtatEn.timing}</span>
              </label>
              <label>
                Etat enregistrement actuel:{" "}
                <span style={{ color: "black" }}>{showEtatEn.etat}</span>
              </label>
              <div className="radio_container">
                <label>Etat à changer:</label>
                <div className="date_picker_container">
                  <select
                    onChange={(e) => {
                      console.log(e.target.value);
                      setEnregistrementState(e.target.value);
                    }}
                  >
                    <option value="">Choisir</option>
                    <option value="oui">OUI</option>
                    <option value="non">NON</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              className="btn"
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
                console.log(enregistrementState);
                changeEnregistrementStatus(showEtatEn.id, enregistrementState);
                setShowEtatEn(false);
              }}
            >
              Confirmer
            </button>
            <img
              className="hide_btn"
              onClick={() => setShowEtatEn(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}

      {showEtat && (
        <div className="pop_up_container">
          <div className="pop_up edit etat abonnements">
            <div className="edit_etat">
              <label>
                Professeur: <span className="grey">{showEtat.prof}</span>
              </label>
              <label>
                Date: <span className="grey">{showEtat.timing}</span>
              </label>
              <label>
                Etat abonnement actuel:{" "}
                <span className="Validé">{showEtat.etat}</span>
              </label>
              <div className="radio_container">
                <label>Etat à changer:</label>
                <div className="date_picker_container">
                  <select
                    onChange={(e) => {
                      setEtat(e.target.value);
                    }}
                  >
                    <option>Tous</option>
                    <option value="propose">Propose</option>
                    <option value="valide">Valide</option>
                    <option value="test">Test</option>
                    <option value="teste">Testé</option>
                    <option value="abonne">Abonné</option>
                    <option value="suspendu">Suspendu</option>
                    <option value="disponible">Disponible</option>
                    <option value="resilie">Resilie</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              className="btn"
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
                changeAbonnementStatus(showEtat.id, etat);
                setShowEtat(false);
              }}
            >
              Confirmer
            </button>
            <img
              className="hide_btn"
              onClick={() => setShowEtat(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}

      {showAddLevel && (
        <div className="pop_up_container">
          <div className="pop_up edit etat abonnements">
            <div className="edit_etat">
              <label>Veuillez entrer le niveau à enseigner</label>
              <div className="radio_container">
                <label>Niveau:</label>
                <div className="date_picker_container">
                  <input
                    type={"text"}
                    onChange={(e) => {
                      setNiveau(e.target.value);
                    }}
                  />
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
                addNiveau();
              }}
            >
              {niveauMatiereLoading
                ? "Chargement..."
                : niveauMatiereError
                ? "Erreur"
                : "Ajouter"}
            </button>
            <img
              className="hide_btn"
              onClick={() => setShowAddLevel(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}
      {showAddMatiere && (
        <div className="pop_up_container">
          <div className="pop_up edit etat abonnements">
            <div className="edit_etat">
              <label>Veuillez entrer la matière à enseigner</label>
              <div className="radio_container">
                <label>Niveau:</label>
                <div className="date_picker_container">
                  <select
                    onChange={(e) => {
                      setNiveauId(e.target.value);
                    }}
                  >
                    <option>Tous</option>
                    {levels.map((niveau) => {
                      return (
                        <option key={niveau.id} value={niveau.id}>
                          {niveau.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="radio_container">
                <label>Matière:</label>
                <div className="date_picker_container">
                  <input
                    type={"text"}
                    onChange={(e) => {
                      setMatiere(e.target.value);
                    }}
                  />
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
              onClick={(e) => {
                addMatiere();
                setShowAddMatiere(false);
              }}
            >
              {niveauMatiereLoading
                ? "Chargement..."
                : niveauMatiereError
                ? "Erreur"
                : "Ajouter"}
            </button>
            <img
              className="hide_btn"
              onClick={() => setShowAddMatiere(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}

      {showEditMatiere && (
        <div className="pop_up_container">
          <div className="pop_up edit etat abonnements">
            <div className="edit_etat">
              <label>Veuillez entrer la matière à enseigner</label>
              <div className="radio_container">
                <label>Matière:</label>
                <div className="date_picker_container">
                  <input
                    type={"text"}
                    onChange={(e) => {
                      setMatiere(e.target.value);
                    }}
                  />
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
                editMatiere(showEditMatiere);
                setShowEditMatiere(false);
              }}
            >
              {niveauMatiereLoading
                ? "Chargement..."
                : niveauMatiereError
                ? "Erreur"
                : "Modifier"}
            </button>
            <img
              className="hide_btn"
              onClick={() => setShowEditMatiere(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}
      {showDeleteNiveauPopup && (
        <div className="pop_up_container">
          <div className="pop_up edit etat delete">
            <div className="prof_edit_top">
              <div className="text">
                <h2 className="user_name">{showDeletePopup.prof}</h2>
              </div>
            </div>
            <div className="edit_etat delete">
              <p className="delete_text">
                Etes vous sûr de vouloir supprimer ce niveau?
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
                deleteNiveauMatiere(showDeleteNiveauPopup?.id);
                setShowDeleteNiveauPopup(false);
              }}
            >
              Confirmer
            </button>
            <img
              className="hide_btn"
              onClick={() => setShowDeleteNiveauPopup(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}
      {showDeletePopup && (
        <div className="pop_up_container">
          <div className="pop_up edit etat delete">
            <div className="prof_edit_top">
              <div className="text">
                <h2 className="user_name">{showDeletePopup.prof}</h2>
              </div>
            </div>
            <div className="edit_etat delete">
              <p className="delete_text">
                Etes vous sûr de vouloir supprimer l{"'"}abonnment de{" "}
                <span>{showDeletePopup.prof}</span>?
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
                deleteAbonnement(showDeletePopup.id);
                setShowDeletePopup(false);
              }}
            >
              Confirmer
            </button>
            <img
              className="hide_btn"
              onClick={() => setShowDeletePopup(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Abonnements;
