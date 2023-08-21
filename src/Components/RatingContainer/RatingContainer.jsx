/* eslint-disable react/prop-types */
import "./RatingContainer.css";

const RatingContainer = ({ rating }) => {
  return (
    <div className="rate_cont">
      <h4>missing ffrom l back</h4>
      <p className="description">{rating?.comment}</p>
      <div className="stars">
        {[...Array(rating.note)].map((star, i) => {
          return <img src="../assets/Star.svg" key={i} />;
        })}
      </div>
    </div>
  );
};

export default RatingContainer;
