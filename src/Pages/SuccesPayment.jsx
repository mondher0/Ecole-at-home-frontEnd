const SuccesPayment = () => {
  return (
    <div className="card-container">
      <fieldset className="card">
        <legend>Carte ajoutée</legend>
        <div className="card-content">
          <p className="not-found-message">
            Votre carte a été ajoutée avec succès
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Retourner à la page d{"'"}accueil
        </button>
      </fieldset>
    </div>
  );
};

export default SuccesPayment;
