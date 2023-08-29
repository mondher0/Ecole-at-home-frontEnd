import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance, { baseURl } from "../../utils/utils";
import Multiselect from "multiselect-react-dropdown";
import "../../css/loader.css";

const ProfInfo = () => {
  const [niveaux, setNiveaux] = useState();
  const [matières, setMatières] = useState();
  const [timings, setTimings] = useState();
  const [subjects, setSubjects] = useState();
  const [nombres, setNombres] = useState();
  const [horaires, setHoraires] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const days = [
    {
      fr: "Lundi",
      en: "Monday",
    },
    {
      fr: "Mardi",
      en: "Tuesday",
    },
    {
      fr: "Mercredi",
      en: "Wednesday",
    },
    {
      fr: "Jeudi",
      en: "Thursday",
    },
    {
      fr: "Vendredi",
      en: "Friday",
    },
    {
      fr: "Samedi",
      en: "Saturday",
    },
    {
      fr: "Dimanche",
      en: "Sunday",
    },
  ];
  const style = {
    width: "300px",
  };

  // get niveaux
  const getNiveaux = async () => {
    try {
      const response = await axios.get(`${baseURl}/niveau`);
      console.log(response);
      setNiveaux(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get matières
  const getMatières = async () => {
    try {
      const response = await axios.get(`${baseURl}/matiere`);
      console.log(response);
      setMatières(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get timing
  const getTiming = async () => {
    try {
      const response = await axios.get(`${baseURl}/timing-item`);
      console.log(response);
      setTimings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      setIsLoading(true);
      const data = {
        matieresIds: subjects?.map((subject) => subject.id),
        avItems: horaires,
        max_hours_week: parseInt(nombres),
      };
      console.log(data);
      const response = await axiosInstance.post(
        `${baseURl}/auth/submit-availability`,
        data
      );
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getNiveaux();
    getMatières();
    getTiming();
  }, []);
  return (
    <div className="parent_sign_up container professor_sign_up">
      <fieldset>
        <legend>
          Séléctionner les niveaux/matières/disponibilité à vouloir enseigner :
        </legend>
        <form
          style={{
            gap: "20px",
          }}
          onSubmit={handleSubmit}
        >
          <div
            className="input_container"
            style={{
              height: "fit-content",
            }}
          >
            <label htmlFor="Niveau">Niveau</label>
            <Multiselect
              options={niveaux?.map((niveau) => {
                return { name: niveau.name, id: niveau.id };
              })}
              style={{
                multiselectContainer: style,
                searchBox: {
                  border: "none",
                },
              }}
              displayValue="name"
            />
          </div>
          <div
            className="input_container"
            style={{
              height: "fit-content",
            }}
          >
            <label htmlFor="Matière">Matière</label>
            <Multiselect
              options={matières?.map((matiere) => {
                return { name: matiere.name, id: matiere.id };
              })}
              onSelect={(e) => {
                setSubjects(e);
              }}
              style={{
                multiselectContainer: style,
                searchBox: {
                  border: "none",
                },
              }}
              displayValue="name"
            />
          </div>
          <div
            className="input_container"
            style={{
              height: "fit-content",
            }}
          >
            <label htmlFor="Matière">Jours de la semaine et Horraires</label>
            <Multiselect
              options={days?.flatMap((day) =>
                (timings || []).map((timing) => ({
                  label: `${day.en} - ${timing.start_hour} to ${timing.end_hour}`,
                  value: {
                    day: day.en,
                    start_hour: timing.start_hour,
                    end_hour: timing.end_hour,
                  },
                }))
              )}
              style={{
                multiselectContainer: style,
                searchBox: {
                  border: "none",
                },
              }}
              onSelect={(e) => {
                const groupedTimings = e.reduce((acc, timing) => {
                  const { value } = timing;
                  const { day, start_hour, end_hour } = value;

                  if (!acc[day]) {
                    acc[day] = [];
                  }

                  acc[day].push({ start_hour, end_hour });

                  return acc;
                }, {});

                // Convert the groupedTimings object into an array
                const avItems = Object.keys(groupedTimings).map((day) => ({
                  day,
                  timingItems: groupedTimings[day],
                }));
                console.log(avItems);
                setHoraires(avItems);
                console.log(horaires);
                console.log(e);
              }}
              displayValue="label"
            />
          </div>
          <div className="input_container">
            <label htmlFor="Matière">Nombre de cours maximum</label>
            <input
              type="number"
              name="Nombre"
              placeholder="Entrer"
              onChange={(e) => {
                setNombres(e.target.value);
              }}
            />
          </div>
          {error && <h5 className="form_error">{error}</h5>}
          <button className="btn btn-primary">
            {isLoading ? (
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              "Valider l'inscription"
            )}
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default ProfInfo;
