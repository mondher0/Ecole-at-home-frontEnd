/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import axiosInstance, { baseURl } from "../../utils/utils";

const Settings = () => {
  let [tab, setTab] = useState("Mon profil");
  const [pageAction, setPageAction] = useState("Modifier");
  const [pageAction2, setPageAction2] = useState("Modifier");
  const [pageAction3, setPageAction3] = useState("Modifier");
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showAddModer, setShowAddModer] = useState(false);
  const [showEditModer, setShowEditModer] = useState(false);
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [toggleSubmit2, setToggleSubmit2] = useState(false);
  const [toggleSubmit3, setToggleSubmit3] = useState(false);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [siret, setSiret] = useState(null);
  const [entrepriseName, setEntrepriseName] = useState(null);
  const [adresse, setAdresse] = useState(null);
  const [emailEntreprise, setEmailEntreprise] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [pricePerHour, setPricePerHour] = useState(null);
  const [dureeCours, setDureeCours] = useState(null);
  const [maxEleve, setMaxEleve] = useState(null);
  const [pourcentagePlatforme, setPourcentagePlatforme] = useState(null);
  const [tva, setTva] = useState(null);
  const [dureeAvantAnnulation, setDureeAvantAnnulation] = useState(null);
  const [enregistrement, setEnregistrement] = useState(null);
  const [mods, setMods] = useState(null);

  const [modeNom, setModeNom] = useState("");
  const [modePrenom, setModePrenom] = useState("");
  const [modeEmail, setModeEmail] = useState("");
  const [modePhone, setModePhone] = useState("");
  const [modeProfil, setModeProfil] = useState("");
  const [modePassword, setModePassword] = useState("");

  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingEnrepris, setLoadingEnrepris] = useState(false);
  const [errorDetails, setErrorDetails] = useState(false);
  const [errorEnrepris, setErrorEnrepris] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [errorConfig, setErrorConfig] = useState(false);

  const [modsLoading, setModsLoading] = useState(false);
  const [modsError, setModsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const columns = ["ID", "Modérateur", "Email", "Téléphone", "Profil", "Admin"];

  // get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/users/me`);
      console.log(response);
      setEmail(response.data.email);
      setNom(response.data.nom);
      setPrenom(response.data.prenom);
      setTelephone(response.data.phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };

  // update admin info
  const updateAdmin = async (e) => {
    e.preventDefault();
    try {
      setErrorDetails(false);
      setLoadingDetails(true);
      const data = {
        nom: nom,
        prenom: prenom,
        phoneNumber: telephone,
        email: email,
      };
      if (password) {
        data.password = password;
      }
      const response = await axiosInstance.patch(
        `${baseURl}/users/update-admin`,
        data
      );
      console.log(response);
      setLoadingDetails(false);
      setToggleSubmit(false);
    } catch (error) {
      setLoadingDetails(false);
      setErrorDetails(true);
      console.log(error);
    }
  };

  // update entreprise info
  const updateEntreprise = async (e) => {
    e.preventDefault();
    try {
      setErrorEnrepris(false);
      setLoadingEnrepris(true);
      const data = {
        siret: siret,
        entrepriseName: entrepriseName,
        adresse: adresse,
        email: emailEntreprise,
        phoneNumber: phoneNumber,
      };
      console.log(data);
      const response = await axiosInstance.patch(
        `${baseURl}/entreprise/admin`,
        data
      );
      console.log(response);
      setLoadingEnrepris(false);
      setToggleSubmit2(false);
    } catch (error) {
      setLoadingEnrepris(false);
      setErrorEnrepris(true);
      console.log(error);
    }
  };

  // update config info
  const updateConfig = async (e) => {
    e.preventDefault();
    try {
      setErrorConfig(false);
      setLoadingConfig(true);
      const data = {
        pricePerHour: parseInt(pricePerHour),
        dureeCours: parseInt(dureeCours),
        maxEleve: parseInt(maxEleve),
        pourcentagePlatforme: parseInt(pourcentagePlatforme),
        tva: parseInt(tva),
        dureeAvantAnnulation: parseInt(dureeAvantAnnulation),
        enregistrement: enregistrement,
      };
      console.log(data);
      const response = await axiosInstance.patch(
        `${baseURl}/entreprise/admin`,
        data
      );
      console.log(response);
      setLoadingConfig(false);
      setToggleSubmit3(false);
    } catch (error) {
      setLoadingConfig(false);
      setErrorConfig(true);
      console.log(error);
    }
  };

  // get entreprise info
  const getEntrepriseInfo = async () => {
    try {
      const response = await axiosInstance.get(`${baseURl}/entreprise/admin`);
      console.log(response);
      setSiret(response.data.siret);
      setEntrepriseName(response.data.entrepriseName);
      setAdresse(response.data.adresse);
      setEmailEntreprise(response.data.email);
      setPhoneNumber(response.data.phoneNumber);
      setPricePerHour(response.data.pricePerHour);
      setDureeCours(response.data.dureeCours);
      setMaxEleve(response.data.maxEleve);
      setPourcentagePlatforme(response.data.pourcentagePlatforme);
      setTva(response.data.tva);
      setDureeAvantAnnulation(response.data.dureeAvantAnnulation);
      setEnregistrement(response.data.enregistrement);
    } catch (error) {
      console.log(error);
    }
  };

  // get mods
  const getMods = async () => {
    try {
      setModsError(false);
      setModsLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/admin?page=${currentPage}`
      );
      console.log(response);
      setMods(response.data.admins);
      setModsLoading(false);
    } catch (error) {
      setModsLoading(false);
      setModsError(true);
      console.log(error);
    }
  };

  // add mode
  const addMode = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nom: modeNom,
        prenom: modePrenom,
        email: modeEmail,
        phoneNumber: modePhone,
        password: modePassword,
        role: modeProfil,
      };
      const response = await axiosInstance.post(`${baseURl}/admin`, data);
      console.log(response);
      setShowAddModer(false);
      getMods();
    } catch (error) {
      console.log(error);
    }
  };

  // update mode
  const updateMode = async (e, id) => {
    e.preventDefault();
    try {
      const data = {
        nom: modeNom,
        prenom: modePrenom,
        email: modeEmail,
        password: modePassword,
        role: modeProfil,
        phoneNumber: modePhone,
      };
      console.log(data);
      const response = await axiosInstance.patch(
        `${baseURl}/admin/${id}`,
        data
      );
      console.log(response);
      setShowEditModer(false);
      getMods();
    } catch (error) {
      console.log(error);
    }
  };

  // get single mod
  const getSingleMod = async (id) => {
    try {
      const response = await axiosInstance.get(`${baseURl}/admin/${id}`);
      console.log(response);
      setModeNom(response.data.admin.nom);
      setModePrenom(response.data.admin.prenom);
      setModeEmail(response.data.admin.email);
      // setModePhone(response.data.admin.telephone);
      setModeProfil(response.data.admin.role);
    } catch (error) {
      console.log(error);
    }
  };

  // delete mod
  const deleteMod = async (id) => {
    try {
      const response = await axiosInstance.delete(`${baseURl}/admin/${id}`);
      console.log(response);
      getMods();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getMods();
    getEntrepriseInfo();
  }, [tab, currentPage]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleModifierClick = () => {
    if (pageAction === "Modifier") {
      setPageAction("Enregistrer");
      setInputsDisabled(false);
      setToggleSubmit(true);
    } else {
      setPageAction("Modifier");
      setInputsDisabled(true);
    }
  };
  const handleModifierClick2 = () => {
    if (pageAction2 === "Modifier") {
      setPageAction2("Enregistrer");
      setInputsDisabled(false);
      setToggleSubmit2(true);
    } else {
      setPageAction2("Modifier");
      setInputsDisabled(true);
    }
  };
  const handleModifierClick3 = () => {
    if (pageAction3 === "Modifier") {
      setPageAction3("Enregistrer");
      setInputsDisabled(false);
      setToggleSubmit3(true);
    } else {
      setPageAction3("Modifier");
      setInputsDisabled(true);
    }
  };

  // Pagination handlers
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    console.log(currentPage);
    // if (currentPage === Math.ceil(pages / 5)) {
    //   return;
    // }

    setCurrentPage((prevPage) => prevPage + 1);
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
            <form onSubmit={updateAdmin}>
              <div className="admin_inputs">
                <div className="input_container2 half">
                  <label>Nom</label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="Patrick"
                    value={nom}
                    onChange={(e) => {
                      setNom(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Prénom </label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="Nicholas"
                    value={prenom}
                    onChange={(e) => {
                      setPrenom(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Téléphone</label>
                  <input
                    disabled={inputsDisabled}
                    type="number"
                    placeholder="01124548870"
                    value={telephone}
                    onChange={(e) => {
                      setTelephone(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Email</label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="imane@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Nouveau mot de passe</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              {toggleSubmit && (
                <button
                  className="cta green"
                  onClick={handleModifierClick}
                  style={{
                    margin: "12px auto",
                  }}
                >
                  {loadingDetails
                    ? "Chargement..."
                    : errorDetails
                    ? "Erreur"
                    : "Enregistrer"}
                </button>
              )}
            </form>
            {!toggleSubmit && (
              <button
                className={pageAction === "Enregistrer" ? "cta green" : "cta"}
                onClick={handleModifierClick}
                style={{
                  width: "200px",
                  margin: "0",
                }}
              >
                {pageAction}
              </button>
            )}
          </div>

          <h4 className="admin_edit_title">
            Modifier mes informrations entreprise
          </h4>
          <div className="admin_inputs_cards">
            <form onSubmit={updateEntreprise}>
              <div className="admin_inputs">
                <div className="input_container2">
                  <label>Siret</label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="12/85"
                    value={siret}
                    onChange={(e) => {
                      setSiret(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2">
                  <label>Nom entreprise</label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="test test"
                    value={entrepriseName}
                    onChange={(e) => {
                      setEntrepriseName(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2">
                  <label>Adresse de l’entreprise</label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="10 rue paris 7501 Paris"
                    value={adresse}
                    onChange={(e) => {
                      setAdresse(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2">
                  <label>Mail de l’entreprise</label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="proviseuràecoleathome.com"
                    value={emailEntreprise}
                    onChange={(e) => {
                      setEmailEntreprise(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2">
                  <label>Téléphone entreprise</label>
                  <input
                    disabled={inputsDisabled}
                    type="number"
                    placeholder="0324589678"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </div>
              </div>
              {toggleSubmit2 && (
                <button
                  className={
                    pageAction2 === "Enregistrer" ? "cta green" : "cta"
                  }
                  onClick={handleModifierClick2}
                  style={{
                    margin: "12px auto",
                  }}
                >
                  {loadingEnrepris
                    ? "Chargement..."
                    : errorEnrepris
                    ? "Erreur"
                    : "Enregistrer"}
                </button>
              )}
            </form>
            {!toggleSubmit2 && (
              <button
                className={pageAction2 === "Enregistrer" ? "cta green" : "cta"}
                onClick={handleModifierClick2}
                style={{
                  width: "200px",
                  margin: "0",
                }}
              >
                {pageAction2}
              </button>
            )}
          </div>
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
              {mods.map((mod) => (
                <tr key={mod.id}>
                  <td>{mod.id}</td>
                  <td>
                    {mod.nom} {mod.prenom}
                  </td>
                  <td>{mod.email}</td>
                  <td>{mod.telephone}</td>
                  <td>{mod.role}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        getSingleMod(mod.id);
                        setShowEditModer({
                          id: mod.id,
                        });
                      }}
                    >
                      <img src="../assets/admin_edit.svg" />
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        deleteMod(mod.id);
                      }}
                    >
                      <img src="../assets/admin_delete.svg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                // disabled={pages === 0 ? 1 : Math.ceil(pages / 5)}
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
        </div>
      )}
      {showAddModer && (
        <div className="pop_up_container">
          <div className="pop_up edit etat">
            <h5 className="input_pop_title">Nouveau modérateur</h5>
            <form onSubmit={addMode}>
              <div className="admin_inputs_pop_up">
                <div className="input_container2 half">
                  <label>Nom</label>
                  <input
                    type="text"
                    placeholder="Patrick"
                    onChange={(e) => {
                      setModeNom(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Prénom </label>
                  <input
                    type="text"
                    placeholder="Nicholas"
                    onChange={(e) => {
                      setModePrenom(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Téléphone</label>
                  <input
                    type="number"
                    placeholder="01124548870"
                    onChange={(e) => {
                      setModePhone(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="imane@gmail.com"
                    onChange={(e) => {
                      setModeEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Profil</label>
                  <select
                    onChange={(e) => {
                      setModeProfil(e.target.value);
                    }}
                  >
                    <option value="">Choisir</option>
                    <option value="admin">Admin</option>
                    <option value="observer">Observateur</option>
                  </select>
                </div>
                <div className="input_container2 half">
                  <label>Nouveau mot de passe</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        setModePassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <button className="cta">Ajouter</button>
            </form>
            <img
              className="hide_btn"
              onClick={() => setShowAddModer(false)}
              src="../assets/x.svg"
            />
          </div>
        </div>
      )}

      {showEditModer && (
        <div className="pop_up_container">
          <div className="pop_up edit etat">
            <h5 className="input_pop_title">Modifier modérateur</h5>
            <form
              onSubmit={(e) => {
                updateMode(e, showEditModer.id);
              }}
            >
              <div className="admin_inputs_pop_up">
                <div className="input_container2 half">
                  <label>Nom</label>
                  <input
                    type="text"
                    placeholder="Patrick"
                    value={modeNom}
                    onChange={(e) => {
                      setModeNom(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Prénom </label>
                  <input
                    type="text"
                    placeholder="Nicholas"
                    value={modePrenom}
                    onChange={(e) => {
                      setModePrenom(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Téléphone</label>
                  <input
                    type="text"
                    placeholder="01124548870"
                    value={modePhone}
                    onChange={(e) => {
                      setModePhone(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="imane@gmail.com"
                    value={modeEmail}
                    onChange={(e) => {
                      setModeEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2 half">
                  <label>Profil</label>
                  <select
                    value={modeProfil}
                    onChange={(e) => {
                      setModeProfil(e.target.value);
                    }}
                  >
                    <option value="">Choisir</option>
                    <option value="admin">Admin</option>
                    <option value="observer">Observateur</option>
                  </select>
                </div>
                <div className="input_container2 half">
                  <label>Nouveau mot de passe</label>
                  <div className="password-input">
                    <input type={showPassword ? "text" : "password"} />
                  </div>
                </div>
              </div>
              <button className="cta">Modifier</button>
            </form>
            <img
              className="hide_btn"
              onClick={() => setShowEditModer(false)}
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
          <form onSubmit={updateConfig}>
            <div className="admin_inputs_cards settings">
              <div className="admin_inputs">
                <div className="input_container2">
                  <label>Prix par heure</label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="Patrick"
                    value={pricePerHour}
                    onChange={(e) => {
                      setPricePerHour(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2">
                  <label>Durée du cours hebdomadaire </label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="Nicholas"
                    value={dureeCours}
                    onChange={(e) => {
                      setDureeCours(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2">
                  <label>Nombre d’élèves par classe</label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="01124548870"
                    value={maxEleve}
                    onChange={(e) => {
                      setMaxEleve(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2">
                  <label>Pencentage de la pltaforme</label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="imane@gmail.com"
                    value={pourcentagePlatforme}
                    onChange={(e) => {
                      setPourcentagePlatforme(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2">
                  <label>TVA </label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="test test"
                    value={tva}
                    onChange={(e) => {
                      setTva(e.target.value);
                    }}
                  />
                </div>
                <div className="input_container2">
                  <label>Annuler le cous avant:</label>
                  <input
                    disabled={inputsDisabled}
                    type="text"
                    placeholder="test"
                    value={dureeAvantAnnulation}
                    onChange={(e) => {
                      setDureeAvantAnnulation(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="Enregistrement_swich">
                <h4>Enregistrement</h4>
                <div>
                  <input
                    name="Enregistrement"
                    value="Activé"
                    type="radio"
                    checked={enregistrement ? true : false}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setEnregistrement(true);
                    }}
                  />
                  <label htmlFor="Enregistrement">Activé</label>
                </div>
                <div>
                  <input
                    name="Enregistrement"
                    value="Désactivé"
                    type="radio"
                    checked={!enregistrement ? true : false}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setEnregistrement(false);
                    }}
                  />
                  <label htmlFor="Enregistrement">Désactivé</label>
                </div>
              </div>
            </div>
            {toggleSubmit3 && (
              <button className="cta green" onClick={handleModifierClick3}>
                {loadingConfig
                  ? "Chargement..."
                  : errorConfig
                  ? "Erreur"
                  : "Enregistrer"}
              </button>
            )}
          </form>
          {!toggleSubmit3 && (
            <button
              className={pageAction3 === "Enregistrer" ? "cta green" : "cta"}
              onClick={handleModifierClick3}
              style={{
                width: "200px",
              }}
            >
              {pageAction3}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Settings;
