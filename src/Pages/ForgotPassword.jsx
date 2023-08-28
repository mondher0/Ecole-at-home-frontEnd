/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURl } from "../utils/utils";
import { succe } from "../assets/index";

const ForgotPassword = () => {
  const [isSend, setIsSend] = useState("email");
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // reset password
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  // send code to email
  const sendCode = async (e) => {
    e.preventDefault();
    try {
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
      console.log(error);
    }
  };

  // verify otp
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
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
      console.log(error);
    }
  };
  return (
    <div className="container login_container">
      {isSend === "code" ? (
        <fieldset
          style={{
            padding: "3rem",
          }}
        >
          <form onSubmit={verifyOtp}>
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
            <div
              className="input_container"
              style={{
                marginTop: "0",
                borderRadius: "20px",
                border: "1px solid #43546E",
              }}
            >
              <label htmlFor="code">Code de vérification</label>
              <input
                type={"text"}
                name="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              ></input>
            </div>

            <button
              className="login_btn"
              style={{
                marginTop: "3rem",
              }}
            >
              {isLoaded ? "Chargement..." : "Vérifier le code"}
            </button>
          </form>
        </fieldset>
      ) : isSend === "email" ? (
        <fieldset
          style={{
            padding: "3rem",
          }}
        >
          <form onSubmit={sendCode}>
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
            <div
              className="input_container"
              style={{
                marginTop: "0",
                borderRadius: "20px",
                border: "1px solid #43546E",
              }}
            >
              <label htmlFor="email">Email</label>
              <input
                type={"email"}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>

            <button
              className="login_btn"
              style={{
                marginTop: "3rem",
              }}
            >
              {isLoaded ? "Chargement..." : "Envoyer le code de vérification"}
            </button>
          </form>
        </fieldset>
      ) : (
        <>
          {success ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                height: "100vh",
              }}
            >
              <img src={succe} alt="success" />
              <h3
                style={{
                  textAlign: "center",
                  color: "#2BB04A",
                  fontSize: "18px",
                }}
              >
                Votre mot de passe a été changé avec succès
              </h3>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                style={{
                  marginTop: "3rem",
                  borderRadius: "40px",
                  backgroundColor: "#0078D4",
                  border: "none",
                  boxShadow: "4px 4px 4px 0px rgba(0, 120, 212, 0.25)",
                  color: "white",
                  padding: "1rem 2rem",
                  fontWeight: "bold",
                }}
              >
                Retourner vers la page de connexion
              </button>
            </div>
          ) : (
            <div className="container login_container">
              <fieldset
                style={{
                  padding: "3rem",
                }}
              >
                <form onSubmit={resetPassword}>
                  <div
                    className="input_container password-input"
                    style={{
                      marginTop: "0",
                      borderRadius: "20px",
                      border: "1px solid #43546E",
                      display: "flex",
                    }}
                  >
                    <label htmlFor="new">Nouveau mot de passe</label>
                    <input
                      type={"password"}
                      name="new"
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div
                    className="input_container"
                    style={{
                      marginTop: "20px",
                      borderRadius: "20px",
                      border: "1px solid #43546E",
                    }}
                  >
                    <label htmlFor="conf">Confirmer le mot de passe</label>
                    <input
                      type={"password"}
                      name="conf"
                      required
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    ></input>
                  </div>

                  <button
                    className="login_btn"
                    style={{
                      marginTop: "3rem",
                    }}
                  >
                    Changer le mot de passe
                  </button>
                </form>
              </fieldset>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
