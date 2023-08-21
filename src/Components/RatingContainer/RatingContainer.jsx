import "./RatingContainer.css";

const RatingContainer = () => {
  return (
    <div className="rate_cont">
      <h4>mondher mameri</h4>
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
      <div className="stars">
        <img src="../assets/Star.svg" />
        <img src="../assets/Star.svg" />
      </div>
    </div>
  );
};

export default RatingContainer;
