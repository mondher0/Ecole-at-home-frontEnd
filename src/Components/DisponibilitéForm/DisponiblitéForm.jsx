/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURl } from "../../utils/utils";
import axiosInstance from "../../utils/utils";

const DisponiblitéForm = () => {
  const [niveaux, setNiveaux] = useState([]);
  const [niveau, setNiveau] = useState("");

  // get niveaux
  const getNiveaux = async () => {
    try {
      const response = await axios.get(`${baseURl}/niveau`);
      console.log(response);
      setNiveaux(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNiveaux();
  }, []);
  return (
    <div className="pop_up_container">
      <div className="pop_up">
        <img
          className="hide_btn"
          src="../assets/x.svg"
          onClick={() => {
            document.getElementById("favDialog").close();
          }}
        />
        <form className="dispo_form">
          <div className="input_container">
            <label htmlFor="Niveau">Niveau</label>
            <select
              name="Niveau"
              onChange={(e) => {
                setNiveau(e.target.value);
              }}
            >
              <option>Séléctioner</option>
              {niveaux?.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="Matière">Matière</label>
            <select value="" name="Matière">
              <option value="">Séléctionner</option>
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="Jour">Jour</label>
            <select value="" name="dayOfWeek">
              <option>lundi</option>
              <option>mardi</option>
              <option>mercredi</option>
              <option>jeudi</option>
              <option>vendredi</option>
              <option>samedi</option>
              <option>dimanche</option>
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="timing">Horraire</label>
            <select value="" required name="timing">
              <option value="">Séléctioner</option>
            </select>
          </div>
          <button className="submit_btn">Envoyer une demande</button>
        </form>
      </div>
    </div>
  );
};

export default DisponiblitéForm;
