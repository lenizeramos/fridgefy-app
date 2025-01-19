import { NavLink } from "react-router-dom";
import logo from "../../../public/logo.png";
import "./Navbar.scss";

function Navbar() {
  return (
    <>
      <nav>
        <div className="navContainer">
          <div className="logoContainer">
            <img src={logo} alt="Logo" />
            <h1>CookUpMagic</h1>
          </div>
          <div className="linksContainer">
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active" : "noActive"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive ? "active" : "noActive"
                  }
                >
                  Recipies
                </NavLink>
              </li>
            </ul>
            <div className="buttonContainer">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "buttonActive" : "button"
                }
              >
                <button>Sign in</button>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
