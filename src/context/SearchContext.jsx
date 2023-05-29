/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState, useEffect } from "react";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [niveau, setNiveau] = useState([]);
  const [matiere, setMatiere] = useState([]);
  const [professeurs, setProfesseurs] = useState();

  const baseURl = "http://localhost:9999/api";

  //Get Niveau and Matiere
  const getMatiereAndNiveau = async () => {
    try {
      const niveauResponse = await fetch(`${baseURl}/niveau`);
      const matiereResponse = await fetch(`${baseURl}/matiere`);
      const niveauData = await niveauResponse.json();
      const matiereData = await matiereResponse.json();
      console.log(niveauData);
      console.log(matiereData);
      setNiveau(niveauData);
      setMatiere(matiereData);
    } catch (error) {
      console.log(error);
    }
  };

  //Search
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${baseURl}/professeurs?page=1&pageSize=10`);
      const professeurs = await response.json();
      console.log("hello", professeurs);
      setProfesseurs(professeurs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatiereAndNiveau();
  }, []);

  return (
    <SearchContext.Provider
      value={{ niveau, matiere, handleSearch, professeurs, setProfesseurs }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default SearchProvider;
