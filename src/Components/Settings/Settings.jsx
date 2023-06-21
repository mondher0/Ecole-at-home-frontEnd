// eslint-disable-next-line no-unused-vars
import React from "react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Parent } from "../../assets/index";
import AddingEnfantForm from "../AddingEnfantForm/AddingEnfantForm";

const Settings = () => {
  const { userInfo } = useContext(GlobalContext);
  console.log(userInfo);
  const { role } = userInfo;
  const [email, setEmail] = useState(userInfo.email);
  return (
    <div className="Settings">
      <fieldset>
        <form>
          <div className="input_container half">
            <label htmlFor="Nom">Nom</label>
            <input placeholder="kk" type={"text"} name="Nom"></input>
          </div>
          <div className="input_container half">
            <label htmlFor="Prénom">Prénom</label>
            <input placeholder="kk" type={"text"} name="Prénom"></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Email</label>
            <input
              // disabled={false}
              style={{
                color: "black",
                fontWeight: "bold",
              }}
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Email</label>
            <input placeholder="kk" type={"email"} name="email"></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Email</label>
            <input placeholder="kk" type={"email"} name="email"></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Email</label>
            <input placeholder="kk" type={"email"} name="email"></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Email</label>
            <input placeholder="kk" type={"email"} name="email"></input>
          </div>
          <div className="input_container half">
            <label htmlFor="email">Email</label>
            <input placeholder="kk" type={"email"} name="email"></input>
          </div>
          <button
            style={{
              width: "200px",
              marginTop: "10px",
            }}
          >
            Enregistre
          </button>
        </form>
      </fieldset>
      {role === "parent" && (
        <>
          <h1
            style={{
              marginTop: "20px",
            }}
          >
            Mes Enfants
          </h1>
          <div
            className="enfants"
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <div
              className="user_type_card"
              style={{
                marginBottom: "20px",
                marginTop: "10px",
              }}
            >
              <img src={Parent} />
              Khaled
              <div className="bg"></div>
              <div className="tools"></div>
            </div>
            <div
              className="user_type_card"
              style={{
                marginBottom: "20px",
                marginTop: "10px",
              }}
            >
              <img src={Parent} />
              Khaled
              <div className="bg"></div>
              <div className="tools"></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("demCours").showModal();
                }}
                style={{
                  padding: "10px",
                  borderColor: "#0078D4",
                  borderRadius: "30px",
                  backgroundColor: "transparent",
                  color: "#0078D4",
                }}
              >
                Ajouter un enfant
              </button>
            </div>
          </div>
        </>
      )}
      <dialog style={{ border: 0, borderRadius: "20px" }} id="demCours">
        <AddingEnfantForm />
      </dialog>
    </div>
  );
};

export default Settings;
