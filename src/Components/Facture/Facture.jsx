/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance, { baseURl } from "../../utils/utils";
import "../../css/loader.css";
import axios from "axios";

const Facture = () => {
  const { userInfo } = useContext(GlobalContext);
  const { role } = userInfo;
  const [enfants, setEnfants] = useState();
  const [parentFacture, setParentFacture] = useState();
  const [studentFacture, setStudentFacture] = useState();
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(false);

  // get student facture
  const getStudentFacture = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${baseURl}/payment/eleve`);
      console.log(response);
      if (response?.data.length === 0) {
        setIsEmpty(true);
      }
      setStudentFacture(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      setError(false);
      console.log(error);
    }
  };

  // get parent facture
  const getParentFacture = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/payment/parent/?enfantId=${id}`
      );
      console.log(response);
      console.log(response?.data?.length);
      if (response?.data.length === 0) {
        setIsEmpty(true);
      }
      setParentFacture(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      setError(false);
    }
  };

  // get enfants of the parent
  const getEnfants = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/enfant`);
      console.log(response);
      setEnfants(response.data.enfants);
    } catch (error) {
      console.log(error);
    }
  };
  const downloadPDFStudent = (id) => {
    const pdfUrl = `${baseURl}/payment/download-eleve-invoice/${id}`;
    const token = localStorage.getItem("token");

    // Create a config object with headers containing the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    axios
      .get(pdfUrl, config)
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "downloaded-file.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading PDF file:", error);
        setLoading(false);
      });
  };

  const downloadPDFParent = (id) => {
    const pdfUrl = `${baseURl}/payment/download-parent-invoice/${id}`;
    const token = localStorage.getItem("token");

    // Create a config object with headers containing the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    };

    axios
      .get(pdfUrl, config)
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "downloaded-file.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading PDF file:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (role === "student") {
      getStudentFacture();
    }
    if (role === "parent") {
      getEnfants();
    }
  }, []);
  return (
    <div className="invoices_page">
      <h3 className="main_title">Mes factures</h3>
      {role === "parent" && (
        <div className="select_child">
          <label>Enfant:</label>
          <select
            onChange={(e) => {
              getParentFacture(e.target.value);
            }}
          >
            <option>Séléctioner</option>
            {enfants?.map((enfant) => {
              return (
                <option key={enfant.id} value={enfant.id}>
                  {enfant.nom} {enfant.prenom}
                </option>
              );
            })}
          </select>
        </div>
      )}
      <table className="invoices_table">
        <tbody>
          <tr>
            <th>Date</th>
            <th>Elève</th>
            <th>Matière</th>
            <th>Prix TTC</th>
            <th>Télécharger</th>
          </tr>

          {role === "parent"
            ? parentFacture?.map((fac) => {
                const date = new Date(fac.createdAt);
                const day = date.getDate();
                let month = date.getMonth();
                const year = date.getFullYear();
                const dateFormated = `${day}-${month}-${year}`;
                return (
                  <tr key={fac.id}>
                    <td>{dateFormated}</td>
                    <td>{fac.enfant.prenom}</td>
                    <td>{fac.matiere}</td>
                    <td>{fac.amount}$</td>
                    <td>
                      <img
                        src="../assets/download.svg"
                        onClick={() => {
                          downloadPDFParent(fac.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })
            : studentFacture?.map((fac) => {
                const date = new Date(fac.createdAt);
                const day = date.getDate();
                let month = date.getMonth();
                const year = date.getFullYear();
                const dateFormated = `${day}-${month}-${year}`;
                return (
                  <tr key={fac.id}>
                    <td>{dateFormated}</td>
                    <td>{userInfo.prenom}</td>
                    <td>{fac.matiere}</td>
                    <td>{fac.amount}$</td>
                    <td>
                      <img
                        src="../assets/download.svg"
                        onClick={() => {
                          downloadPDFStudent(fac.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {loading && (
        <div
          className="spinner-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <div className="loading-spinner"></div>
        </div>
      )}

      {isEmpty && (
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Aucune facture a trouvée
        </h2>
      )}
      {error && (
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Erreur de chargement
        </h2>
      )}
    </div>
  );
};

export default Facture;
