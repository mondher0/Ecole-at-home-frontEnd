/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../css/boardPage.css";
import PaymentChart from "../Components/PaymentChart";
import axiosInstance, { baseURl } from "../../utils/utils";
import "../../css/loader.css";
import {
  Abonnements_proposés,
  Cours_termminés,
  Elèves_abonnés,
  abonnementAbonne,
  anuuler,
  validé,
} from "../../assets";

const BoardPage = () => {
  const [startDate, setStartDate] = useState("2023-07-07T00:00:00.000Z");
  const [endDate, setEndDate] = useState("2023-08-07T23:59:59.999Z");
  const [lastFourWeeks, setLastFourWeeks] = useState(false);
  const [lastFourMonths, setLastFourMonths] = useState(false);
  const [months, setMonths] = useState();
  const [firstMonth, setFirstMonth] = useState();
  const [secondMonth, setSecondMonth] = useState();
  const [thirdMonth, setThirdMonth] = useState();
  const [fourthMonth, setFourthMonth] = useState();
  const [weeks, setWeeks] = useState();
  const [firstWeek, setFirstWeek] = useState();
  const [secondWeek, setSecondWeek] = useState();
  const [thirdWeek, setThirdWeek] = useState();
  const [fourthWeek, setFourthWeek] = useState();
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});
  // get data
  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/log/admin/dashboard?startDate=${startDate}&endDate=${endDate}`
      );
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get payment data
  const getPaymentData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/payment/admin/dashboard?${
          lastFourMonths ? `lastFourMonths=${lastFourMonths}` : ""
        }${lastFourWeeks ? `&lastFourWeeks=${lastFourWeeks}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}`
      );
      console.log(response);
      if (lastFourWeeks) {
        setWeeks(response?.data);
        setFirstWeek(response?.data?.firstWeek);
        setSecondWeek(response?.data?.secondWeek);
        setThirdWeek(response?.data?.thirdWeek);
        setFourthWeek(response?.data?.fourthWeek);
      }
      if (lastFourMonths) {
        setMonths(response?.data);
        setFirstMonth(response?.data?.firstMonth);
        setSecondMonth(response?.data?.secondMonth);
        setThirdMonth(response?.data?.thirdMonth);
        setFourthMonth(response?.data?.fourthMonth);
      }
      if (startDate && endDate) {
        setDate(response?.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getPaymentData();
  }, [startDate, endDate, lastFourWeeks, lastFourMonths]);
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
                <input
                  type="date"
                  onChange={(e) => {
                    const date = e.target.value + "T00:00:00.000Z";
                    setStartDate(date);
                    setLastFourMonths(false);
                    setLastFourWeeks(false);
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
                    const date = e.target.value + "T23:59:59.999Z";
                    setEndDate(date);
                    setLastFourMonths(false);
                    setLastFourWeeks(false);
                  }}
                />
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
                <h3 className="value">{data.eleveSuspenduCount}</h3>
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
                <h3 className="value">{data.eleveAnnuleCount}</h3>
                <img className="card_icon" src={anuuler} />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Elèves abonnés</h4>
                  <span className="def pos">
                    <img src="../assets/up.svg" />
                    +3.5%
                  </span>
                </div>
                <h3 className="value">{data.eleveAbonneCount}</h3>
                <img className="card_icon" src={Elèves_abonnés} />
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
                <h3 className="value">{data.profInscritCount}</h3>
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
                <h3 className="value">{data.profValideCount}</h3>
                <img className="card_icon" src={validé} />
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
                <h3 className="value">{data.abonnementAbonnesCount}</h3>
                <img className="card_icon" src={abonnementAbonne} />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Abonnements proposés</h4>
                  <span className="def">
                    <img src="../assets/down.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">{data.abonnementProposeCount}</h3>
                <img className="card_icon" src={Abonnements_proposés} />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Professeur validé</h4>
                  <span className="def">
                    <img src="../assets/down.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">{data.abonnementValideCount}</h3>
                <img className="card_icon" src={validé} />
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
                <h3 className="value">{data.coursTermineCount}</h3>
                <img className="card_icon" src={Cours_termminés} />
              </div>
              <div className="card">
                <div className="text">
                  <h4 className="title">Cours annulés</h4>
                  <span className="def">
                    <img src="../assets/down.svg" />
                    -3.5%
                  </span>
                </div>
                <h3 className="value">{data.coursAnnuleCount}</h3>
                <img className="card_icon" src={anuuler} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin_section">
        <div className="admin_sections_header">
          <h2 className="admin_section_title">Statistique de paiement</h2>
          <div className="admin_time_filter">
            <div className="radio_container">
              <input
                type="radio"
                name="date_range"
                value="Semaine"
                onChange={() => {
                  setLastFourMonths(false);
                  setLastFourWeeks(true);
                }}
              />
              <label htmlFor="date_range">Semaine</label>
            </div>
            <div className="radio_container">
              <input
                type="radio"
                name="date_range"
                value="Mois"
                onChange={() => {
                  setLastFourWeeks(false);
                  setLastFourMonths(true);
                }}
              />
              <label htmlFor="date_range">Mois</label>
            </div>
          </div>
        </div>
        <div className="paiment_section">
          <div className="paiment_chart_container">
            {loading ? (
              <div
                className="spinner-container"
                style={{
                  margin: "auto",
                }}
              >
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <>
                <PaymentChart
                  startDate={startDate}
                  endDate={endDate}
                  lastFourWeeks={lastFourWeeks}
                  lastFourMonths={lastFourMonths}
                  date={date}
                  weeks={weeks}
                  months={months}
                />
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
              </>
            )}
          </div>
          <div className="paiment_card_illustraion_container">
            <div className="paiment_card_illustraion">
              <div className="top_text">
                <h5>
                  <span>Solde actuel</span>
                </h5>
                <h2 className="the_value">{data.balance} €</h2>
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
