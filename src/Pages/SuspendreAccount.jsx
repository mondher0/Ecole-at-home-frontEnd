import axiosInstance, { baseURl } from "../utils/utils";
import "../css/loader.css";
import { useState } from "react";

const SuspendreAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // redirect to stripe
  const redirectToStripe = async () => {
    try {
      setError(false);
      setIsLoading(true);
      const res = await axiosInstance.get(
        `${baseURl}/payment/add-payment-method`
      );
      console.log(res);
      setIsLoading(false);
      window.location.href = res.data.url;
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="card-container">
      <fieldset className="card">
        <legend>Votre compte a été suspendu</legend>
        <div className="card-content">
          <p className="not-found-message">
            Votre compte a été suspendu par l’administrateur de l’ecole at home
            Merci de ajouter votre carte bancaire pour réactiver votre compte
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            redirectToStripe();
          }}
        >
          {isLoading ? (
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            "Réessayer"
          ) : (
            "Continuer avec stripe"
          )}
        </button>
      </fieldset>
    </div>
  );
};

export default SuspendreAccount;
