/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isSend, setIsSend] = useState(false);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="container login_container">
      {isSend ? (
        <fieldset
          style={{
            padding: "3rem",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/new-password");
            }}
          >
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
              Vérifier le code
            </button>
          </form>
        </fieldset>
      ) : (
        <fieldset
          style={{
            padding: "3rem",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSend(true);
            }}
          >
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
              Envoyer le code
            </button>
          </form>
        </fieldset>
      )}
    </div>
  );
};

export default ForgotPassword;
