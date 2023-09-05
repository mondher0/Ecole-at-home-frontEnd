/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../Css/AdminLogin.css";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const {
    setAdminPassword,
    setAdminEmail,
    handleAdminLogin,
    error,
    isLoading,
    disabled,
  } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container admin_login">
      <div className="logo_section">
        <img src="../assets/au_logo.svg" />
      </div>
      <form onSubmit={handleAdminLogin}>
        <fieldset className="admin_fieldset">
          <div className="input_container2">
            <label>Adresse email</label>
            <input
              type="email"
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>
          <div className="input_container2">
            <label>Mot de passe</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <button
                type="button"
                className="aye_btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </button>
            </div>
          </div>
          <h5
            className="note"
            onClick={() => {
              Navigate("/admin/forgot-password");
            }}
          >
            Mot de passe oublié ?
          </h5>
          {error && <h5 className="form_error">{error}</h5>}
          <button type="submit" disabled={disabled}>
            {" "}
            {isLoading ? (
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              "Connexion"
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AdminLogin;
