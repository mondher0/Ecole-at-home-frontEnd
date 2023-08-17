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
  let [dat, setData] = useState("");
  let [showDeletePopup, setShowDeletePopup] = useState(false);
  const [idNiveauMatier, setIdNiveauMatier] = useState("");
  const [abonnementInfo, setAbonnementInfo] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [profNom, setProfNom] = useState();
  const [eleveNom, setEleveNom] = useState();
  const [etat, setEtat] = useState();
  const [etat2, setEtat2] = useState();
  const [enregistrementState, setEnregistrementState] = useState();
  let Navigate = useNavigate();

  // get abonnment info
  const getAbonnementInfo = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/abonnement/admin/search?page=1&pageSize=5&${
          etat2 ? `status=${etat2}` : ""
        }${profNom ? `&professeurName=${profNom}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}${
          eleveNom ? `&abonneName=${eleveNom}` : ""
        }
        `
      );
      setAbonnementInfo(response?.data.newResults);
      console.log(abonnementInfo);
      console.log(response);
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
  useEffect(() => {
    getAbonnementInfo();
  }, [tab, startDate, endDate, eleveNom, profNom, etat2]);

  const columnsParent = [
    "ID",
    "Professeur",
    "Date",
    "Niveau",
    "Matière",
    "Parent",
    "Email Parent",
    "Etat abonnement",
    "Etat parent",
    "Enfant",
    "Email enfant",
    "Etat enfant",
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

  const data = [
    {
      id: 1,
      professeur: "Nicholas Patrick",
      dateInscription: "12-12-2022",
      email: "nicholask@gmail.com",
      telephone: "123-456-7890",
      diplome: "Bachelor of Science",
      experience: "5 years",
      note: "A",
      etat: "Bloqué",
    },
    {
      id: 2,
      professeur: "Nicholas Patrick",
      dateInscription: "12-12-2022",
      email: "nicholask@gmail.com",
      telephone: "123-456-7890",
      diplome: "Bachelor of Science",
      experience: "5 years",
      note: "A",
      etat: "Validé",
    },
    {
      id: 3,
      professeur: "Nicholas Patrick",
      dateInscription: "12-12-2022",
      email: "nicholask@gmail.com",
      telephone: "123-456-7890",
      diplome: "Bachelor of Science",
      experience: "5 years",
      note: "A",
      etat: "Inscrit",
    },
    {
      id: 4,
      professeur: "Nicholas Patrick",
      dateInscription: "12-12-2022",
      email: "nicholask@gmail.com",
      telephone: "123-456-7890",
      diplome: "Bachelor of Science",
      experience: "5 years",
      note: "A",
      etat: "Confirmé",
    },
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
            className={tab === "Niveaux&Matières" ? "active" : ""}
            onClick={() => setTab("Niveaux&Matières")}
          >
            Niveaux&Matières
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
          {tab === "Niveaux&Matières" && (
            <>
              <div className="radio_container">
                <label>Niveau</label>
                <div className="date_picker_container">
                  <select>
                    <option>Tous</option>
                  </select>
                </div>
              </div>
              <div className="radio_container">
                <label>Matière</label>
                <div className="date_picker_container">
                  <select>
                    <option>Tous</option>
                  </select>
                </div>
              </div>
            </>
          )}
          {tab === "Parent" && (
            <div className="radio_container">
              <label>Parent</label>
              <div className="date_picker_container">
                <select>
                  <option>Tous</option>
                </select>
              </div>
            </div>
          )}
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
            <span>Ajouter Niveaux&Matières</span>
          </button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {tab === "Eleve"
                ? columnsElève.map((column) => <th key={column}>{column}</th>)
                : tab === "Parent"
                ? columnsParent.map((column) => <th key={column}>{column}</th>)
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
            {tab === "Professeurs"
              ? abonnementInfo?.map((abonnement) => {
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
                          return <span key={abonne.id}>{abonne.email}</span>;
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
                })
              : tab === "Niveaux&Matières"
              ? data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.dateInscription}</td>
                    <td>{row.email}</td>
                    <td>{row.email}</td>
                    <td>
                      <button className="btn btn-primary">
                        <img
                          src="../assets/admin_edit.svg"
                          onClick={() => setShowAddLevel(true)}
                        />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setShowDeletePopup(true);
                          setIdNiveauMatier(row.id);
                        }}
                      >
                        <img src="../assets/admin_delete.svg" />
                      </button>
                    </td>
                  </tr>
                ))
              : tab === "Eleve"
              ? abonnementInfo.map((abonnement) => {
                  return abonnement?.abonnes?.length > 0
                    ? abonnement.abonnes.map((abonne) => {
                        console.log(abonne);
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
                })
              : data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.professeur}</td>
                    <td>Lundi 18:00 - 20:00 </td>
                    <td>Physique</td>
                    <td>Terminal</td>
                    <td>{row.professeur}</td>
                    <td>{row.email}</td>
                    <td className={row.etat}>
                      <div>
                        <button className="btn btn-danger">
                          <img
                            src="../assets/admin_edit.svg"
                            onClick={() => setShowEtat(true)}
                          />
                        </button>
                        <span>{row.etat}</span>
                      </div>
                    </td>
                    <td className={row.etat}>
                      <div>
                        <button className="btn btn-danger">
                          <img
                            src="../assets/admin_edit.svg"
                            onClick={() => setShowEtat(true)}
                          />
                        </button>
                        <span>{row.etat}</span>
                      </div>
                    </td>
                    <td>{row.professeur}</td>
                    <td>{row.email}</td>
                    <td className={row.etat}>
                      <div>
                        <button className="btn btn-danger">
                          <img
                            src="../assets/admin_edit.svg"
                            onClick={() => {
                              setShowEtat(true);
                              setData("mondehr");
                            }}
                          />
                        </button>
                        <span>{row.etat}</span>
                      </div>
                    </td>
                  </tr>
                ))}
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
              <label>Veuillez entrer le niveau et la matière à enseigner</label>
              <div className="radio_container">
                <label>Niveau:</label>
                <div className="date_picker_container">
                  <input type={"text"} />
                </div>
              </div>
              <div className="radio_container">
                <label>Matière:</label>
                <div className="date_picker_container">
                  <input type={"text"} />
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
            >
              Ajouter
            </button>
            <img
              className="hide_btn"
              onClick={() => setShowAddLevel(false)}
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
