/* eslint-disable no-unused-vars */
import React from "react";
import "../css/boardPage.css";
import PaymentChart from "../Components/PaymentChart";

const BoardPage = () => {
  return (
    <>
      <div className="admin_section">
        <div className="admin_sections_header">
          <h2 className="admin_section_title">Statistiques générales </h2>
          <div className="admin_time_filter">
            <div className="radio_container">
              <input type="radio" name="date_range" value="Semaine" />
              <label htmlFor="date_range">Semaine</label>
            </div>
            <div className="radio_container">
              <input type="radio" name="date_range" value="Mois" />
              <label htmlFor="date_range">Mois</label>
            </div>
            <div className="radio_container">
              <input type="radio" name="date_range" value="Mois" />
              <label htmlFor="date_range">Période</label>
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
        <div className="cards_rows">
          <div className="admin_cards_list">
            <h3 className="list_label">Elève</h3>
            <div className="cards_container">
              <div className="card">
                <div className="text">
                  <h4 className="title">Elèves suspendus</h4>
                  <span className="def">
                    <img src="../assets/down.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img className="card_icon" src="../assets/suspendus.svg" />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Elèves annulés</h4>
                  <span className="def">
                    <img src="../assets/down.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img className="card_icon" src="../assets/annulés.svg" />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Elèves abonnés</h4>
                  <span className="def pos">
                    <img src="../assets/up.svg" />
                    +3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img className="card_icon" src="../assets/Elèves_abonnés.svg" />
              </div>
            </div>
          </div>
          <div className="admin_cards_list">
            <h3 className="list_label">Proffesseur</h3>
            <div className="cards_container">
              <div className="card">
                <div className="text">
                  <h4 className="title">Proffesseur inscrit</h4>
                  <span className="def pos">
                    <img src="../assets/up.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img
                  className="card_icon"
                  src="../assets/Proffesseur_inscrit.svg"
                />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Professeur validé</h4>
                  <span className="def">
                    <img src="../assets/down.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img className="card_icon" src="../assets/validé.svg" />
              </div>
            </div>
          </div>
          <div className="admin_cards_list">
            <h3 className="list_label">Abonnment</h3>
            <div className="cards_container">
              <div className="card">
                <div className="text">
                  <h4 className="title">Abonnements abonnés</h4>
                  <span className="def pos">
                    <img src="../Abonnements_abonnés.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img
                  className="card_icon"
                  src="../assets/Abonnements_abonnés.svg"
                />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Abonnements proposés</h4>
                  <span className="def">
                    <img src="../assets/down.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img
                  className="card_icon"
                  src="../assets/Abonnements_proposés.svg"
                />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Professeur validé</h4>
                  <span className="def">
                    <img src="../assets/down.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img className="card_icon" src="../assets/validé.svg" />
              </div>
            </div>
          </div>
          <div className="admin_cards_list">
            <h3 className="list_label">Cours</h3>
            <div className="cards_container">
              <div className="card">
                <div className="text">
                  <h4 className="title">Cours termminés</h4>
                  <span className="def pos">
                    <img src="../assets/up.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img
                  className="card_icon"
                  src="../assets/Cours_termminés.svg"
                />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Cours annulés</h4>
                  <span className="def">
                    <img src="../assets/down.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img className="card_icon" src="../assets/annulés.svg" />
              </div>
            </div>
          </div>
          <div className="admin_cards_list">
            <h3 className="list_label">Cours</h3>
            <div className="cards_container">
              <div className="card">
                <div className="text">
                  <h4 className="title">Nombre de place</h4>
                  <span className="def pos">
                    <img src="../assets/up.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img className="card_icon" src="../assets/chair_yallow.svg" />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Nombre de place passé un cours</h4>
                  <span className="def">
                    <img src="../assets/down.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">3</h3>
                <img className="card_icon" src="../assets/chair_green.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin_section">
        <div className="admin_sections_header">
          <h2 className="admin_section_title">Statistique de paiement</h2>
        </div>
        <div className="admin_time_filter">
          <div className="radio_container">
            <input type="radio" name="date_range" value="Semaine" />
            <label htmlFor="date_range">Semaine</label>
          </div>
          <div className="radio_container">
            <input type="radio" name="date_range" value="Mois" />
            <label htmlFor="date_range">Mois</label>
          </div>
          <div className="radio_container">
            <input type="radio" name="date_range" value="Mois" />
            <label htmlFor="date_range">Période</label>
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
        <div className="paiment_section">
          <div className="paiment_chart_container">
            <PaymentChart />
            <div className="legends">
              <div className="legend">
                <div style={{ backgroundColor: "#0BA5EC" }}></div>
                <span>Solde globale</span>
              </div>

              <div className="legend">
                <div style={{ backgroundColor: "#28D6D8" }}></div>
                <span>Solde professeurs</span>
              </div>

              <div className="legend">
                <div style={{ backgroundColor: "#7CD4FD" }}></div>
                <span>Solde plateforme</span>
              </div>
            </div>
          </div>
          <div className="paiment_card_illustraion_container">
            <div className="paiment_card_illustraion">
              <div className="top_text">
                <h5>
                  <span>Solde actuel</span>
                  <button type="button" className="add_btn">
                    <img src="../assets/plus.svg" />
                  </button>
                </h5>
                <h2 className="the_value">9784.79 €</h2>
                <img
                  className="the_card_illustraion"
                  src="../assets/IllustrationCard.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardPage;
