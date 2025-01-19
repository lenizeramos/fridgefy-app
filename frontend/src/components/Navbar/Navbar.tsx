import { NavLink } from "react-router-dom";
import logo from "../../public/images/logo.png";
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
                  to="/recipies"
                  className={({ isActive }) =>
                    isActive ? "active" : "noActive"
                  }
                >
                  Recipies
                </NavLink>
              </li>
            </ul>
            <button>
              <NavLink to="/login" className={'button'}>Sign in</NavLink>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
