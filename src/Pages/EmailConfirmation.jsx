/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import "../css/NoResult.css";
import { baseURl } from "../utils/utils";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "../css/loader.css";

const EmailConfirmation = () => {
  const [params, setParams] = useSearchParams();
  const token = params.get("token");
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  // verify email
  const verifyEmail = async () => {
    if (token) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURl}/auth/confirm-email?token=${token}`
        );
        console.log(response);
        setVerify(true);
        setLoading(false);
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "/login";
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);
  return (
    <div className="card-container">
      <fieldset className="card">
        {loading ? (
          <div
            className="spinner-container"
            style={{
              marginTop: "20px",
            }}
          >
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            <legend>
              {verify
                ? "Votre email a été vérifié avec succès"
                : "Vérification de votre email"}{" "}
            </legend>
            <div className="card-content">
              <p className="not-found-message">
                {verify
                  ? "Votre adresse e-mail est maintenant confirmée. Profitez pleinement de votre cours !"
                  : "  Vous y êtes presque ! Cliquez sur le lien de confirmation quenous avons envoyé à votre adresse email Confirmez votre adresse-mail et vous pourrez commencer votre cours"}
              </p>
            </div>
          </>
        )}
      </fieldset>
    </div>
  );
};

export default EmailConfirmation;
