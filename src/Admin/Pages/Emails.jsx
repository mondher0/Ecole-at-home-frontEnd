// eslint-disable-next-line no-unused-vars
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailsPage = () => {
  const Navigate = useNavigate();
  const columns = [
    "ID",
    "Objet mail",
    "Contenu",
    "Destination",
    "lantence",
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
    // More data objects here
  ];
  return (
    <div className="admin_section">
      <div className="admin_sections_header">
        <h2 className="admin_section_title">Emails</h2>
        <button
          className="cta"
          onClick={() => Navigate("/admin/ajouter-email")}
        >
          <img src="../assets/email_model.svg" />
          <span>Ajouter un modèle</span>
        </button>
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
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.email}</td>
                <td>{row.telephone}</td>
                <td>{row.diplome}</td>
                <td>{row.experience}</td>
                <td>{row.note}</td>
                <td>
                  <button className="btn">
                    <img src="../assets/paper_plane.svg" />
                  </button>
                  <button className="btn">
                    <img
                      src="../assets/admin_edit.svg"
                      onClick={() => Navigate("/admin/email/edit")}
                    />
                  </button>
                  <button className="btn">
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
      </div>
    </div>
  );
};

export default EmailsPage;
