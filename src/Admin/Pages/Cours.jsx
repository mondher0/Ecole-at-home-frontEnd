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
  let Navigate = useNavigate();

  // get cours
  const getCours = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/cours/admin?page=1&pageSize=5&${
          etat ? `status=${etat}` : ""
        }${profName ? `&professeurName=${profName}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}${
          matiere ? `&matiere=${matiere}` : ""
        }${niveau ? `&niveau=${niveau}` : ""}`
      );
      console.log(response);
      setCours(response.data?.newResults);
    } catch (error) {
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

  useEffect(() => {
    getNiveaux();
    getMatieres();
  }, []);

  useEffect(() => {
    getCours();
  }, [tab, etat, startDate, endDate, profName, matiere, niveau]);

  const columnsParent = [
    "ID",
    "Cours",
    "ID Abonnement",
    "Professeur",
    "Date",
    "Matière",
    "Niveau",
    "ID Paiement",
    "Parent",
    "Etat Parent",
    "Elève",
    "Etat élève",
    "Etat Cours",
  ];

  const columnsElève = [
    "ID",
    "Professeur",
    "Date",
    "Matière",
    "Niveau",
    "ID Paiement",
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
    "ID Paiment",
    "Eleve inscrits",
    "Etat",
  ];

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
                    <td></td>
                    <td>
                      {course.abonnement.abonnes?.map((abonne) => (
                        <span key={abonne.id}>{abonne.email}</span>
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
                              <td></td>
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
                            <td></td>
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
              : data.map((row) => (
                  <tr key={row.id}>
                    <td onClick={() => Navigate(`/admin/${tab}/edit`)}>
                      {row.id}
                    </td>
                    <td>{row.professeur}</td>
                    <td>{row.id}</td>
                    <td>{row.telephone}</td>
                    <td>{row.diplome}</td>
                    <td>{row.experience}</td>
                    <td>{row.experience}</td>
                    <td>{row.experience}</td>
                    <td>{row.experience}</td>
                    <td>{row.experience}</td>
                    <td>{row.experience}</td>
                    <td>{row.experience}</td>
                    <td className={"Validé"}>
                      <div>
                        <span>Oui</span>
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
