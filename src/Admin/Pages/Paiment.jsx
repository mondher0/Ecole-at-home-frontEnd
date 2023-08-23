/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { baseURl } from "../../utils/utils";

const Paiment = () => {
  let [tab, setTab] = useState("Professeurs");
  const [profPayment, setProfPayment] = useState([]);
  const [elevePayment, setElevePayment] = useState([]);
  const [parentPayment, setParentPayment] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [etat, setEtat] = useState("");
  const [profNom, setProfNom] = useState("");
  const [eleveName, setEleveName] = useState("");
  const [parentName, setParentName] = useState("");
  const [coursId, setCoursId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpy, setIsEmpy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageParent, setCurrentPageParent] = useState(1);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [pages, setPages] = useState(0);
  const [pagesParent, setPagesParent] = useState(0);
  const [pagesStudent, setPagesStudent] = useState(0);

  let navigate = useNavigate();

  const columnsParent = [
    "IDPaiment",
    "IDCours",
    "DatePaiement",
    "Parent",
    "EmailParent",
    "Enfant",
    "EmailEnfant",
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

  const columnsProfesseur = [
    "IDPaiment",
    "IDCours",
    "DatePaiement",
    "Professeur",
    "EmailProfesseur",
    "EtatProfesseur",
    "Montant",
    "EtatPaiment",
    "Facture",
  ];

  // get all prof payment
  const getProfPayment = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/payment/admin/professeur?page=${currentPage}&pageSize=5&${
          etat ? `status=${etat}` : ""
        }${profNom ? `&professeurName=${profNom}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}`
      );
      console.log(response);
      setParentPayment(response.data?.payments);
      if (response.data?.payments?.length === 0) {
        setIsEmpy(true);
      }
      setPages(response.data?.count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // get all eleve payment
  const getElevePayment = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/payment/admin/eleve?page=${currentPageStudent}&pageSize=5&${
          etat ? `status=${etat}` : ""
        }${eleveName ? `&eleveName=${eleveName}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}${
          coursId ? `&coursId=${coursId}` : ""
        }${paymentId ? `&paymentId=${paymentId}` : ""}`
      );
      console.log(response);
      if (response.data?.payments.length === 0) {
        setIsEmpy(true);
      }
      setPagesStudent(response.data?.count);
      setElevePayment(response.data?.payments);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // get all parent payment
  const getParentPayment = async () => {
    try {
      setIsEmpy(false);
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/payment/admin/parent?page=${currentPageParent}&pageSize=5&${
          etat ? `status=${etat}` : ""
        }${parentName ? `&parentName=${parentName}` : ""}${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}${
          coursId ? `&coursId=${coursId}` : ""
        }${paymentId ? `&paymentId=${paymentId}` : ""}`
      );
      console.log(response);
      if (response.data?.payments.length === 0) {
        setIsEmpy(true);
      }
      setPagesParent(response.data?.count);
      setParentPayment(response.data?.payments);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  // Pagination handlers
  const goToPreviousPage = () => {
    if (currentPage === pages / currentPage) {
      return;
    }
    if (tab === "Eleve") {
      setCurrentPageStudent((prevPage) => prevPage - 1);
    }
    if (tab === "Parent") {
      setCurrentPageParent((prevPage) => prevPage - 1);
    }
    if (tab === "Professeurs") {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (tab === "Eleve") {
      setCurrentPageStudent((prevPage) => prevPage + 1);
    }
    if (tab === "Parent") {
      setCurrentPageParent((prevPage) => prevPage + 1);
    }
    if (tab === "Professeurs") {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    setCurrentPageStudent;
  };

  useEffect(() => {
    if (tab === "Professeurs") {
      getProfPayment();
    }
    if (tab === "Eleve") {
      getElevePayment();
    }
    if (tab === "Parent") {
      getParentPayment();
    }
  }, [
    tab,
    profNom,
    etat,
    startDate,
    endDate,
    eleveName,
    parentName,
    coursId,
    paymentId,
    currentPage,
    currentPageParent,
    currentPageStudent,
  ]);

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
          {tab === "Professeurs" && (
            <div className="radio_container">
              <label>Professeur</label>
              <div className="date_picker_container">
                <input
                  type="text"
                  onChange={(e) => {
                    setProfNom(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          {tab === "Eleve" && (
            <div className="radio_container">
              <label>Elève</label>
              <div className="date_picker_container">
                <input
                  type="text"
                  onChange={(e) => {
                    setEleveName(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          {tab === "Parent" && (
            <div className="radio_container">
              <label>Parent</label>
              <div className="date_picker_container">
                <input
                  type="text"
                  onChange={(e) => {
                    setParentName(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <div className="radio_container">
            <label>Du:</label>
            <div className="date_picker_container">
              <input
                type="date"
                onChange={(e) => {
                  if (e.target.value === "") {
                    setStartDate("");
                    return;
                  }
                  const date = e.target.value + "T00:00:00.000Z";
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
                  if (e.target.value === "") {
                    setEndDate("");
                    return;
                  }
                  const date = e.target.value + "T23:59:59.999Z";
                  setEndDate(date);
                }}
              />
              <img src="../assets/clock_calender.svg" />
            </div>
          </div>
          {tab !== "Professeurs" && (
            <div className="radio_container">
              <label>Id Cours</label>
              <div className="date_picker_container">
                <input
                  type="text"
                  onChange={(e) => {
                    setCoursId(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          {tab !== "Professeurs" && (
            <div className="radio_container">
              <label>Id Paiement</label>
              <div className="date_picker_container">
                <input
                  type="text"
                  onChange={(e) => {
                    setPaymentId(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          <div className="radio_container">
            <label>Etat paiement</label>
            <div className="date_picker_container">
              <select
                onChange={(e) => {
                  setEtat(e.target.value);
                }}
              >
                <option>Tous</option>
                <option value="En attente">En attente</option>
                <option value="Complete">Complete</option>
                <option value="Echec">Echec</option>
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
                : tab === "Professeurs"
                ? columnsProfesseur.map((column) => (
                    <th key={column}>{column}</th>
                  ))
                : columnsParent.map((column) => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {tab === "Eleve"
              ? elevePayment?.map((eleve) => (
                  <tr key={eleve?.id}>
                    <td>{eleve?.id}</td>
                    <td>{eleve?.cours.id}</td>
                    <td>date</td>
                    <td>
                      {eleve?.eleve?.user.nom}
                      {eleve?.eleve?.user.prenom}
                    </td>
                    <td>{eleve?.eleve?.user.email}</td>
                    <td>{eleve?.eleve.status}</td>
                    <td>{eleve.amount}</td>
                    <td>{eleve.status}</td>
                    <td>
                      <button type="button">
                        <img src="../assets/admin_download.svg" />
                      </button>
                    </td>
                  </tr>
                ))
              : tab === "Professeurs"
              ? profPayment?.map((prof) => (
                  <tr key={prof?.id}>
                    <td>{prof?.id}</td>
                    <td>{prof?.cours.id}</td>
                    <td>date</td>
                    <td>
                      {prof?.prof?.user.nom}
                      {prof?.prof?.user.prenom}
                    </td>
                    <td>{prof?.prof?.user.email}</td>
                    <td>{prof?.prof.status}</td>
                    <td>{prof.amount}</td>
                    <td>{prof.status}</td>
                    <td>
                      <button type="button">
                        <img src="../assets/admin_download.svg" />
                      </button>
                    </td>
                  </tr>
                ))
              : parentPayment?.map((parent) => (
                  <tr key={parent?.id}>
                    <td>{parent?.id}</td>
                    <td>{parent?.cours.id}</td>
                    <td>date</td>
                    <td>
                      {parent?.enfant?.parent?.user.nom}
                      {parent?.enfant.parent?.user.prenom}
                    </td>
                    <td>{parent?.enfant?.parent?.user.email}</td>
                    <td>
                      {parent?.enfant.nom} {parent?.enfant.prenom}
                    </td>
                    <td>{parent?.enfant.email}</td>
                    <td>{parent?.amount}</td>
                    <td>{parent?.status}</td>
                    <td>
                      <button type="button">
                        <img src="../assets/admin_download.svg" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}
        {isError && (
          <h1
            style={{
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            Erreur de chargement
          </h1>
        )}

        {isEmpy && (
          <h1
            style={{
              textAlign: "center",
              fontSize: "25px",
            }}
          >
            Aucun payment trouvé
          </h1>
        )}
        {tab === "Eleve" ? (
          <div className="table_pagination_bar">
            <div
              className="pagination_btns"
              style={{
                gap: "10px",
              }}
            >
              <button
                className="pagination_arrow"
                disabled={currentPageStudent === 1}
                onClick={goToPreviousPage}
              >
                <img
                  src="../assets/arrow.svg"
                  style={{
                    height: "20px",
                  }}
                />
              </button>
              <button className="pagination_btn selected">
                {currentPageStudent}
              </button>
              <button
                className="pagination_arrow right"
                onClick={goToNextPage}
                disabled={pagesStudent === 0 ? 1 : Math.ceil(pagesStudent / 5)}
              >
                <img
                  src="../assets/arrow.svg"
                  style={{
                    height: "20px",
                  }}
                />
              </button>
            </div>
          </div>
        ) : tab === "Parent" ? (
          <div className="table_pagination_bar">
            <div
              className="pagination_btns"
              style={{
                gap: "10px",
              }}
            >
              <button
                className="pagination_arrow"
                disabled={currentPageParent === 1}
                onClick={goToPreviousPage}
              >
                <img
                  src="../assets/arrow.svg"
                  style={{
                    height: "20px",
                  }}
                />
              </button>
              <button className="pagination_btn selected">
                {currentPageParent}
              </button>
              <button
                className="pagination_arrow right"
                onClick={goToNextPage}
                disabled={
                  pagesParent === 0
                    ? 1
                    : currentPageParent == Math.ceil(pagesParent / 5)
                }
              >
                <img
                  src="../assets/arrow.svg"
                  style={{
                    height: "20px",
                  }}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="table_pagination_bar">
            <div
              className="pagination_btns"
              style={{
                gap: "10px",
              }}
            >
              <button
                className="pagination_arrow"
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
              >
                <img
                  src="../assets/arrow.svg"
                  style={{
                    height: "20px",
                  }}
                />
              </button>
              <button className="pagination_btn selected">{currentPage}</button>
              <button
                className="pagination_arrow right"
                onClick={goToNextPage}
                disabled={pages === 0 ? 1 : currentPage == Math.ceil(pages / 5)}
              >
                <img
                  src="../assets/arrow.svg"
                  style={{
                    height: "20px",
                  }}
                />
              </button>
            </div>
          </div>
        )}
        <ul
          className="table_resume_bar"
          style={{
            marginTop: "20px",
          }}
        >
          <li style={{ color: "#0078D4" }}>Paiement::</li>
          <li style={{ color: "#38B6FF" }}>Complété: 3</li>
          <li style={{ color: "#004AAD" }}>En attente: 0</li>
          <li style={{ color: "#4DC643" }}>ERROR: 1</li>
        </ul>
      </div>
    </div>
  );
};

export default Paiment;
