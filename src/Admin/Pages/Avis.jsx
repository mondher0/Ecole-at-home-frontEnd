/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Avis = () => {
  let [showAvis, setShowAvis] = useState(false);
  let Navigate = useNavigate();

  const columns = [
    "Professeur",
    "Parent",
    "Enfant",
    "Commentaire",
    "Date",
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
        <h2 className="admin_section_title">Avis</h2>
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
            {data.map((row) => (
              <tr key={row.id}>
                <td onClick={() => Navigate("/admin/Profeseurs/edit")}>
                  {row.professeur}
                </td>
                <td>{row.dateInscription}</td>
                <td>{row.telephone}</td>
                <td>{row.diplome}</td>
                <td>{row.experience}</td>
                <td>{row.note}</td>
                <td className={row.etat}>
                  {/* <div> */}
                  <button className="btn cta green">Valider</button>
                  <button className="btn cta red">Supprimer</button>
                  <span>{row.etat}</span>
                  {/* </div> */}
                </td>
                <td>
                  <button className="btn btn-primary">
                    <img
                      src="../assets/aye.svg"
                      onClick={() => setShowAvis(true)}
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

      {showAvis && (
        <div className="pop_up_container">
          <div className="pop_up edit etat avis">
            <div className="prof_edit_top avis">
              <img src="../assets/empty_avatar.png" />
              <div className="text">
                <h2 className="user_name">Theresa Webb</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et
                </p>
              </div>
            </div>
            <div className="avis_bottom">
              <div className="rating_starts">
                <img src="../assets/admin_star.svg" />
                <img src="../assets/admin_star.svg" />
                <img src="../assets/admin_star.svg" />
                <img src="../assets/admin_star.svg" />
                <img src="../assets/admin_star.svg" />
              </div>
              <span>il y a 23h</span>
            </div>
            <img
              className="hide_btn"
              onClick={() => setShowAvis(false)}
              src="../assets/x.svg"
              style={{
                marginTop: "0",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Avis;
