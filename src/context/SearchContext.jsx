/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState, useEffect } from "react";
import { baseURl } from "../utils/utils";
import axios from "axios";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [niveau, setNiveau] = useState([]);
  const [matiere, setMatiere] = useState([]);
  const [professeurs, setProfesseurs] = useState();
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [selectedMatiere, setSelectedMatiere] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [result, setResult] = useState(false);

  //Get Niveau and Matiere
  const getMatiereAndNiveau = async () => {
    try {
      const niveauResponse = await fetch(`${baseURl}/niveau`);
      const niveauData = await niveauResponse.json();
      setNiveau(niveauData);
      console.log(niveauData);
    } catch (error) {
      console.log(error);
    }
  };

  // get matiere by niveau id
  const getMatiereByNiveau = async (id) => {
    try {
      const response = await axios.get(
        `${baseURl}/matiere/find-by-niveau/${id}`
      );
      setMatiere(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Search
  const handleSearch = async (e) => {
    console.log(selectedMatiere, selectedNiveau);
    e.preventDefault();
    if (!selectedMatiere || !selectedNiveau) {
      setMessage(true);
      return;
    }
    try {
      setMessage(false);
      setIsLoading(true);
      console.log(selectedMatiere, selectedNiveau);
      const response = await axios.get(
        `${baseURl}/abonnement/search/${selectedMatiere}`
      );
      console.log(response);
      setProfesseurs(response.data);
      if (professeurs?.length === 0) {
        setResult(true);
      }
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
        getMatiereByNiveau,
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
        setMatiere,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export default SearchProvider;
