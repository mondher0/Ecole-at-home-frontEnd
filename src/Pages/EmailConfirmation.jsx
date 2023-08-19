import { useSearchParams } from "react-router-dom";
import "../css/NoResult.css";

const EmailConfirmation = () => {
  const [params, setParams] = useSearchParams();
  console.log(params);
  return (
    <div className="card-container">
      <fieldset className="card">
        <legend>Confirmez votre adresse e-mail </legend>
        <div className="card-content">
          <p className="not-found-message">
            Vous y êtes presque ! Cliquez sur le lien de confirmation que nous
            avons envoyé à votre adresse email Confirmez votre adresse e-mail et
            vous pourrez commencer votre cours
          </p>
        </div>
      </fieldset>
    </div>
  );
};

export default EmailConfirmation;
