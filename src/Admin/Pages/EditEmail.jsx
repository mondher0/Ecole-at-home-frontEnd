/* eslint-disable no-unused-vars */
import React from "react";
import "../css/EditEmail.css";
import {
  A,
  clip,
  addLink,
  emoji,
  drive,
  image,
  timeLock,
  pen,
  threeDots,
  deleteFill,
} from "../../assets/index";

const EditMail = () => {
  return (
    <div>
      <h3 className="current_page">
        <span>Emails</span>
        <span>{">"}</span>
        <span>Ajouter un modèle</span>
      </h3>
      <div className="email_editor">
        <div className="top_bar">Ercivez quelque chose...</div>
        <div className="email_content">
          <input type="text" placeholder="A" />
          <input type="text" placeholder="Object" />
          <textarea placeholder="Text ..."></textarea>
        </div>
        <div className="bottom_bar">
          <div className="tools">
            <button className="cta">Enregistrer</button>
            <img src={A} />
            <img src={clip} />
            <img src={addLink} />
            <img src={emoji} />
            <img src={drive} />
            <img src={image} />
            <img src={timeLock} />
            <img src={pen} />
            <div>
              <img src={threeDots} />
              <img src={deleteFill} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMail;
