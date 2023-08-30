const BloqueAccont = () => {
  return (
    <div className="card-container">
      <fieldset className="card">
        <legend>Votre compte a été bloqué</legend>
        <div className="card-content">
          <p className="not-found-message">
            Votre compte a été bloqué par l’administrateur de l’ecole at home
            Merci de nous contacter pour plus d’informations
          </p>
        </div>
      </fieldset>
    </div>
  );
};

export default BloqueAccont;
