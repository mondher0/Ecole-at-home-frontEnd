/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance, { baseURl } from "../../utils/utils";

const Facture = () => {
  const { userInfo } = useContext(GlobalContext);
  const { role } = userInfo;

  // get student facture
  const getStudentFacture = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/payment/eleve`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (role === "teacher") {
    //   getUpComingCoursesForTeacher();
    // }
    if (role === "student") {
      getStudentFacture();
    }
    // if (role === "parent") {
    //   getEnfants();
    // }
  }, []);
  return (
    <div className="invoices_page">
      <h3 className="main_title">Mes factures</h3>
      {role === "parent" && (
        <div className="select_child">
          <label>Enfant:</label>
          <select>
            <option>Séléctioner</option>
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
          <tr>
            <td>12-12-2022</td>
            <td>Khaled</td>
            <td>Math</td>
            <td>30$</td>
            <td>
              <img src="../assets/download.svg" />
            </td>
          </tr>
          <tr>
            <td>12-12-2022</td>
            <td>Khaled</td>
            <td>Math</td>
            <td>30$</td>
            <td>
              <img src="../assets/download.svg" />
            </td>
          </tr>
          <tr>
            <td>12-12-2022</td>
            <td>Khaled</td>
            <td>Math</td>
            <td>30$</td>
            <td>
              <img src="../assets/download.svg" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Facture;
