/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState, useEffect } from "react";
import { baseURl } from "../utils/utils";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [niveau, setNiveau] = useState([]);
  const [matiere, setMatiere] = useState([]);
  const [professeurs, setProfesseurs] = useState();
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [selectedMatiere, setSelectedMatiere] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const[result, setResult] = useState(false);

  //Get Niveau and Matiere
  const getMatiereAndNiveau = async () => {
    try {
      const niveauResponse = await fetch(`${baseURl}/niveau`);
      const matiereResponse = await fetch(`${baseURl}/matiere`);
      const niveauData = await niveauResponse.json();
      const matiereData = await matiereResponse.json();
      setNiveau(niveauData);
      setMatiere(matiereData);
    } catch (error) {
      console.log(error);
    }
  };

  //Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedMatiere || !selectedNiveau) {
      setMessage(true);
      return;
    }
    try {
      setMessage(false);
      setIsLoading(true);
      const response = await fetch(
        `${baseURl}/professeurs?page=1&pageSize=10&classe=${selectedNiveau}&matiere=${selectedMatiere}`
      );
      const professeurs = await response.json();
      if (professeurs.items.length === 0) {
        setResult(true);
      }
      setProfesseurs(professeurs.items);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatiereAndNiveau();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        niveau,
        matiere,
        handleSearch,
        professeurs,
        setProfesseurs,
        selectedNiveau,
        setSelectedNiveau,
        selectedMatiere,
        setSelectedMatiere,
        isLoading,
        message,
        result,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default SearchProvider;
