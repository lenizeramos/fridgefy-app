import "./Home.scss";
import cooking from "../../public/img/cooking.jpg";
import ClipPathImage from "../Landing/ClipPathImage/ClipPathImage";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="homeContainer">
        <div className="description">
          <h1>
            Welcome to <span>Cook Up Magic</span>!
          </h1>
          <h3>Your kitchen adventure starts here!</h3>
          <p>
            Unleash the magic in your kitchen with effortless recipes, creative meal planning, and smart pantry management. <br /><br />From discovering new dishes to mastering your culinary skills, we're here to make every moment in your kitchen a masterpiece. 
          </p>
          <button>
            <NavLink to="/recipes" className={'button'}>Explore Recipes</NavLink>
          </button>
        </div>
        <div className="image">
          <ClipPathImage imageSrc={cooking} />
        </div>
      </div>
    </>
  );
}

export default Home;
