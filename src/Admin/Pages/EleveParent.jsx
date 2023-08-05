/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { baseURl } from "../../utils/utils";

const EleveParent = () => {
  let [showProfEtat, setShowProfEtat] = useState(false);
  let [tab, setTab] = useState("Eleve");
  let [showDelete, setShowDelete] = useState(false);
  const [students, setStudents] = useState();
  const [bloqueCount, setBloqueCount] = useState();
  const [confirmeCount, setConfirmeCount] = useState();
  const [inscritCount, setInscritCount] = useState();
  const [suspenduCount, setSuspenduCount] = useState();
  const [etat, setEtat] = useState("inscrit");
  let Navigate = useNavigate();

  // get student
  const getStudent = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/eleve/admin/search?page=1&pageSize=5`
      );
      console.log(response);
      setStudents(response.data?.items);
      setBloqueCount(response.data?.bloqueCount);
      setConfirmeCount(response.data?.confirmeCount);
      setInscritCount(response.data?.inscritCount);
      setSuspenduCount(response.data?.suspenduCount);
    } catch (error) {
      console.log(error);
    }
  };

  // update status of student
  const updateStatus = async (id, status) => {
    try {
      const data = {
        status: status,
      };
      const response = await axiosInstance.patch(
        `${baseURl}/eleve/admin/status/${id}`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // delete student
  const deleteStudent = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${baseURl}/eleve/admin/${id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (tab === "Eleve") {
      getStudent();
    }
  }, [tab]);

  const columnsParent = [
    "Parents",
    "Date d’inscription",
    "Email",
    "Parent",
    "Etat Parent",
    "Enfant",
    "Email Enfant",
    "Etat Enfant",
    "Action",
  ];

  const columnsElève = [
    "Elève",
    "Date d’inscription",
    "Email",
    "Etat",
    "Action",
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
    <div className="admin_section">
      <div className="admin_sections_header">
        <h2 className="admin_section_title tabs">
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
              <select>
                <option>Tous</option>
              </select>
            </div>
          </div>
          <div className="radio_container">
            <label>Etat</label>
            <div className="date_picker_container">
              <select>
                <option>Tous</option>
              </select>
            </div>
          </div>
          <div className="radio_container">
            <label>Du:</label>
            <div className="date_picker_container">
              <input type="date" />
              <img src="../assets/clock_calender.svg" />
            </div>
            <label>Au:</label>
            <div className="date_picker_container">
              <input type="date" />
              <img src="../assets/clock_calender.svg" />
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
                : columnsParent.map((column) => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {tab === "Eleve"
              ? students?.map((student) => {
                  const { createdAt } = student.user;
                  const dateObject = new Date(createdAt);
                  const year = dateObject.getUTCFullYear();
                  const month = dateObject.getUTCMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month.
                  const day = dateObject.getUTCDate();

                  // Format the date as a string in "YYYY-MM-DD" format
                  const formattedDate = `${year}-${month
                    .toString()
                    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                  return (
                    <tr key={student.id}>
                      <td onClick={() => Navigate(`/admin/${tab}/edit`)}>
                        {student.user.nom} {student.user.prenom}
                      </td>
                      <td>{formattedDate}</td>
                      <td>{student.user.email}</td>
                      <td className="">
                        <div>
                          <button className="btn btn-danger">
                            <img
                              src="../assets/admin_edit.svg"
                              onClick={() =>
                                setShowProfEtat({
                                  id: student.id,
                                  role: student.user.role,
                                  nom: student.user.nom,
                                  prenom: student.user.prenom,
                                  etat: student.status,
                                })
                              }
                            />
                          </button>
                          <span
                            style={{
                              color: "#004AAD",
                            }}
                          >
                            {student.status}
                          </span>
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-primary">
                          <img
                            src="../assets/aye.svg"
                            onClick={() => Navigate(`/admin/${tab}/edit/${student.id}`)}
                          />
                        </button>
                        <button className="btn btn-danger">
                          <img
                            src="../assets/admin_delete.svg"
                            onClick={() => setShowDelete({
                              id: student.id,
                              role: student.user.role,
                              nom: student.user.nom,
                              prenom: student.user.prenom,
                            })}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              : data.map((row) => (
                  <tr key={row.id}>
                    <td onClick={() => Navigate(`/admin/${tab}/edit`)}>
                      {row.professeur}
                    </td>
                    <td>{row.dateInscription}</td>
                    <td>{row.email}</td>
                    <td>{row.note}</td>
                    <td>{row.note}</td>
                    <td>{row.note}</td>
                    <td>{row.note}</td>
                    <td className={row.etat}>
                      <div>
                        <button className="btn btn-danger">
                          <img
                            src="../assets/admin_edit.svg"
                            onClick={() => setShowProfEtat(true)}
                          />
                        </button>
                        <span>{row.etat}</span>
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-primary">
                        <img
                          src="../assets/aye.svg"
                          onClick={() => Navigate(`/admin/${tab}/edit`)}
                        />
                      </button>
                      <button className="btn btn-danger">
                        <img
                          src="../assets/admin_delete.svg"
                          onClick={() => setShowDelete(true)}
                        />
                      </button>
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
          <li style={{ color: "#38B6FF" }}>Inscrit: {inscritCount}</li>
          <li style={{ color: "#004AAD" }}>Confirmé: {confirmeCount}</li>
          <li style={{ color: "#4DC643" }}>Suspendu: {suspenduCount}</li>
          <li style={{ color: "#FF914D" }}>Bloqué: {bloqueCount}</li>
        </ul>
      </div>

      {showProfEtat && (
        <div className="pop_up_container">
          <div className="pop_up edit etat">
            <div className="prof_edit_top">
              <img src="../assets/empty_avatar.png" />
              <div className="text">
                <h2 className="user_name">
                  {showProfEtat.nom} {showProfEtat.prenom}
                </h2>
                <span>{showProfEtat.role}</span>
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
                    <option value="inscrit">Inscrit</option>
                    <option value="confirme">Confirmé</option>
                    <option value="valide">Validé</option>
                    <option value="bloque">Bloqué</option>
                    <option value="suspendu">Suspendu</option>
                    <option value="abonne">Abonné</option>
                    <option value="test">Test</option>
                    <option value="teste">Testé</option>
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
                updateStatus(showProfEtat.id, etat);
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

      {showDelete && (
        <div className="pop_up_container">
          <div className="pop_up edit etat delete">
            <div className="prof_edit_top">
              <div className="img_container">
                <img src="../assets/student.svg" />
              </div>
              <div className="text">
                <h2 className="user_name">{showDelete.nom} {showDelete.prenom}</h2>
                <span>{showDelete.role}</span>
              </div>
            </div>
            <div className="edit_etat delete">
              <p className="delete_text">
                Etes vous sûr de vouloir supprimer lélève{" "}
                <span>{showDelete.nom} {showDelete.prenom}</span>?
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
                deleteStudent(showDelete.id);
                setShowDelete(false);
              }}
            >
              Confirmer
            </button>
            <img
              className="hide_btn"
              onClick={() => setShowDelete(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EleveParent;
