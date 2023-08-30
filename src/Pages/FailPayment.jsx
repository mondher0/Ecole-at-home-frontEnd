const FailPayment = () => {
  return (
    <div className="card-container">
      <fieldset className="card">
        <legend>Carte non ajoutée</legend>
        <div className="card-content">
          <p className="not-found-message">
            Votre carte n{"'"}a pas été ajoutée un problème est survenu
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Réessayer
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            marginTop: "10px",
          }}
        >
          Retourner à la page d{"'"}accueil
        </button>
      </fieldset>
    </div>
  );
};

export default FailPayment;
