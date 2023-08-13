/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosInstance, { baseURl } from "../../utils/utils";

const Historique = () => {
  const [logs, setLogs] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [entity, setEntity] = useState();
  const [status, setStatus] = useState();
  const [admin, setAdmin] = useState();

  // get logs
  const getLogs = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseURl}/log/admin/search?page=2&pageSize=5${
          startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}${
          entity ? `&entity=${entity}` : ""
        }${status ? `&status=${status}` : ""}${admin ? `&adminName=${admin}` : ""}`
      );
      console.log(response);
      setLogs(response.data.logs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogs();
  }, [startDate, endDate, status, admin]);
  return (
    <div className="admin_section abonnements">
      <div className="admin_sections_header">
        <h2 className="admin_section_title">Historique</h2>
        <div className="admin_time_filter history">
          <div className="radio_container">
            <label>Etat élève</label>
            <div className="date_picker_container">
              <select
                onChange={(e) => {
                  if (!e.target.value) {
                    setEntity();
                    setStatus();
                    return;
                  }
                  setEntity("eleve");
                  setStatus(e.target.value);
                }}
              >
                <option value="">Choisir</option>
                <option value="inscrit">Inscrit</option>
                <option value="confirme">Confirmé</option>
                <option value="valide">Validé</option>
                <option value="bloque">Bloqué</option>
                <option value="suspendu">Suspendu</option>
                <option value="abonne">Abonné</option>
                <option value="test">Test</option>
                <option value="teste">Testé</option>
              </select>
            </div>
          </div>
          <div className="radio_container">
            <label>Du:</label>
            <div className="date_picker_container">
              <input
                type="date"
                onChange={(e) => {
                  if (!e.target.value) {
                    setStartDate();
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
                  if (!e.target.value) {
                    setEndDate();
                    return;
                  }
                  const date = e.target.value + "T23:59:59.999Z";
                  setEndDate(date);
                }}
              />
              <img src="../assets/clock_calender.svg" />
            </div>
          </div>

          <div className="radio_container">
            <label>Etat parent</label>
            <div className="date_picker_container">
              <select>
                <option>Tous</option>
              </select>
            </div>
          </div>

          <div className="radio_container">
            <label>Etat enfant</label>
            <div className="date_picker_container">
              <select>
                <option>Tous</option>
              </select>
            </div>
          </div>

          <div className="radio_container">
            <label>Etat professeur</label>
            <div className="date_picker_container">
              <select
                onChange={(e) => {
                  if (!e.target.value) {
                    setEntity();
                    setStatus();
                    return;
                  }
                  setEntity("professeur");
                  setStatus(e.target.value);
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
            <label>Etat Abonnement</label>
            <div className="date_picker_container">
              <select
                onChange={(e) => {
                  if (!e.target.value) {
                    setEntity();
                    setStatus();
                    return;
                  }
                  setEntity("abonnement");
                  setStatus(e.target.value);
                }}
              >
                <option value="">Tous</option>
                <option value="propose">Propose</option>
                <option value="valide">Valide</option>
                <option value="test">Test</option>
                <option value="teste">Testé</option>
                <option value="abonne">Abonné</option>
                <option value="suspendu">Suspendu</option>
                <option value="disponible">Disponible</option>
                <option value="resilie">Resilie</option>
              </select>
            </div>
          </div>

          <div className="radio_container">
            <label>Etat Cours</label>
            <div className="date_picker_container">
              <select
                onChange={(e) => {
                  if (!e.target.value) {
                    setEntity();
                    setStatus();
                    return;
                  }
                  setEntity("cours");
                  setStatus(e.target.value);
                }}
              >
                <option value="">Tous</option>
                <option value="programme">Programmé</option>
                <option value="annule">Annulé</option>
                <option value="termine">Terminé</option>
              </select>
            </div>
          </div>

          <div className="radio_container">
            <label>Admin</label>
            <div className="date_picker_container">
              <input
                type="text"
                placeholder="Admin nom"
                onChange={(e) => {
                  if (!e.target.value) {
                    setAdmin();
                    return;
                  }
                  setAdmin(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="history_list"
        style={{
          marginTop: "2rem",
        }}
      >
        {logs &&
          logs.map((log) => {
            const { createdAt } = log;
            const date = new Date(createdAt);
            const hour = date.getHours().toString().padStart(2, "0");
            const minute = date.getMinutes().toString().padStart(2, "0");
            const time = `${hour}:${minute}`;
            const year = date.getUTCFullYear();
            const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
            const day = date.getUTCDate().toString().padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;

            return (
              <>
                <div className="admin_sections_header">
                  <h2 className="admin_section_title sub">{formattedDate}</h2>
                </div>
                <div className="history_item" key={log.id}>
                  <div className="title">
                    <div className="icon">
                      <img src="../assets/admin_sh.svg" />
                    </div>
                  </div>
                  {log.admin ? (
                    <p>
                      {"Admin"} {log.admin?.nom} {log.admin?.prenom}{" "}
                      {log?.action} {log?.details?.nom} {log?.details?.prenom}
                    </p>
                  ) : (
                    <p>
                      {log?.details?.nom} {log?.details?.prenom} {log?.action}
                    </p>
                  )}
                  <span className="time">{time}</span>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Historique;
