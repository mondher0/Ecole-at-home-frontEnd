/* eslint-disable no-unused-vars */
import React from "react";
import "../css/ChercherUnCours.css";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";

const ChercherUnCours = () => {
  const { niveau, matiere, handleSearch, professeurs } =
    useContext(SearchContext);
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [selectedMatiere, setSelectedMatiere] = useState("");
  console.log(professeurs);

  const handleNiveauChange = (e) => {
    setSelectedNiveau(e.target.value);
  };
  const handleMatiereChange = (e) => {
    setSelectedMatiere(e.target.value);
  };

  return (
    <div className="container">
      <form className="search_form chercher_cours_form" onSubmit={handleSearch}>
        <div className="hero_input">
          <h4>NIVEAU</h4>
          <select
            className="left"
            value={selectedNiveau}
            onChange={handleNiveauChange}
          >
            <option value="">Séléctioner</option>
            {niveau.map((level) =>
              level.classes.map((classe) => (
                <option key={classe.id} value={classe.name}>
                  {level.name} - {classe.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="hero_input">
          <h4>MATIERE</h4>
          <select
            className="right"
            value={selectedMatiere}
            onChange={handleMatiereChange}
          >
            <option value="">Séléctioner</option>
            {matiere.map((mat) => (
              <option key={mat.id} value={mat.name}>
                {mat.name}
              </option>
            ))}
          </select>
        </div>
        <button className="hero_search_btn">RECHERCHER</button>
      </form>
        <div className="professeurs">
        {
            professeurs && professeurs.items.map((prof) => (
                <div className="professeur" key={prof.id}>{prof.id}</div>
            ))

        }
        </div>
    </div>
  );
};

export default ChercherUnCours;
