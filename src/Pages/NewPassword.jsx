/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { succe } from "../assets/index";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {success ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            height: "100vh",
          }}
        >
          <img src={succe} alt="success" />
          <h3
            style={{
              textAlign: "center",
              color: "#2BB04A",
              fontSize: "18px",
            }}
          >
            Votre mot de passe a été changé avec succès
          </h3>
          <button
            onClick={() => {
              navigate("/login");
            }}
            style={{
              marginTop: "3rem",
              borderRadius: "40px",
              backgroundColor: "#0078D4",
              border: "none",
              boxShadow: "4px 4px 4px 0px rgba(0, 120, 212, 0.25)",
              color: "white",
              padding: "1rem 2rem",
              fontWeight: "bold",
            }}
          >
            Retourner vers la page de connexion
          </button>
        </div>
      ) : (
        <div className="container login_container">
          <fieldset
            style={{
              padding: "3rem",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSuccess(true);
              }}
            >
              <div
                className="input_container password-input"
                style={{
                  marginTop: "0",
                  borderRadius: "20px",
                  border: "1px solid #43546E",
                  display: "flex",
                }}
              >
                <label htmlFor="new">Nouveau mot de passe</label>
                <input type={"password"} name="new" required></input>
              </div>
              <div
                className="input_container"
                style={{
                  marginTop: "20px",
                  borderRadius: "20px",
                  border: "1px solid #43546E",
                }}
              >
                <label htmlFor="conf">Confirmer le mot de passe</label>
                <input type={"password"} name="conf" required></input>
              </div>

              <button
                className="login_btn"
                style={{
                  marginTop: "3rem",
                }}
              >
                Changer le mot de passe
              </button>
            </form>
          </fieldset>
        </div>
      )}
    </>
  );
};

export default NewPassword;
