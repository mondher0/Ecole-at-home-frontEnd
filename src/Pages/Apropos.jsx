/* eslint-disable no-unused-vars */
import { useContext } from "react";
import "../App.css";
import Footer from "../Components/Footer/Footer";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { aPropos1 } from "../assets/index";
import "../css/apropos.css";

const Apropos = () => {
  const navigate = useNavigate();
  const {
    niveau,
    matiere,
    selectedNiveau,
    setSelectedNiveau,
    selectedMatiere,
    setSelectedMatiere,
    handleSearch,
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
    <>
      <div>
        <div className="hero_section">
          <div className="container h_s_container">
            <h1>
              Soutien scolaire en direct avec un professeur{" "}
              <span className="half_bg">100% en ligne</span>
              <br></br>
              <span>
                Tarif unique <span className="price">14 €/h</span>
              </span>
            </h1>

            <h2>
              Premier cours d’essai 2 heures GRATUIT !<br></br>
              <span>Sans aucun engagement</span>
            </h2>

            <h2>
              Formule hebdomadaire<br></br>
              <span>
                2 heures par semaine pour chaque matière<br></br>
                Mini classe de 5 élèves
              </span>
            </h2>

            <div className="hero_form">
              <h3 className="hero_form_title">Trouvez votre professeur</h3>
              <form
                className="search_form"
                onSubmit={(e) => {
                  handleSearch(e);
                  navigate("/chercher-un-cours");
                }}
              >
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
            </div>
          </div>
        </div>

        <div className="container">
          <div className="section">
            <div className="apropos1">
              <img src={aPropos1} />
            </div>
            <div className="text">
              <h3>You’re in good hands</h3>
              <p>
                Torquatos nostros? quos dolores eos, qui dolorem ipsum per se
                texit, ne ferae quidem se repellere, idque instituit docere sic:
                omne animal, simul atque integre iudicante itaque aiunt hanc
                quasi involuta aperiri, altera occulta quaedam et voluptatem
                accusantium doloremque. Torquatos nostros? quos dolores eos, qui
                dolorem ipsum per se texit, ne ferae quidem se repellere, idque
                instituit docere sic: omne animal, simul atque integre iudicante
                itaque aiunt hanc quasi involuta aperiri, altera occulta quaedam
                et voluptatem accusantium doloremque. Torquatos nostros? quos
                dolores eos, qui dolorem ipsum per se texit, ne ferae quidem se
                repellere, idque instituit docere sic: omne animal, simul atque
                integre iudicante itaque aiunt hanc quasi involuta aperiri,
                altera occulta quaedam et voluptatem accusantium doloremque.
                Torquatos nostros? quos dolores eos, qui dolorem ipsum per se
                texit, ne ferae quidem se repellere, idque instituit docere sic:
                omne animal, simul atque integre iudicante itaque aiunt hanc
                quasi involuta aperiri, altera occulta quaedam et voluptatem
                accusantium doloremque. Torquatos nostros? quos dolores eos, qui
                dolorem ipsum per se texit, ne ferae quidem se repellere, idque
                instituit docere sic: omne animal, simul atque integre iudicante
                itaque aiunt hanc quasi involuta aperiri, altera occulta quaedam
                et voluptatem accusantium doloremque. Torquatos nostros? quos
                dolores eos, qui dolorem ipsum per se texit, ne ferae quidem se
                repellere, idque instituit docere sic: omne animal, simul atque
                integre iudicante itaque aiunt hanc quasi involuta aperiri,
                altera occulta quaedam et voluptatem accusantium doloremque.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Apropos;
