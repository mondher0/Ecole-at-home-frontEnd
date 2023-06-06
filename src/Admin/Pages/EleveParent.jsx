/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const EleveParent = () => {
  let [showProfEtat, setShowProfEtat] = useState(false);
  let [tab, setTab] = useState("Eleve");
  let [showDelete, setShowDelete] = useState(false);
  let Navigate = useNavigate();

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
    "Parent",
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
              ? data.map((row) => (
                  <tr key={row.id}>
                    <td onClick={() => Navigate(`/admin/${tab}/edit`)}>
                      {row.professeur}
                    </td>
                    <td>{row.dateInscription}</td>
                    <td>{row.email}</td>
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
                ))
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
          <li style={{ color: "#38B6FF" }}>Inscrit: 0</li>
          <li style={{ color: "#004AAD" }}>Confirmé: 0</li>
          <li style={{ color: "#4DC643" }}>Validé: 3</li>
          <li style={{ color: "#FF914D" }}>Bloqué: 1</li>
        </ul>
      </div>

      {showProfEtat && (
        <div className="pop_up_container">
          <div className="pop_up edit etat">
            <div className="prof_edit_top">
              <img src="../assets/empty_avatar.png" />
              <div className="text">
                <h2 className="user_name">Patrick Nicholas</h2>
                <span>Ingénieur d’état en génie des procédés</span>
              </div>
            </div>
            <div className="edit_etat">
              <label>
                Etat actuel: <span className="Inscrit">Inscrit</span>
              </label>
              <div className="radio_container">
                <label>Etat à changer:</label>
                <div className="date_picker_container">
                  <select>
                    <option>Inscrit</option>
                    <option>Confirmé</option>
                    <option>Validé</option>
                    <option>Bloqué</option>
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
                <h2 className="user_name">Patrick Nicholas</h2>
                <span>Elève</span>
              </div>
            </div>
            <div className="edit_etat delete">
              <p className="delete_text">
                Etes vous sûr de vouloir supprimer lélève{" "}
                <span>Nicholas Patrick</span>?
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
