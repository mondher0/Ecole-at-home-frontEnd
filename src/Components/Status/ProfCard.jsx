import { baseURl } from "../../utils/utils";

/* eslint-disable react/prop-types */
const ProfCard = ({ prof }) => {
  return (
    <div className="cours_card">
      <img
        className="avatare"
        src={`${baseURl}${prof.proffesseurProfile.imgUrl}`}
      />
      <div className="info">
        <h4 className="bold">
          {prof.nom} {prof.prenom}
        </h4>
        <h4>{prof.proffesseurProfile.diplome}</h4>
        <div
          className="avis"
          style={{
            width: "40%",
            display: "flex",
            alignItems: "space-between",
            marginTop: "10px",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "50%",
            }}
          >
            <img src="../assets/Star.svg" />
            <p
              style={{
                color: "#3E4958",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {prof.proffesseurProfile.note ? prof.proffesseurProfile.note : 0}
            </p>
          </div>
        </div>
        <p
          style={{
            color: "#3E4958",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          <span>Expériences</span> : 80 éleves , 50 heures
        </p>
        <ul
          className="tags"
          style={{
            marginTop: "10px",
          }}
        ></ul>
      </div>
    </div>
  );
};

export default ProfCard;
