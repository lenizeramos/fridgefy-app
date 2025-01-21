import "./Landing.scss";
import ingredients from "/ingredients.jpg";
import ClipPathImage from "./ClipPathImage/ClipPathImage";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <>
      <div className="landingContainer">
        <div className="description">
          <h1>
            This is <span>Cook Up Magic</span>
          </h1>
          <h3>Your ultimate companion for magical cooking experience</h3>
          <p>
            Discover recipes that match what you have in your fridge, keep your
            pantry organized, create smart grocery lists, and share your
            culinary creations with the world. <br /><br />It’s time to bring the magic back
            to your kitchen!
          </p>
          <button>
            <NavLink to="/signin" className={'button'}>Let's Cook !</NavLink>
          </button>
        </div>
        <div className="image">
          <ClipPathImage imageSrc={ingredients} />
        </div>
      </div>
    </>
  );
}

export default Landing;
