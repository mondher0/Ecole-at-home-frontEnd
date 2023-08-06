/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../Css/ResponsiveTable.css";
import "../Css/BoardPage.css";
import "../Components/AdminContainer/AdminContainer.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/utils";
import { baseURl } from "../../utils/utils";

const Profeseurs = () => {
  let [showProfInfo, setShowProfInfo] = useState(false);
  let [showProfEtat, setShowProfEtat] = useState(false);
  const [professeurs, setProfesseurs] = useState();
  const [bloqueCount, setBloqueCount] = useState();
  const [confirmeCount, setConfirmeCount] = useState();
  const [inscritCount, setInscritCount] = useState();
  const [valideCount, setValideCount] = useState();
  const [etat, setEtat] = useState();
  const [etat2, setEtat2] = useState();
  const [profNom, setProfNom] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let Navigate = useNavigate();
  const columns = [
    "Professeur",
    "Date d’inscription",
    "Email",
    "Téléphone",
    "Diplome",
    "Etat",
    "Action",
  ];

  // get professeurs
  const getPronfesseurs = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/professeurs/admin/search?pageSize=5&page=1&${
          etat2 ? `status=${etat2}` : ""
        }${profNom ? `&name=${profNom}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}`
      );
      console.log(response);
      setProfesseurs(response.data?.items);
      setBloqueCount(response.data?.bloqueCount);
      setConfirmeCount(response.data?.confirmeCount);
      setInscritCount(response.data?.inscritCount);
      setValideCount(response.data?.valideCount);
      console.log(response.data.items);
      console.log(professeurs);
    } catch (error) {
      console.log(error);
    }
  };

  // change prof status
  const changeProfStatus = async (id, status) => {
    try {
      const data = {
        status: status,
      };
      const response = await axiosInstance.patch(
        `${baseURl}/professeurs/admin/status/${id}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPronfesseurs();
  }, [etat, startDate, endDate, profNom, etat2]);


  return (
    <div className="admin_section">
      <div className="admin_sections_header">
        <h2 className="admin_section_title">Professeurs</h2>
        <div className="admin_time_filter">
          <div className="radio_container">
            <label>Professeur</label>
            <div className="date_picker_container">
              <input
                type="text"
                placeholder="Prenom"
                onChange={(e) => {
                  setProfNom(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="radio_container">
            <label>Etat</label>
            <div className="date_picker_container">
              <select
                onChange={(e) => {
                  setEtat2(e.target.value);
                }}
              >
                <option value="">Choisir</option>
                <option value="inscrit">Inscrit</option>
                <option value="confirme">Confirmé</option>
                <option value="valide">Validé</option>
                <option value="bloque">Bloqué</option>
              </select>
            </div>
          </div>
          <div className="radio_container">
            <label>Du:</label>
            <div className="date_picker_container">
              <input
                type="date"
                onChange={(e) => {
                  const date = e.target.value + "T00:00:00.000Z";
                  console.log(date);
                  setStartDate(date);
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
                }}
              />
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
            {professeurs?.map((prof) => {
              const { createdAt } = prof.user;
              const dateObject = new Date(createdAt);
              const year = dateObject.getUTCFullYear();
              const month = dateObject.getUTCMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month.
              const day = dateObject.getUTCDate();

              // Format the date as a string in "YYYY-MM-DD" format
              const formattedDate = `${year}-${month
                .toString()
                .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
              console.log(prof.id);
              return (
                <tr key={prof.id}>
                  <td
                    onClick={() =>
                      Navigate(`/admin/Profeseurs/edit/${prof?.id}`)
                    }
                  >
                    {prof?.user?.nom} {prof.user.prenom}
                  </td>
                  <td>{formattedDate}</td>
                  <td>{prof.user.email}</td>
                  <td>{prof.phoneNumber}</td>
                  <td>{prof.diplome}</td>
                  <td className="status">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button className="btn btn-danger">
                        <img
                          src="../assets/admin_edit.svg"
                          onClick={() => {
                            setShowProfEtat({
                              id: prof.id,
                              etat: prof.status,
                              nom: prof.user.nom,
                              prenom: prof.user.prenom,
                              diplome: prof.diplome,
                            });
                            console.log(showProfEtat);
                          }}
                        />
                      </button>
                      <span
                        className="status"
                        style={{
                          color: "#004AAD",
                        }}
                      >
                        {prof.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-primary">
                      <img
                        src="../assets/aye.svg"
                        onClick={() => setShowProfInfo(true)}
                      />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        Navigate(`/admin/professeurs/edit/${prof?.id}`);
                      }}
                    >
                      <img src="../assets/entreprise_icon.svg" />
                    </button>
                  </td>
                </tr>
              );
            })}
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
          <li style={{ color: "#4DC643" }}>Validé: {valideCount}</li>
          <li style={{ color: "#FF914D" }}>Bloqué: {bloqueCount}</li>
        </ul>
      </div>

      {showProfInfo && (
        <div className="pop_up_container">
          <div className="pop_up edit">
            <div className="prof_edit_top">
              <img src="../assets/empty_avatar.png" />
              <div className="text">
                <h2 className="user_name">Patrick Nicholas</h2>
                <span>Ingénieur détat en génie des procédés</span>
              </div>
            </div>
            <div className="inscription_validation">
              <table>
                <h4 className="table_title">Niveaux</h4>
                <div className="items_container">
                  <div className="tab_col">
                    <div className="item title">
                      <label>Primaire</label>
                    </div>
                    <div className="item">
                      <input id="CP" type={"checkbox"} />
                      <label htmlFor="CP">CP</label>
                    </div>
                    <div className="item">
                      <input id="CE1" type={"checkbox"} />
                      <label htmlFor="CE1">CE1</label>
                    </div>
                    <div className="item">
                      <input id="CE2" type={"checkbox"} />
                      <label htmlFor="CE2">CE2</label>
                    </div>
                    <div className="item">
                      <input id="CM1" type={"checkbox"} />
                      <label htmlFor="CM1">CM1</label>
                    </div>
                    <div className="item">
                      <input id="CM2" type={"checkbox"} />
                      <label htmlFor="CM2">CM2</label>
                    </div>
                  </div>
                  <div className="tab_col">
                    <div className="item title">
                      <label>College</label>
                    </div>
                    <div className="item">
                      <input id="Sixième" type={"checkbox"} />
                      <label htmlFor="Sixième">Sixième</label>
                    </div>
                    <div className="item">
                      <input id="Cinquième" type={"checkbox"} />
                      <label htmlFor="Cinquième">Cinquième</label>
                    </div>
                    <div className="item">
                      <input id="Quatrième" type={"checkbox"} />
                      <label htmlFor="Quatrième">Quatrième</label>
                    </div>
                    <div className="item">
                      <input id="Troisième" type={"checkbox"} />
                      <label htmlFor="Troisième">Troisième</label>
                    </div>
                  </div>
                  <div className="tab_col">
                    <div className="item title">
                      <label>Lycée</label>
                    </div>
                    <div className="item">
                      <input id="Seconde" type={"checkbox"} />
                      <label htmlFor="Seconde">Seconde</label>
                    </div>
                    <div className="item">
                      <input id="Première" type={"checkbox"} />
                      <label htmlFor="Première">Première</label>
                    </div>
                    <div className="item">
                      <input id="Première STI2D" type={"checkbox"} />
                      <label htmlFor="Première STI2D">Première STI2D</label>
                    </div>
                    <div className="item">
                      <input id="Première STMG" type={"checkbox"} />
                      <label htmlFor="Première STMG">Première STMG</label>
                    </div>
                    <div className="item">
                      <input id="Terminale" type={"checkbox"} />
                      <label htmlFor="Terminale">Terminale</label>
                    </div>
                    <div className="item">
                      <input id="Terminale STI2D" type={"checkbox"} />
                      <label htmlFor="Terminale STI2D">Terminale STI2D</label>
                    </div>
                    <div className="item">
                      <input id="Terminale STMG" type={"checkbox"} />
                      <label htmlFor="Terminale STMG">Terminale STMG</label>
                    </div>
                  </div>
                </div>
              </table>
              <table>
                <h4 className="table_title">Matières</h4>
                <div className="items_container">
                  <div className="tab_col">
                    <div className="item title">
                      <label>Sciences</label>
                    </div>
                    <div className="item">
                      <input id="Maths" type={"checkbox"} />
                      <label htmlFor="Maths">Maths</label>
                    </div>
                    <div className="item">
                      <input id="Physique-chimie" type={"checkbox"} />
                      <label htmlFor="Physique-chimie">Physique-chimie</label>
                    </div>
                    <div className="item">
                      <input id="SVT" type={"checkbox"} />
                      <label htmlFor="SVT">SVT</label>
                    </div>
                    <div className="item">
                      <input id="Sciences de l'ingénieur" type={"checkbox"} />
                      <label htmlFor="Sciences de l'ingénieur">
                        Sciences de lingénieur
                      </label>
                    </div>
                  </div>
                  <div className="tab_col">
                    <div className="item title">
                      <label>Sciences humaines</label>
                    </div>
                    <div className="item">
                      <input id="Français" type={"checkbox"} />
                      <label htmlFor="Français">Français</label>
                    </div>
                    <div className="item">
                      <input id="Histoire-géo" type={"checkbox"} />
                      <label htmlFor="Histoire-géo">Histoire-géo</label>
                    </div>
                    <div className="item">
                      <input id="Philosophie" type={"checkbox"} />
                      <label htmlFor="Philosophie">Philosophie</label>
                    </div>
                    <div className="item">
                      <input id="SES" type={"checkbox"} />
                      <label htmlFor="SES">SES</label>
                    </div>
                  </div>
                  <div className="tab_col">
                    <div className="item title">
                      <label>Langues</label>
                    </div>
                    <div className="item">
                      <input id="Anglais" type={"checkbox"} />
                      <label htmlFor="Anglais">Anglais</label>
                    </div>
                    <div className="item">
                      <input id="Espagnol" type={"checkbox"} />
                      <label htmlFor="Espagnol">Espagnol</label>
                    </div>
                    <div className="item">
                      <input id="Expression Orale" type={"checkbox"} />
                      <label htmlFor="Expression Orale">Expression Orale</label>
                    </div>
                    <div className="item">
                      <input id="Mandarin" type={"checkbox"} />
                      <label htmlFor="Mandarin">Mandarin</label>
                    </div>
                  </div>
                </div>
              </table>
              <table className="timing">
                <h4 className="table_title">Disponiblités</h4>
                <div className="items_container">
                  <div className="tab_col">
                    <div className="item empty">
                      <label>.</label>
                    </div>
                    <div className="item">
                      <label>Lundi</label>
                    </div>
                    <div className="item">
                      <label>Mardi</label>
                    </div>
                    <div className="item">
                      <label>Mercredi</label>
                    </div>
                    <div className="item">
                      <label>Jeudi</label>
                    </div>
                    <div className="item">
                      <label>Vendredi</label>
                    </div>
                    <div className="item">
                      <label>Samedi</label>
                    </div>
                    <div className="item">
                      <label>Dimanche</label>
                    </div>
                  </div>
                  <div className="tab_col">
                    <div className="item">
                      <span>Matin 08-12</span>
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                  </div>
                  <div className="tab_col">
                    <div className="item">
                      <span>Matin 08-12</span>
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                  </div>
                  <div className="tab_col">
                    <div className="item">
                      <span>Matin 08-12</span>
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                  </div>
                  <div className="tab_col">
                    <div className="item">
                      <span>Matin 08-12</span>
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                    <div className="item timing">
                      <input id="" type={"checkbox"} />
                    </div>
                  </div>
                </div>
              </table>
              <div className="max">
                <h3>Nombre de cours maximum à pourvoir donner par semaine</h3>
                <input placeholder="1" type={"text"} />
              </div>
            </div>
            <img
              className="hide_btn"
              onClick={() => setShowProfInfo(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}

      {showProfEtat && (
        <div className="pop_up_container">
          <div className="pop_up edit etat">
            <div className="prof_edit_top">
              <img src="../assets/empty_avatar.png" />
              <div className="text">
                <h2 className="user_name">
                  {showProfEtat.nom} {showProfEtat.prenom}
                </h2>
                <span>{showProfEtat.diplome}</span>
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
                console.log(etat);
                changeProfStatus(showProfEtat.id, etat);
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
    </div>
  );
};

export default Profeseurs;
