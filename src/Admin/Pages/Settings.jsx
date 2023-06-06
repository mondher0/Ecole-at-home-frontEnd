/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const Settings = () => {
  let [tab, setTab] = useState("Mon profil");
  const [pageAction, setPageAction] = useState("Modifier");
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showAddModer, setShowAddModer] = useState(false);

  const columns = ["ID", "Modérateur", "Email", "Téléphone", "Profil", "Admin"];

  const data = [
    {
      id: 1,
      professeur: "Nicholas Patrick",
      dateInscription: "12-12-2022",
      email: "nicholask@gmail.com",
      telephone: "123-456-7890",
      diplome: "Bachelor of Science",
    },
    {
      id: 2,
      professeur: "Nicholas Patrick",
      dateInscription: "12-12-2022",
      email: "nicholask@gmail.com",
      telephone: "123-456-7890",
      diplome: "Bachelor of Science",
    },
    {
      id: 3,
      professeur: "Nicholas Patrick",
      dateInscription: "12-12-2022",
      email: "nicholask@gmail.com",
      telephone: "123-456-7890",
      diplome: "Bachelor of Science",
    },
    {
      id: 4,
      professeur: "Nicholas Patrick",
      dateInscription: "12-12-2022",
      email: "nicholask@gmail.com",
      telephone: "123-456-7890",
      diplome: "Bachelor of Science",
    },
    // More data objects here
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleModifierClick = () => {
    if (pageAction === "Modifier") {
      setPageAction("Enregistrer");
      setInputsDisabled(false);
    } else {
      setPageAction("Modifier");
      setInputsDisabled(true);
    }
  };
  return (
    <div className="admin_section admin_edit_page">
      <div className="admin_sections_header">
        <h2 className="admin_section_title tabs">
          <span
            className={tab === "Mon profil" ? "active" : ""}
            onClick={() => setTab("Mon profil")}
          >
            Mon profil
          </span>
          <span
            className={tab === "Modérateurs" ? "active" : ""}
            onClick={() => setTab("Modérateurs")}
          >
            Modérateurs
          </span>
          <span
            className={tab === "Configuration" ? "active" : ""}
            onClick={() => setTab("Configuration")}
          >
            Configuration
          </span>
        </h2>
        {tab === "Modérateurs" && (
          <button onClick={() => setShowAddModer(true)} className="cta">
            <img src="../assets/add_new_admin.svg" />
            <span>Ajouter modérateur</span>
          </button>
        )}
      </div>

      {tab === "Mon profil" && (
        <>
          <h4 className="admin_edit_title">
            Modifier mes informrations personnelles
          </h4>
          <div className="admin_inputs_cards">
            <div className="admin_inputs">
              <div className="input_container2 half">
                <label>Nom</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="Patrick"
                />
              </div>
              <div className="input_container2 half">
                <label>Prénom </label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="Nicholas"
                />
              </div>
              <div className="input_container2 half">
                <label>Téléphone</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="01124548870"
                />
              </div>
              <div className="input_container2 half">
                <label>Email</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="imane@gmail.com"
                />
              </div>
              <div className="input_container2 half">
                <label>Nouveau mot de passe</label>
                <div className="password-input">
                  <input type={showPassword ? "text" : "password"} />
   
                </div>
              </div>
            </div>
          </div>

          <h4 className="admin_edit_title">
            Modifier mes informrations entreprise
          </h4>
          <div className="admin_inputs_cards">
            <div className="admin_inputs">
              <div className="input_container2">
                <label>Siret</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="12/85"
                />
              </div>
              <div className="input_container2">
                <label>Nom entreprise</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="test test"
                />
              </div>
              <div className="input_container2">
                <label>Adresse de l’entreprise</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="10 rue paris 7501 Paris"
                />
              </div>
              <div className="input_container2">
                <label>Mail de l’entreprise</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="proviseuràecoleathome.com"
                />
              </div>
              <div className="input_container2">
                <label>Téléphone entreprise</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="0324589678"
                />
              </div>
            </div>
          </div>

          <button
            className={pageAction === "Enregistrer" ? "cta green" : "cta"}
            onClick={handleModifierClick}
          >
            {pageAction}
          </button>
        </>
      )}

      {tab === "Modérateurs" && (
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
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.dateInscription}</td>
                  <td>{row.email}</td>
                  <td>{row.telephone}</td>
                  <td>{row.telephone}</td>
                  <td>
                    <button className="btn btn-danger">
                      <img src="../assets/admin_edit.svg" />
                    </button>
                    <button className="btn btn-primary">
                      <img src="../assets/admin_delete.svg" />
                    </button>
                  </td>
                </tr>
              ))}
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
        </div>
      )}

      {showAddModer && (
        <div className="pop_up_container">
          <div className="pop_up edit etat">
            <h5 className="input_pop_title">Nouveau modérateur</h5>
            <div className="admin_inputs_pop_up">
              <div className="input_container2 half">
                <label>Nom</label>
                <input type="text" placeholder="Patrick" />
              </div>
              <div className="input_container2 half">
                <label>Prénom </label>
                <input type="text" placeholder="Nicholas" />
              </div>
              <div className="input_container2 half">
                <label>Téléphone</label>
                <input type="text" placeholder="01124548870" />
              </div>
              <div className="input_container2 half">
                <label>Email</label>
                <input type="text" placeholder="imane@gmail.com" />
              </div>
              <div className="input_container2 half">
                <label>Profil</label>
                <select>
                  <option>Admin</option>
                </select>
              </div>
              <div className="input_container2 half">
                <label>Nouveau mot de passe</label>
                <div className="password-input">
                  <input type={showPassword ? "text" : "password"} />
                </div>
              </div>
            </div>
            <button className="cta">Ajouter</button>
            <img
              className="hide_btn"
              onClick={() => setShowAddModer(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}

      {tab === "Configuration" && (
        <div className="admin_edit_page settings">
          <h4 className="admin_edit_title">Configuration des comptes</h4>

          <div className="admin_hor_section">
            <div className="admin_card">
              <div>
                <img src="../assets/zoom_pf_icon.png" />
                <span>Zoom</span>
                <span>Khaled Zoom</span>
                <span>+1545,00</span>
                <span className="cta">Modifier</span>
              </div>
              <div>
                <img src="../assets/vimeo.png" />
                <span>Zoom</span>
                <span>Khaled Zoom</span>
                <span>+1545,00</span>
                <span className="cta">Modifier</span>
              </div>
            </div>
            <div>
              <button className="shadow_btn">
                <img src="../assets/vimeo.png" />
                <span>Ajouter un compte Vimeo</span>
              </button>
              <button className="shadow_btn">
                <img src="../assets/zoom_pf_icon.png" />
                <span>Ajouter un compte Vimeo</span>
              </button>
            </div>
          </div>

          <h4 className="admin_edit_title">Configuration générale</h4>

          <div className="admin_inputs_cards settings">
            <div className="admin_inputs">
              <div className="input_container2">
                <label>Prix par heure</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="Patrick"
                />
              </div>
              <div className="input_container2">
                <label>Durée du cours hebdomadaire </label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="Nicholas"
                />
              </div>
              <div className="input_container2">
                <label>Nombre d’élèves par classe</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="01124548870"
                />
              </div>
              <div className="input_container2">
                <label>Pencentage de la pltaforme</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="imane@gmail.com"
                />
              </div>
              <div className="input_container2">
                <label>TVA </label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="test test"
                />
              </div>
              <div className="input_container2">
                <label>Annuler le cous avant:</label>
                <input
                  disabled={inputsDisabled}
                  type="text"
                  placeholder="test"
                />
              </div>
            </div>
            <div className="Enregistrement_swich">
              <h4>Enregistrement</h4>
              <div>
                <input name="Enregistrement" value="Activé" type="radio" />
                <label htmlFor="Enregistrement">Activé</label>
              </div>
              <div>
                <input name="Enregistrement" value="Désactivé" type="radio" />
                <label htmlFor="Enregistrement">Désactivé</label>
              </div>
            </div>
          </div>

          <button
            className={pageAction === "Enregistrer" ? "cta green" : "cta"}
            onClick={handleModifierClick}
          >
            {pageAction}
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
