import axiosInstance, { baseURl } from "../utils/utils";
import "../css/loader.css";
import { useState } from "react";

const SuspendreAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  // valider payment
  const validerPayment = async () => {
    try {
      setError(false);
      setIsLoading(true);
      const res = await axiosInstance.get(`${baseURl}/payment/retry-payment`);
      console.log(res);
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="card-container">
      <fieldset className="card">
        <legend>
          {success
            ? "Votre compte a été activé"
            : "Votre compte a été suspendu"}
        </legend>
        <div className="card-content">
          {success ? (
            <p className="not-found-message">
              Profitez de nos cours en ligne pour améliorer votre niveau
              scolaire
            </p>
          ) : (
            <p className="not-found-message">
              Votre compte a été suspendu par l’administrateur de l’ecole at
              home Merci de valider votre payment pour réactiver votre compte
            </p>
          )}
        </div>
        {!success && (
          <button
            className="btn btn-primary"
            onClick={() => {
              validerPayment();
            }}
          >
            {isLoading ? (
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            ) : error ? (
              "Réessayer"
            ) : (
              "Valider le payment"
            )}
          </button>
        )}
      </fieldset>
    </div>
  );
};

export default SuspendreAccount;
