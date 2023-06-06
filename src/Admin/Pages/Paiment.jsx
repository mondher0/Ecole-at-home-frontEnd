/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Paiment = () => {
  let [tab, setTab] = useState("Eleve");
  let Navigate = useNavigate();

  const columnsParent = [
    "IDPaiment",
    "IDCours",
    "DatePaiement",
    "Parent",
    "EmailParent",
    "EtatParent",
    "Enfant",
    "EmailEnfant",
    "EtatEnfant",
    "Montant",
    "EtatPaiment",
    "Facture",
  ];

  const columnsElève = [
    "IDPaiment",
    "IDCours",
    "DatePaiement",
    "Eleve",
    "EmailEleve",
    "EtatEleve",
    "Montant",
    "EtatPaiment",
    "Facture",
  ];

  const data = [
    {
      idPayment: 1,
      idCours: 1,
      datePaiement: "12-12-2022",
      parent: "Nicholas Patrick",
      emailParent: "mondher@gmail.com",
      etatParent: "Validé",
      enfant: "Nicholas Patrick",
      emailEnfant: "mpndher@gmail.com",
      etatEnfant: "Validé",
      montant: "1000 DT",
      etatPaiement: "Validé",
    },
    {
      idPayment: 1,
      idCours: 1,
      datePaiement: "12-12-2022",
      parent: "Nicholas Patrick",
      emailParent: "mondher@gmail.com",
      etatParent: "Validé",
      enfant: "Nicholas Patrick",
      emailEnfant: "mpndher@gmail.com",
      etatEnfant: "Validé",
      montant: "1000 DT",
      etatPaiement: "Validé",
    },
    {
      idPayment: 1,
      idCours: 1,
      datePaiement: "12-12-2022",
      parent: "Nicholas Patrick",
      emailParent: "mondher@gmail.com",
      etatParent: "Validé",
      enfant: "Nicholas Patrick",
      emailEnfant: "mpndher@gmail.com",
      etatEnfant: "Validé",
      montant: "1000 DT",
      etatPaiement: "Validé",
    },
    {
      idPayment: 1,
      idCours: 1,
      datePaiement: "12-12-2022",
      parent: "Nicholas Patrick",
      emailParent: "mondher@gmail.com",
      etatParent: "Validé",
      enfant: "Nicholas Patrick",
      emailEnfant: "mpndher@gmail.com",
      etatEnfant: "Validé",
      montant: "1000 DT",
      etatPaiement: "Validé",
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
                    <td>{row.idPayment}</td>
                    <td>{row.idCours}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>
                      <button type="button">
                        <img src="../assets/admin_download.svg" />
                      </button>
                    </td>
                  </tr>
                ))
              : data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.idPayment}</td>
                    <td>{row.idCours}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td>{row.datePaiement}</td>
                    <td className={"Validé"}>
                      <div>
                        <span>Oui</span>
                      </div>
                    </td>
                    <td>
                      <button type="button">
                        <img src="../assets/admin_download.svg" />
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
    </div>
  );
};

export default Paiment;
