import { errorLogo } from "../assets";
import "../css/Error.css";
const ErrorPage = () => {

  return (
    <div className="error_container">
      <img src={errorLogo} />
      <h1>Oops erreur 404 !</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
        elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus
        . Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
        scelerisque ante{" "}
      </p>
      <button className="error-btn" onClick={() => {
        window.location.href = "/";
      }}>Retourner vers l’acceuil</button>
    </div>
  );
};

export default ErrorPage;
