import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AddingEnfantForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    handleRegisterParent,
    setNomEnfant,
    setPrenomEnfant,
    setEmailEnfant,
  } = useContext(AuthContext);
  return (
    <div className="pop_up_container">
      <div className="pop_up parent_sign_up p_s_kid">
        <img
          className="hide_btn"
          src="../assets/x.svg"
          onClick={() => {
            document.getElementById("demCours").close();
          }}
        />

        <fieldset
          style={{
            boxShadow: "none",
          }}
        >
          <form onSubmit={handleRegisterParent}>
            <h2 className="form_subtitle">
              Je renseigne les informations de mon&nbsp;<span>enfant</span>
              &nbsp;à inscrire{" "}
            </h2>
            <div className="input_container">
              <label htmlFor="Nom">Nom</label>
              <input
                type={"text"}
                name="Nom"
                onChange={(e) => {
                  setNomEnfant(e.target.value);
                }}
              ></input>
            </div>
            <div className="input_container">
              <label htmlFor="Prénom">Prénom</label>
              <input
                type={"text"}
                name="Prénom"
                onChange={(e) => {
                  setPrenomEnfant(e.target.value);
                }}
              ></input>
            </div>
            <ul>
              <li
                className="blue"
                style={{
                  marginTop: "20px",
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                  }}
                />
                Je veux rensigner{" "}
                <span
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  {" "}
                  l’email&nbsp;
                </span>{" "}
                de mon enfant{" "}
              </li>
              <li className="yallow">
                E-mail sur lequel sera envoyé le lien pour participer au cours
                en direct
              </li>
            </ul>
            {isChecked ? (
              <div className="input_container">
                <label htmlFor="email">Email</label>
                <input
                  type={"email"}
                  name="email"
                  onChange={(e) => {
                    setEmailEnfant(e.target.value);
                  }}
                ></input>
              </div>
            ) : null}
            <ul>
              <li className="yallow">
                Sinon, votre enfant peut rejoindre le cours en direct depuis
                votre espace personnel ecoleathome ou depuis votre e-mail
              </li>
            </ul>

            <button className="login">Ajouter</button>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default AddingEnfantForm;
