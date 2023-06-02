/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Commun.css";

const Abonnements = () => {
  let [tab, setTab] = useState("Eleve");
  let [showEtatEn, setShowEtatEn] = useState(false);
  let [showEtat, setShowEtat] = useState(false);
  let [showAddLevel, setShowAddLevel] = useState(false);
  let Navigate = useNavigate();

  const columnsParent = [
    "Parents",
    "Date d’inscription",
    "Email",
    "Téléphone",
    "Diplome",
    "Experience",
    "Note",
    "Etat",
    "Action",
  ];

  const columnsElève = [
    "Elève",
    "Date d’inscription",
    "Email",
    "Téléphone",
    "Diplome",
    "Experience",
    "Note",
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
          <div className="radio_container">
            <label>Professeur</label>
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
          </div>
          <div className="radio_container">
            <label>Au:</label>
            <div className="date_picker_container">
              <input type="date" />
              <img src="../assets/clock_calender.svg" />
            </div>
          </div>
          <div className="radio_container">
            <label>Elève</label>
            <div className="date_picker_container">
              <select>
                <option>Tous</option>
              </select>
            </div>
          </div>
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
          <div className="radio_container">
            <label>Parent</label>
            <div className="date_picker_container">
              <select>
                <option>Tous</option>
              </select>
            </div>
          </div>
          <div className="radio_container">
            <label>Abonnement</label>
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
        </div>
      </div>

      {tab === "Niveaux&Matières" && (
        <div className="admin_sections_header">
          <h2 className="admin_section_title">Emails</h2>
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
                : columnsParent.map((column) => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td onClick={() => Navigate(`/admin/${tab}/edit`)}>
                  {row.professeur}
                </td>
                <td>{row.dateInscription}</td>
                <td>{row.email}</td>
                <td>{row.telephone}</td>
                <td>{row.diplome}</td>
                <td>{row.experience}</td>
                <td className={row.etat}>
                  <div>
                    <button className="btn btn-danger">
                      <img
                        src="../assets/admin_edit.svg"
                        onClick={() => setShowEtatEn(true)}
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
                <td>
                  <button className="btn btn-primary">
                    <img
                      src="../assets/aye.svg"
                      onClick={() => Navigate(`/admin/${tab}/edit`)}
                    />
                  </button>
                  <button className="btn btn-danger">
                    <img src="../assets/admin_delete.svg" />
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

      {showEtatEn && (
        <div className="pop_up_container">
          <div className="pop_up edit etat abonnements">
            <div className="edit_etat">
              <label>
                Abonnement: <span className="grey">#1</span>
              </label>
              <label>
                Professeur: <span className="grey">Guy Hawkins</span>
              </label>
              <label>
                Date: <span className="grey">Lundi 18:00-20:00</span>
              </label>
              <label>
                Etat enregistrement actuel:{" "}
                <span style={{ color: "black" }}>Oui</span>
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
                Abonnement: <span className="grey">#1</span>
              </label>
              <label>
                Professeur: <span className="grey">Guy Hawkins</span>
              </label>
              <label>
                Date: <span className="grey">Lundi 18:00-20:00</span>
              </label>
              <label>
                Etat abonnement actuel: <span className="Validé">Abonné</span>
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
    </div>
  );
};

export default Abonnements;
