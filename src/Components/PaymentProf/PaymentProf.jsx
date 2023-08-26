/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance, { baseURl } from "../../utils/utils";
import "../../css/loader.css";

const PaymentProf = () => {
  const { userInfo } = useContext(GlobalContext);
  const { role } = userInfo;
  const [enfants, setEnfants] = useState();
  const [parentFacture, setParentFacture] = useState();
  const [studentFacture, setStudentFacture] = useState();
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(false);

  // get student facture
  const getPaiment = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${baseURl}/payment/professeur`);
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

  useEffect(() => {
    getPaiment();
  }, []);
  return (
    <div className="invoices_page">
      <h3 className="main_title">Mes factures</h3>
      <table className="invoices_table">
        <tbody>
          <tr>
            <th>Date</th>
            <th>Niveau</th>
            <th>Matière</th>
            <th>Paiment</th>
            <th>Télécharger</th>
          </tr>
          {studentFacture?.map((fac) => {
            const date = fac.createdAt;
            const day = date.getDate();
            let month = date.getMonth();
            const year = date.getFullYear();
            const dateFormated = `${day} ${month} ${year}`;
            return (
              <tr key={fac.id}>
                <td>{dateFormated}</td>
                <td>{userInfo.prenom}</td>
                <td>{fac.matiere}</td>
                <td>{fac.amount}$</td>
                <td>
                  <img src="../assets/download.svg" />
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

export default PaymentProf;
