/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, setPassword, setEmail } = useContext(AuthContext);
  return (
    <>
      <div className="container login_container">
        <fieldset>
          <legend>Déjà inscrit ?</legend>
          <form onSubmit={handleLogin}>
            <div className="input_container">
              <label htmlFor="email">Email</label>
              <input
                type={"email"}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <div className="input_container">
              <label htmlFor="password">Mot de passe</label>
              <input
                type={"password"}
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <h5>Mot de passe oublié ?</h5>
            <h5 className="form_error"></h5>
            <button className="login_btn">Connexion</button>
          </form>
        </fieldset>

        <fieldset>
          <legend>Nouvelle inscription ?</legend>

          <button
            className="insc_btn"
            onClick={() => {
              navigate("/choose_user_type");
            }}
          >
            Sinscrire
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default Login;
