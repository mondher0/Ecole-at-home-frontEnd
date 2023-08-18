/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURl } from "../../utils/utils";
import axiosInstance from "../../utils/utils";

const DisponiblitéForm = () => {
  const [niveaux, setNiveaux] = useState([]);
  const [niveau, setNiveau] = useState("");
  const [matieres, setMatieres] = useState([]);
  const [matiere, setMatiere] = useState("");
  const [day, setDay] = useState("");
  const [timing, setTiming] = useState([]);
  const [timingItem, setTimingItem] = useState("");

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

  // get matieres
  const getMatieres = async (id) => {
    try {
      console.log(niveau);
      const response = await axios.get(
        `${baseURl}/matiere/find-by-niveau/${id}`
      );
      console.log(response);
      setMatieres(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get timing
  const getTiming = async () => {
    try {
      const response = await axios.get(`${baseURl}/timing-item`);
      console.log(response);
      setTiming(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // submit disponiblité
  const submitDispo = async (e) => {
    e.preventDefault();
    try {
      console.log(matiere);
      console.log(timingItem);
      const start_hour = JSON.parse(timingItem).start_hour;
      const end_hour = JSON.parse(timingItem).end_hour;
      const data = {
        day: day,
        matiereId: parseInt(matiere),
        timing: {
          start_hour: start_hour,
          end_hour: end_hour,
        },
      };
      console.log(data);
      const response = await axiosInstance.post(`${baseURl}/abonnement`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNiveaux();
    getTiming();
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
        <form className="dispo_form" onSubmit={submitDispo}>
          <div className="input_container">
            <label htmlFor="Niveau">Niveau</label>
            <select
              name="Niveau"
              onChange={(e) => {
                if (e.target.value === "") {
                  setNiveau("");
                  return;
                }
                setNiveau(e.target.value);
                getMatieres(e.target.value);
              }}
            >
              <option value="">Séléctioner</option>
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
            <select
              name="Matière"
              onChange={(e) => {
                setMatiere(e.target.value);
              }}
            >
              <option value="">
                {niveau === ""
                  ? "Séléctioner le niveau d'abord"
                  : "Séléctioner"}
              </option>
              {matieres?.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="Jour">Jour</label>
            <select
              name="dayOfWeek"
              onChange={(e) => {
                setDay(e.target.value);
              }}
            >
              <option value="">Séléctioner</option>
              <option value="Sunday">dimanche</option>
              <option value="Monday">lundi</option>
              <option value="Tuesday">mardi</option>
              <option value="Wednesday">mercredi</option>
              <option value="Thursday">jeudi</option>
              <option value="Friday">vendredi</option>
              <option value="Saturday">samedi</option>
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="timing">Horraire</label>
            <select
              required
              name="timing"
              onChange={(e) => {
                console.log(e.target.value);
                setTimingItem(e.target.value);
              }}
            >
              <option value="">Séléctioner</option>
              {timing?.map((item) => {
                return (
                  <option value={JSON.stringify(item)} key={item.label}>
                    {item.start_hour} - {item.end_hour}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="submit_btn">Envoyer une demande</button>
        </form>
      </div>
    </div>
  );
};

export default DisponiblitéForm;
