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
                    <svg
                      width="15"
                      height="41"
                      viewBox="0 0 36 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.2072 24.479V28.3239C17.4688 27.7352 15.6083 27.5546 13.7819 27.7973C11.9556 28.04 10.2167 28.6989 8.71128 29.7187C7.20588 30.7385 5.97793 32.0893 5.13055 33.6578C4.28316 35.2263 3.84108 36.9667 3.84143 38.7327L4.96422e-07 38.7309C-0.000595641 36.4844 0.535729 34.2677 1.56788 32.2505C2.60003 30.2332 4.10061 28.4691 5.95464 27.0932C7.80867 25.7173 9.96694 24.7662 12.2641 24.3127C14.5612 23.8593 16.9362 23.9155 19.2072 24.4771V24.479ZM15.3657 22.1757C8.99856 22.1757 3.84143 17.2362 3.84143 11.1376C3.84143 5.03913 8.99856 0.0996094 15.3657 0.0996094C21.7329 0.0996094 26.89 5.03913 26.89 11.1376C26.89 17.2362 21.7329 22.1757 15.3657 22.1757ZM15.3657 18.4963C19.6105 18.4963 23.0486 15.2033 23.0486 11.1376C23.0486 7.07197 19.6105 3.77895 15.3657 3.77895C11.121 3.77895 7.68287 7.07197 7.68287 11.1376C7.68287 15.2033 11.121 18.4963 15.3657 18.4963ZM26.4925 34.8952L33.2822 28.3919L36 30.9932L26.4925 40.0996L19.7008 33.5945L22.4186 30.9932L26.4905 34.8952H26.4925Z"
                        fill="#4DC643"
                      />
                    </svg>
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
