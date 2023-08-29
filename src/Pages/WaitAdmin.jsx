import "../css/NoResult.css";

const WaitAdmin = () => {
  return (
    <div className="card-container">
      <fieldset className="card">
        <legend>Validation de votre compte</legend>
        <div className="card-content">
          <p className="not-found-message">
            Votre demande d’inscription a été envoyée au proviseur de
            l’ecoleathome Vous allez recevoir bientot un email de pour
            l’activation de votre compte Merci de votre inscription
          </p>
        </div>
      </fieldset>
    </div>
  );
};

export default WaitAdmin;
