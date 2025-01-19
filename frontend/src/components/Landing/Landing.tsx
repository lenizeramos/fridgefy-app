import "./Landing.scss";
import ingredients from "../../../public/ingredients.jpg";
import ClipPathImage from "./ClipPathImage/ClipPathImage";

function Landing() {
  return (
    <>
      <div className="landingContainer">
        <div className="image">
          <ClipPathImage imageSrc={ingredients} />
        </div>
        <span className="loader"></span>
      </div>
    </>
  );
}

export default Landing;
