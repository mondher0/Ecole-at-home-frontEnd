/* eslint-disable no-unused-vars */
import { useContext } from "react";
import "../App.css";
import Footer from "../Components/Footer/Footer";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
          <div className="desc_section">
            <div className="desc_card">
              <ul className="text">
                <li>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99965 0C3.13391 0 0 3.13391 0 6.99965C0 10.8654 3.13391 14 6.99965 14C10.8654 14 14 10.8661 14 6.99965C13.9993 3.13391 10.8661 0 6.99965 0ZM1.40063 6.99965C1.40063 6.26438 1.54545 5.5363 1.82683 4.857C2.10821 4.17769 2.52063 3.56046 3.04055 3.04054C3.56046 2.52063 4.17769 2.10821 4.857 1.82683C5.5363 1.54545 6.26438 1.40063 6.99965 1.40063C7.73492 1.40063 8.463 1.54545 9.1423 1.82683C9.82161 2.10821 10.4388 2.52063 10.9588 3.04054C11.4787 3.56046 11.8911 4.17769 12.1725 4.857C12.4538 5.5363 12.5987 6.26438 12.5987 6.99965C12.5987 8.4846 12.0088 9.90874 10.9588 10.9588C9.90874 12.0088 8.4846 12.5987 6.99965 12.5987C5.5147 12.5987 4.09057 12.0088 3.04055 10.9588C1.99053 9.90874 1.40063 8.4846 1.40063 6.99965ZM9.94938 4.75724C10.0807 4.88857 10.1544 5.06667 10.1544 5.25236C10.1544 5.43806 10.0807 5.61616 9.94938 5.74749L6.79796 8.8989C6.66663 9.03019 6.48853 9.10395 6.30284 9.10395C6.11714 9.10395 5.93904 9.03019 5.80771 8.8989L4.40708 7.49827C4.27952 7.36619 4.20893 7.18929 4.21052 7.00567C4.21212 6.82205 4.28577 6.6464 4.41561 6.51656C4.54546 6.38672 4.72111 6.31306 4.90473 6.31147C5.08835 6.30987 5.26525 6.38046 5.39733 6.50803L6.30284 7.41354L8.95913 4.75724C9.09046 4.62595 9.26856 4.5522 9.45426 4.5522C9.63995 4.5522 9.81805 4.62595 9.94938 4.75724Z"
                      fill="#212121"
                    />
                  </svg>
                  Une formule simple est disponible
                </li>
                <li>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14Z"
                      stroke="#212121"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.50035 7.49783L6.05591 9.6645M7.50035 3.88672V7.49783"
                      stroke="#212121"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  2 heure en direct avec professeur par semaine pour chaque
                  matière
                </li>
                <li>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 0C3.11111 0 0 3.11111 0 7C0 10.8889 3.11111 14 7 14C10.8889 14 14 10.8889 14 7C14 3.11111 10.8889 0 7 0ZM7 12.4444C3.96667 12.4444 1.55556 10.0333 1.55556 7C1.55556 3.96667 3.96667 1.55556 7 1.55556C10.0333 1.55556 12.4444 3.96667 12.4444 7C12.4444 10.0333 10.0333 12.4444 7 12.4444ZM3.88889 6.22222V7.77778H10.1111V6.22222H3.88889Z"
                      fill="#212121"
                    />
                  </svg>
                  Résilier votre abonnement à tout moment
                </li>
              </ul>
              <img src="./assets/desc_img01.svg" />
            </div>
            <div className="desc_card">
              <ul className="text">
                <li>
                  <img src="./assets/click_icon.svg" />
                  Annuler le cours sur simple clic
                </li>
                <li>
                  <img src="./assets/dollar_cercle.svg" />
                  Sans aucun frais
                </li>
                <li>
                  <img src="./assets/interrogation_cercle.svg" />
                  Sans aucun justificatif
                </li>
              </ul>
              <img src="./assets/CloudClick.svg" />
            </div>
            <div className="desc_card">
              <ul className="text">
                <li>
                  <img src="./assets/Vector-2.svg" />
                  Des professeurs Francais
                </li>
                <li>
                  <img src="./assets/Vector-1.svg" />
                  Processus de sélection
                </li>
                <li>
                  <img src="./assets/Vector.svg" />
                  Programme officiel de léducation nationale du primaire au
                  lycée
                </li>
              </ul>
              <img src="./assets/Parent.svg" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="features_section">
            <h2>
              Ecole<span>@</span>home
            </h2>
            <div className="features">
              <div className="feature">
                <img src="./assets/feature01.svg" />
                <h4>Support</h4>
                <ul>
                  <li>
                    Accès aux enregistrements vidéo des cours suivis par
                    téléphone, tablette et ordinateur
                  </li>
                </ul>
              </div>
              <div className="feature">
                <img src="./assets/feature02.svg" />
                <h4>Stratégie pédagogique</h4>
                <ul>
                  <li>Le plaisir d’apprendre</li>
                  <li>Pourquoi apprendre</li>
                  <li>Apprendre à apprendre</li>
                </ul>
              </div>
              <div className="feature">
                <img src="./assets/feature03.svg" />
                <h4>Professeur</h4>
                <ul>
                  <li>Formation professeur</li>
                  <li>Vérification d’identité</li>
                  <li>Casier judiciaire vide</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="video_section">
            <h2>Cours en direct et vidéos de haute qualité</h2>
            <img src="./assets/video_section_img.png" />
            <div className="cards_bg">
              <div className="cards">
                <div className="card">
                  <div className="icon">
                    <img src="./assets/direct.svg" />
                  </div>
                  <h5>Cours en direct</h5>
                </div>
                <div className="card">
                  <div className="icon">
                    <img src="./assets/Vector(3).svg" />
                  </div>
                  <h5>Cours video</h5>
                </div>
                <div className="card">
                  <div className="icon">
                    <img src="./assets/Vector(3) (copy 1).svg" />
                  </div>
                  <h5>Suivi personnalisé</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="marche">
            <h2>Comment ça marche</h2>
            <div className="march_cards">
              <div className="card">
                <img src="./assets/N1.svg" />
                <h5>Inscription & Cours essai</h5>
                <p>
                  Réserver votre cours dessai gratuit avec votre enseignant et
                  lhoraire souhaité
                </p>
              </div>
              <div className="card">
                <img src="./assets/N2.svg" />
                <h5>Assistance</h5>
                <p>
                  Assistez-vous au cours via le lien disponible sur votre espace
                  personnel ou récu par email
                </p>
              </div>
              <div className="card">
                <img src="./assets/N3.svg" />
                <h5>Abonnement</h5>
                <p>
                  Compléter votre abonnment et renseigner votre carte bancaire
                </p>
              </div>
              <div className="card">
                <img src="./assets/N4.svg" />
                <h5>Facturation</h5>
                <p>
                  vous serez facturé uniquement après avoir assisté au cours
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
