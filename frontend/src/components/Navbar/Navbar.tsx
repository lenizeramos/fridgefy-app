import { NavLink } from "react-router-dom";
import logo from "../../public/logo.png";
import { SignedOut, SignedIn, SignOutButton } from "@clerk/clerk-react";
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
              <SignedOut>
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
              </SignedOut>
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
              <SignedIn>
                <li>
                  <NavLink
                    to="/wish_list"
                    className={({ isActive }) =>
                      isActive ? "active" : "noActive"
                    }
                  >
                    Wish List
                  </NavLink>
                </li>
              </SignedIn>
            </ul>
            <div className="buttonContainer">
              <SignedOut>
                <NavLink to="/signin" className="button">
                  <button>Sign in</button>
                </NavLink>
              </SignedOut>

              <SignedIn>
                <SignOutButton>
                  <NavLink to="#" className="button">
                    <button>Logout</button>
                  </NavLink>
                </SignOutButton>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
