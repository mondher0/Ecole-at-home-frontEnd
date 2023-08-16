/* eslint-disable no-unused-vars */
import React from "react";
import "../css/ChercherUnCours.css";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import TimingCard from "../Components/TimingCard/TimingCard";

const ChercherUnCours = () => {
  const {
    niveau,
    matiere,
    handleSearch,
    professeurs,
    timings,
    selectedNiveau,
    setSelectedNiveau,
    selectedMatiere,
    setSelectedMatiere,
    isLoading,
    message,
    result,
    getMatiereByNiveau,
    setMatiere,
  } = useContext(SearchContext);

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
            onChange={(e) => {
              setSelectedNiveau(e.target.value);
              console.log(e.target.value);
              if (e.target.value === "") {
                setSelectedMatiere("");
                setMatiere();
                return;
              }
              getMatiereByNiveau(e.target.value);
              console.log("hello");
            }}
          >
            <option value="">Séléctioner</option>
            {niveau.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hero_input">
          <h4>MATIERE</h4>
          <select
            className="right"
            value={selectedMatiere}
            onChange={handleMatiereChange}
          >
            <option value="">
              {selectedNiveau === ""
                ? "Séléctioner le niveau d'abord"
                : "Séléctioner"}
            </option>
            {matiere?.map((mat) => (
              <option key={mat.id} value={mat.id}>
                {mat.name}
              </option>
            ))}
          </select>
        </div>
        <button className="hero_search_btn">RECHERCHER</button>
      </form>
      <div className="timing_cards">
        {professeurs?.length === 1 ? (
          <TimingCard
            key={professeurs[0].id}
            item={professeurs[0]}
            timings={timings}
          />
        ) : professeurs?.length > 1 ? (
          professeurs?.map((prof) => (
            <TimingCard key={prof.id} item={prof} timings={timings} />
          ))
        ) : (
          <h1
            style={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            {" "}
            {message && "Veuillez séléctioner un niveau et une matière"}
            {isLoading && "Chargement..."}
            {result && "Aucun résultat trouvé"}
          </h1>
        )}
      </div>
    </div>
  );
};

export default ChercherUnCours;
