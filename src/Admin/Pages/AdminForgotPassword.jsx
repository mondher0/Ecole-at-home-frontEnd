/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { baseURl } from "../../utils/utils";

const AdminForgotPassowrd = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSend, setIsSend] = useState("email");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const Navigate = useNavigate();

  // send code to email
  const sendCode = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setIsLoaded(true);
      const data = {
        email: email,
      };
      const response = await axios.post(
        `${baseURl}/auth/forgot-password`,
        data
      );
      console.log(response);
      setIsSend("code");
      setIsLoaded(false);
    } catch (error) {
      setIsLoaded(false);
      setError(error.response?.data.message);
      console.log(error);
    }
  };

  // verify otp
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setIsLoaded(true);
      const data = {
        email: email,
        otp: code,
      };
      const response = await axios.post(`${baseURl}/auth/verify-otp`, data);
      console.log(response);
      setIsSend(false);
      setIsLoaded(false);
    } catch (error) {
      setIsLoaded(false);
      setError(error.response?.data.message);
      console.log(error);
    }
  };

  // reset password
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setIsLoaded(true);
      const data = {
        email: email,
        otp: code,
        password: password,
      };
      console.log(data);
      const response = await axios.post(`${baseURl}/auth/reset-password`, data);
      console.log(response);
      setIsLoaded(false);
      setSuccess(true);
      window.location.href = "/admin/login";
    } catch (error) {
      setIsLoaded(false);
      setError(error.response?.data.message);
      console.log(error);
    }
  };

  // toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {isSend === "email" ? (
        <div className="container admin_login">
          <div className="logo_section">
            <img src="../assets/au_logo.svg" />
          </div>
          <form onSubmit={sendCode}>
            <fieldset className="admin_fieldset">
              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.5",
                  margin: "1rem",
                  color: " #43546E",
                }}
              >
                Entrez l’adresse email que vous souhaitez recevoire le code de
                vérification.
              </p>
              <div className="input_container2">
                <label>Adresse email</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              {error && <h5 className="form_error">{error}</h5>}
              <button type="submit">
                {" "}
                {isLoaded ? "Chargement..." : "Envoyer le code de vérification"}
              </button>
            </fieldset>
          </form>
        </div>
      ) : isSend === "code" ? (
        <div className="container admin_login">
          <div className="logo_section">
            <img src="../assets/au_logo.svg" />
          </div>
          <form onSubmit={verifyOtp}>
            <fieldset className="admin_fieldset">
              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.5",
                  margin: "1rem",
                  color: " #43546E",
                }}
              >
                Entrez le code envoyé à l’adresse email que vous avez saisie
              </p>
              <div className="input_container2">
                <label>Code de vérification </label>
                <input
                  type={"text"}
                  name="code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
              </div>
              {error && <h5 className="form_error">{error}</h5>}
              <button type="submit">
                {isLoaded ? "Chargement..." : "Vérifier le code"}
              </button>
            </fieldset>
          </form>
        </div>
      ) : (
        <div className="container admin_login">
          <div className="logo_section">
            <img src="../assets/au_logo.svg" />
          </div>
          <form onSubmit={resetPassword}>
            <fieldset className="admin_fieldset">
              <div className="input_container2">
                <label>Nouveau mot de passe</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
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
              <div className="input_container2">
                <label>Réécrire le mot de passe </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
              {error && <h5 className="form_error">{error}</h5>}
              <button type="submit">
                {isLoaded ? "Chargement..." : "Réinitialiser le mot de passe"}
              </button>
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
};

export default AdminForgotPassowrd;
